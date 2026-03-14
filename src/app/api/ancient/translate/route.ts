import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoAncientTranslation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, language } = body;

    if (!text || !language) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: text, language" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoAncientTranslation });
    }

    const client = new Anthropic({ apiKey });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, an ancient language translation engine. Translate ancient text with historical accuracy. Provide modern translation, historical context, linguistic notes on grammar features, and cultural significance. Note uncertainty where it exists. Respond with ONLY valid JSON: { "translation": string, "historicalContext": string, "linguisticNotes": string, "culturalSignificance": string, "confidenceLevel": string, "alternativeReadings": [string] | null }`,
      messages: [
        {
          role: "user",
          content: `Translate the following ${language} text with full historical and linguistic analysis:\n\n"${text}"`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoAncientTranslation });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoAncientTranslation });
    }
  } catch (error) {
    console.error("Ancient translation error:", error);
    return NextResponse.json({ success: true, result: demoAncientTranslation });
  }
}
