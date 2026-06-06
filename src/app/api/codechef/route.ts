import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache rating for 1 hour
    });

    if (!response.ok) {
      throw new Error(`CodeChef page returned status: ${response.status}`);
    }

    const html = await response.text();

    // Parse the ratings history list from the page's scripts
    const match = html.match(/var\s+all_rating\s*=\s*(\[[^\]]+\]);/);
    let rating = 0;
    
    if (match) {
      try {
        const ratingsArray = JSON.parse(match[1]);
        if (ratingsArray.length > 0) {
          rating = parseInt(ratingsArray[ratingsArray.length - 1].rating) || 0;
        }
      } catch (err) {
        console.error("Failed to parse rating JSON:", err);
      }
    }

    // Fallback search in case scripts format changes
    if (rating === 0) {
      const fallbackMatch = html.match(/Highest Rating\s*(\d+)/i) || html.match(/rating-number">([^<]+)/i);
      if (fallbackMatch) {
        rating = parseInt(fallbackMatch[1].trim()) || 0;
      }
    }

    return NextResponse.json({ username, rating });
  } catch (error: any) {
    console.error('Error fetching CodeChef rating:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch CodeChef rating',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
