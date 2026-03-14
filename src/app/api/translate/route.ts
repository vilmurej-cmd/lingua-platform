import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoTranslation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, sourceLang, targetLang, showEmotion, showCulture, showIntent } = body;

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: text, sourceLang, targetLang" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoTranslation });
    }

    const client = new Anthropic({ apiKey });

    const optionsNote = [
      showEmotion !== false ? "Include emotional annotations." : "",
      showCulture !== false ? "Include cultural notes." : "",
      showIntent !== false ? "Include intent analysis." : "",
    ]
      .filter(Boolean)
      .join(" ");

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, a universal understanding engine. Translate with emotional fidelity: preserve tone, warmth, urgency, humor. Include cultural context for nuances. Flag when literal translation misses intent. For idioms, provide cultural equivalent. Respect cultural sensitivities. For medical/legal content, prioritize precision. Respond with ONLY valid JSON: { "translation": string, "emotionalAnnotations": [{"text": string, "emotion": string, "color": string}], "culturalNotes": [{"context": string, "importance": string}], "intentNote": string, "alternatives": [string], "untranslatableNote": string, "pronunciation": string, "formality": string }`,
      messages: [
        {
          role: "user",
          content: `Translate the following from ${sourceLang} to ${targetLang}. ${optionsNote}\n\nText: "${text}"`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoTranslation });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoTranslation });
    }
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ success: true, result: demoTranslation });
  }
}
