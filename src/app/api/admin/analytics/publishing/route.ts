import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const publishing = [
      { platform: "Instagram", published: 842, failed: 12, scheduled: 48 },
      { platform: "YouTube Shorts", published: 630, failed: 8, scheduled: 32 },
      { platform: "TikTok", published: 315, failed: 19, scheduled: 24 },
      { platform: "Facebook Reels", published: 140, failed: 4, scheduled: 10 },
    ];

    return NextResponse.json({ publishing });
  } catch (error) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
