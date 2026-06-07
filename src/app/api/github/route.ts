import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GitHub contributions API returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    });
  } catch (error: any) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch GitHub contributions',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
