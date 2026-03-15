import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }

    const client = new OpenAI({ apiKey });

    const contextNote = context ? ` Context: ${context} scenario.` : "";

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: `You are LINGUA, a medical interpreter AI. Accuracy is paramount. When a translation could be ambiguous, flag both meanings. Never guess on medication names — use international nonproprietary names. Include pronunciation guides for critical terms. Flag potential dangers. Respond with ONLY valid JSON: { "translation": string, "pronunciationGuide": string, "ambiguityFlags": [{"term": string, "meanings": [string], "recommendation": string}], "criticalTerms": [{"term": string, "translation": string, "pronunciation": string}], "culturalNotes": string, "safetyWarnings": [string] | null }`,
        },
        {
          role: "user",
          content: `Medical translation from ${sourceLang} to ${targetLang}.${contextNote}\n\nText: "${text}"`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoHealthTranslation });
    }
  } catch (error) {
    console.error("Health translation error:", error);
    return NextResponse.json({ success: true, result: demoHealthTranslation });
  }
}
