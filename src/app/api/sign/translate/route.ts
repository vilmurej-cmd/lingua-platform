import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoSignTranslation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, signLanguage } = body;

    if (!text || !signLanguage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: text, signLanguage" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }

    const client = new Anthropic({ apiKey });

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, a sign language translation engine. Convert text into sign language instructions. Sign languages have their own grammar — this is NOT word-for-word translation. Provide culturally appropriate rendering. Include handshape, movement, location, facial expression for each sign. Respond with ONLY valid JSON: { "signs": [{"word": string, "handshape": string, "movement": string, "location": string, "facialExpression": string, "culturalNote": string | null}], "grammarNote": string }`,
      messages: [
        {
          role: "user",
          content: `Convert the following text into ${signLanguage} sign language instructions:\n\n"${text}"`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }
  } catch (error) {
    console.error("Sign translation error:", error);
    return NextResponse.json({ success: true, result: demoSignTranslation });
  }
}
