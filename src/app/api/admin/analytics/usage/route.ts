import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();

    const usage = [
      { date: "2026-08-25", credits: 1840, renders: 92 },
      { date: "2026-08-26", credits: 2450, renders: 120 },
      { date: "2026-08-27", credits: 3120, renders: 156 },
      { date: "2026-08-28", credits: 2890, renders: 144 },
      { date: "2026-08-29", credits: 4200, renders: 210 },
      { date: "2026-08-30", credits: 5600, renders: 280 },
      { date: "2026-08-31", credits: 4900, renders: 245 },
      { date: "2026-09-01", credits: 6300, renders: 315 },
      { date: "2026-09-02", credits: 7850, renders: 392 },
    ];

    return NextResponse.json({ usage });
  } catch (error) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
