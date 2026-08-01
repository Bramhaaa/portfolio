import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub contributions API returned status: ${response.status}`);
    }

    const apiData = await response.json();

    if (!apiData || !apiData.contributions || apiData.contributions.length === 0) {
      return NextResponse.json(
        { totalContributions: 0, contributions: [] },
        {
          headers: {
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        },
      );
    }

    // Sort chronologically (ascending)
    const sortedContributions = [...apiData.contributions].sort(
      (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const mapQuartile = (level: number): string => {
      if (level === 0) return "NONE";
      if (level === 1) return "FIRST_QUARTILE";
      if (level === 2) return "SECOND_QUARTILE";
      if (level === 3) return "THIRD_QUARTILE";
      return "FOURTH_QUARTILE";
    };

    const totalContributions = sortedContributions.reduce(
      (sum: number, day: any) => sum + day.count,
      0,
    );

    const startDate = new Date(sortedContributions[0].date);
    const startDayOfWeek = startDate.getDay(); // 0 is Sunday, 6 is Saturday

    const formattedDays = sortedContributions.map((day: any) => ({
      date: day.date,
      contributionCount: day.count,
      contributionLevel: mapQuartile(day.level),
      color:
        day.level === 0
          ? "#ebedf0"
          : day.level === 1
            ? "#9be9a8"
            : day.level === 2
              ? "#40c463"
              : day.level === 3
                ? "#30a14e"
                : "#216e39",
    }));

    // Prepend dummy days to align first week to Sunday
    const paddedDays = [...formattedDays];
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dummyDate = new Date(startDate);
      dummyDate.setDate(startDate.getDate() - (startDayOfWeek - i));
      paddedDays.unshift({
        date: dummyDate.toISOString().split("T")[0],
        contributionCount: 0,
        contributionLevel: "NONE",
        color: "#ebedf0",
      });
    }

    // Append dummy days to complete the last week
    const lastDateStr = paddedDays[paddedDays.length - 1].date;
    const lastDate = new Date(lastDateStr);
    const endDayOfWeek = lastDate.getDay(); // 0 is Sunday, 6 is Saturday
    if (endDayOfWeek < 6) {
      for (let i = endDayOfWeek + 1; i <= 6; i++) {
        const dummyDate = new Date(lastDate);
        dummyDate.setDate(lastDate.getDate() + (i - endDayOfWeek));
        paddedDays.push({
          date: dummyDate.toISOString().split("T")[0],
          contributionCount: 0,
          contributionLevel: "NONE",
          color: "#ebedf0",
        });
      }
    }

    // Chunk into 7-day weeks
    const contributions2D: any[][] = [];
    for (let i = 0; i < paddedDays.length; i += 7) {
      contributions2D.push(paddedDays.slice(i, i + 7));
    }

    return NextResponse.json(
      {
        totalContributions,
        contributions: contributions2D,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
      },
    );
  } catch (error: any) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch GitHub contributions",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
