import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, scenes = [], resolution = "1080p", aspectRatio = "9:16" } = body;

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      jobId,
      status: "QUEUED",
      estimatedDurationSeconds: Math.max(5, scenes.length * 3),
      queuePosition: 1,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to queue render job" }, { status: 500 });
  }
}
