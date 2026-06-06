import { NextResponse } from 'next/server';

export const runtime = 'edge';

function extractValue(svgText: string, id: string): number {
  const regex = new RegExp(`id="${id}"[^>]*>([^<]+)`);
  const match = svgText.match(regex);
  if (match && match[1]) {
    const val = parseInt(match[1].trim(), 10);
    return isNaN(val) ? 0 : val;
  }
  return 0;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://gfgstatscard.vercel.app/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache GFG stats for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GFG Stats Card API returned status: ${response.status}`);
    }

    const svgText = await response.text();

    const stats = {
      school: extractValue(svgText, 'school-solved-count'),
      basic: extractValue(svgText, 'basic-solved-count'),
      easy: extractValue(svgText, 'easy-solved-count'),
      medium: extractValue(svgText, 'medium-solved-count'),
      hard: extractValue(svgText, 'hard-solved-count'),
      score: extractValue(svgText, 'overall-score-count'),
      totalSolved: extractValue(svgText, 'total-solved-count'),
    };

    // Fallback if totalSolved is 0 but sum is not
    const calculatedTotal = stats.school + stats.basic + stats.easy + stats.medium + stats.hard;
    if (stats.totalSolved === 0 && calculatedTotal > 0) {
      stats.totalSolved = calculatedTotal;
    }

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Error fetching GFG data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch GFG data',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
