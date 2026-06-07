import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const query = `
  query leetcodeStats($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      contest {
        title
        startTime
      }
    }
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`LeetCode API returned status: ${response.status}`);
    }

    const data = await response.json();
    if (data.errors) {
      return NextResponse.json({ error: 'LeetCode API Error', details: data.errors }, { status: 500 });
    }

    return NextResponse.json(data.data, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    });
  } catch (error: any) {
    console.error('Error fetching Leetcode data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch Leetcode data',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
