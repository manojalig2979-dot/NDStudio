import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return NextResponse.json({
    jobId: id,
    status: "COMPLETED",
    progress: 100,
    currentStep: "Final MP4 Encoded with AAC Audio",
    videoUrl: "/rendered/sample-reel.mp4",
    srtUrl: "/rendered/sample-subtitles.srt",
    audioMasterUrl: "/rendered/sample-audio.mp3",
    completedAt: new Date().toISOString(),
  });
}
