import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here"
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, style = "Epic Indian" } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (openai) {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: `${prompt}, ${style} style, cinematic vertical 9:16 aspect ratio, dramatic volumetric lighting, ultra-realistic masterpiece, 8k resolution`,
          n: 1,
          size: "1024x1792", // 9:16 vertical
          quality: "standard",
        });

        const imageUrl = response.data?.[0]?.url;
        if (imageUrl) {
          return NextResponse.json({
            success: true,
            imageUrl,
            source: "dalle-3",
          });
        }
      } catch (imageError) {
        console.warn("DALL-E 3 generation failed, falling back to curated visual preview:", imageError);
      }
    }

    // High quality themed visual fallback
    return NextResponse.json({
      success: true,
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1080&auto=format&fit=crop",
      source: "curated-visual",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate visual" }, { status: 500 });
  }
}
