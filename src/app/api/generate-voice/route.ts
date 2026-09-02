import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here"
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, voice = "onyx" } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // If OpenAI key is available, generate real TTS MP3 audio
    if (openai) {
      try {
        const voiceMap: Record<string, "onyx" | "alloy" | "echo" | "fable" | "nova" | "shimmer"> = {
          "Male — Deep": "onyx",
          "Male — Calm": "echo",
          "Female — Warm": "nova",
          "Female — Calm": "shimmer",
        };

        const chosenVoice = voiceMap[voice] || "onyx";

        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: chosenVoice,
          input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        const base64Audio = `data:audio/mp3;base64,${buffer.toString("base64")}`;

        return NextResponse.json({
          success: true,
          audioUrl: base64Audio,
          source: "openai-tts",
        });
      } catch (ttsError) {
        console.warn("OpenAI TTS failed, falling back to Web Audio Speech:", ttsError);
      }
    }

    // Fallback URL / speech marker
    return NextResponse.json({
      success: true,
      audioUrl: `https://actions.google.com/sounds/v1/human_voices/voice_accent.ogg`,
      source: "mock-tts",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate voice" }, { status: 500 });
  }
}
