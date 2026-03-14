import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoHealthTranslation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, sourceLang, targetLang, context } = body;

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: text, sourceLang, targetLang" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }

    const client = new Anthropic({ apiKey });

    const contextNote = context ? ` Context: ${context} scenario.` : "";

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, a medical interpreter AI. Accuracy is paramount. When a translation could be ambiguous, flag both meanings. Never guess on medication names — use international nonproprietary names. Include pronunciation guides for critical terms. Flag potential dangers. Respond with ONLY valid JSON: { "translation": string, "pronunciationGuide": string, "ambiguityFlags": [{"term": string, "meanings": [string], "recommendation": string}], "criticalTerms": [{"term": string, "translation": string, "pronunciation": string}], "culturalNotes": string, "safetyWarnings": [string] | null }`,
      messages: [
        {
          role: "user",
          content: `Medical translation from ${sourceLang} to ${targetLang}.${contextNote}\n\nText: "${text}"`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }
  } catch (error) {
    console.error("Health translation error:", error);
    return NextResponse.json({ success: true, result: demoHealthTranslation });
  }
}
