import { NextResponse } from "next/server";
import { audioLibrary } from "@/data/audio-library";

export async function GET() {
  return NextResponse.json({
    audio: audioLibrary,
  });
}
