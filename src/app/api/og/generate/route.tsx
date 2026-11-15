import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const ogPath = path.join(process.cwd(), "public", "images", "og.png");
    if (fs.existsSync(ogPath)) {
      const imageBuffer = fs.readFileSync(ogPath);
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }
  } catch (e) {
    console.error("Error serving OG image:", e);
  }

  return new NextResponse(null, { status: 404 });
}
