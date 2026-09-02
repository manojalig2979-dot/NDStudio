import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { Scene } from "@/lib/types";

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here"
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      topic = "Bhagavad Gita Chapter 2, Shloka 11",
      duration = 30,
      language = "Hindi",
      contentType = "Spiritual",
      visualStyle = "Epic Indian",
      voiceStyle = "Male — Deep",
    } = body;

    // If live OpenAI key is available, call GPT-4o / GPT-3.5
    if (openai) {
      try {
        const systemPrompt = `You are NDStudio AI, an elite viral video director specializing in 9:16 short-form reels (Instagram Reels, YouTube Shorts, TikTok).
Generate a structured storyboard for a ${duration}-second reel in ${language} on the topic "${topic}".
Content Type: ${contentType}
Visual Style: ${visualStyle}
Voice Style: ${voiceStyle}

Format your output STRICTLY as a JSON array of scenes:
[
  {
    "order": 1,
    "title": "Short title",
    "type": "hook" | "shloka" | "meaning" | "lesson" | "cta" | "content",
    "duration": 6,
    "prompt": "Highly detailed visual prompt for 8k AI image generation in ${visualStyle} style, 9:16 aspect ratio, cinematic lighting",
    "text": "Core dialogue or shloka",
    "narration": "Exact speech voiceover script in ${language}",
    "onScreenText": "Short punchy 2-4 word on-screen caption",
    "captionEnabled": true,
    "captionPosition": "bottom",
    "captionAnimation": "pop"
  }
]
The sum of all scene durations must strictly equal ${duration} seconds. Provide 3 to 5 scenes.`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Generate the reel storyboard for: ${topic}` },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        });

        const rawContent = response.choices[0]?.message?.content;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          const scenes: Scene[] = (parsed.scenes || parsed.storyboard || parsed).map(
            (s: any, idx: number) => ({
              id: `scene-${Date.now()}-${idx + 1}`,
              order: idx + 1,
              title: s.title || `Scene ${idx + 1}`,
              type: s.type || (idx === 0 ? "hook" : idx === parsed.length - 1 ? "lesson" : "content"),
              duration: s.duration || Math.round(duration / 4),
              prompt: s.prompt || `${visualStyle} scene depicting ${topic}`,
              text: s.text || s.narration || "",
              narration: s.narration || s.text || "",
              onScreenText: s.onScreenText || s.title || "",
              captionEnabled: true,
              captionPosition: s.captionPosition || "bottom",
              captionAnimation: s.captionAnimation || "pop",
            })
          );

          return NextResponse.json({ success: true, scenes, source: "openai" });
        }
      } catch (apiError) {
        console.warn("OpenAI API call failed, falling back to intelligent script engine:", apiError);
      }
    }

    // Intelligent Built-in Fallback Script Generation Engine
    const targetSceneCount = duration <= 15 ? 2 : duration <= 35 ? 4 : 5;
    const baseDuration = Math.floor(duration / targetSceneCount);
    const remainder = duration % targetSceneCount;

    let scenes: Scene[] = [];

    if (contentType.toLowerCase().includes("spiritual") || topic.toLowerCase().includes("gita") || topic.toLowerCase().includes("krishna")) {
      scenes = [
        {
          id: `scene-${Date.now()}-1`,
          order: 1,
          title: "Hook: The Eternal Dilemma",
          type: "hook",
          duration: baseDuration + remainder,
          prompt: `Cinematic close-up portrait of a contemplative warrior in ancient armor on a mist-covered Kurukshetra battlefield at dawn, dramatic backlight, volumetric fog, photorealistic, ${visualStyle} aesthetic, 8k, 9:16 vertical`,
          text: language === "Hindi" ? "क्या आप भी उस बात से परेशान हैं जो आपके हाथ में नहीं है?" : "Are you troubled by things you cannot control?",
          narration: language === "Hindi" ? "जीवन में हम अक्सर उन परिस्थितियों पर शोक करते हैं जिन पर हमारा कोई नियंत्रण नहीं होता।" : "In life we often grieve over circumstances beyond our control.",
          onScreenText: language === "Hindi" ? "व्यर्थ चिंता क्यों?" : "Why Worry?",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "pop",
        },
        {
          id: `scene-${Date.now()}-2`,
          order: 2,
          title: "Sacred Shloka / Revelation",
          type: "shloka",
          duration: baseDuration,
          prompt: `Divine golden aura surrounding Lord Krishna standing on a majestic golden chariot, serene compassionate expression, holding chariot reins, radiant morning rays, masterpiece, ${visualStyle}, 8k`,
          text: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे। गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥",
          narration: language === "Hindi" ? "भगवान कृष्ण कहते हैं: ज्ञानी मनुष्य उन बातों का शोक नहीं करते जो शोक के योग्य नहीं हैं।" : "Lord Krishna says: The wise grieve neither for the living nor for the departed.",
          onScreenText: "श्रीमद्भगवद्गीता 2.11",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "highlight",
        },
        {
          id: `scene-${Date.now()}-3`,
          order: 3,
          title: "Deep Meaning & Context",
          type: "meaning",
          duration: baseDuration,
          prompt: `Sacred Sanskrit manuscript glowing with divine ethereal light inside an ancient stone temple sanctum, oil lamps flickering, peaceful spiritual sanctuary, ${visualStyle}, 8k`,
          text: language === "Hindi" ? "जो बदल नहीं सकता, उसे स्वीकार करना ही सबसे बड़ा ज्ञान है।" : "Accepting what cannot be changed is the highest wisdom.",
          narration: language === "Hindi" ? "विद्वान वही है जो बीते हुए कल और अनिश्चित भविष्य की चिंता छोड़कर वर्तमान में स्थिर रहता है।" : "True wisdom is letting go of the past and future to remain grounded in the present.",
          onScreenText: language === "Hindi" ? "वर्तमान में जीना सीखें" : "Live in the Present",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "slide",
        },
        {
          id: `scene-${Date.now()}-4`,
          order: 4,
          title: "Life Lesson & Takeaway",
          type: "lesson",
          duration: baseDuration,
          prompt: `A calm, empowered person standing atop a high mountain summit overlooking glowing sunrise clouds, inner peace, victorious serene posture, cinematic, ${visualStyle}, 8k`,
          text: language === "Hindi" ? "आज से सिर्फ अपने कर्म पर ध्यान दें, परिणाम ईश्वर पर छोड़ें।" : "Focus only on your actions today; surrender the rest to the divine.",
          narration: language === "Hindi" ? "अपनी चिंताएं ईश्वर को अर्पित करें और केवल अपने सर्वोत्तम कर्म पर केंद्रित रहें।" : "Offer your worries to the universe and direct all your energy towards your highest duty.",
          onScreenText: language === "Hindi" ? "कर्म ही आपकी शक्ति है" : "Action is Your Power",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "fade",
        },
      ];
    } else {
      // General Viral Topic Engine
      scenes = [
        {
          id: `scene-${Date.now()}-1`,
          order: 1,
          title: "The Attention Hook",
          type: "hook",
          duration: baseDuration + remainder,
          prompt: `Intense cinematic portrait of a determined creator in a neon-lit futuristic creative studio, cinematic rim lighting, high detail, ${visualStyle} aesthetic, 8k, 9:16`,
          text: `The secret truth about ${topic} that no one tells you.`,
          narration: `Most people misunderstand ${topic}. Here is what actually makes the difference.`,
          onScreenText: "Pay Attention to This",
          captionEnabled: true,
          captionPosition: "center",
          captionAnimation: "pop",
        },
        {
          id: `scene-${Date.now()}-2`,
          order: 2,
          title: "Core Principle Breakdown",
          type: "content",
          duration: baseDuration,
          prompt: `Dynamic macro shot of high-tech gear mechanisms interlocking smoothly with golden electric pulses, precision engineering, ${visualStyle}, 8k`,
          text: `Daily compounding effort always beats sporadic bursts of motivation.`,
          narration: `When you build an unbreakable system around ${topic}, continuous progress becomes inevitable.`,
          onScreenText: "Consistency Wins",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "highlight",
        },
        {
          id: `scene-${Date.now()}-3`,
          order: 3,
          title: "Practical Transformation",
          type: "meaning",
          duration: baseDuration,
          prompt: `An artisan crafting an illuminated digital masterpiece on an ultra-modern glass interface, glowing particle trails, ${visualStyle}, 8k`,
          text: `Small daily shifts compound into extraordinary breakthroughs.`,
          narration: `Shift your focus from instant results to building relentless daily mastery.`,
          onScreenText: "1% Better Every Day",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "slide",
        },
        {
          id: `scene-${Date.now()}-4`,
          order: 4,
          title: "Call to Action & Mastery",
          type: "cta",
          duration: baseDuration,
          prompt: `Heroic wide shot of a visionary looking out over an illuminated horizon at sunset, triumphant atmospheric glow, ${visualStyle}, 8k`,
          text: `Start your transformation right now. Never wait for permission.`,
          narration: `Save this reel, take the first bold step today, and follow for more insights.`,
          onScreenText: "Take Action Today",
          captionEnabled: true,
          captionPosition: "bottom",
          captionAnimation: "fade",
        },
      ];
    }

    return NextResponse.json({
      success: true,
      scenes: scenes.slice(0, targetSceneCount),
      source: "intelligent-engine",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 }
    );
  }
}
