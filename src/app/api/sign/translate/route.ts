import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: `You are LINGUA, a sign language translation engine. Convert text into sign language instructions. Sign languages have their own grammar — this is NOT word-for-word translation. Provide culturally appropriate rendering. Include handshape, movement, location, facial expression for each sign. Respond with ONLY valid JSON: { "signs": [{"word": string, "handshape": string, "movement": string, "location": string, "facialExpression": string, "culturalNote": string | null}], "grammarNote": string }`,
        },
        {
          role: "user",
          content: `Convert the following text into ${signLanguage} sign language instructions:\n\n"${text}"`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoSignTranslation });
    }
  } catch (error) {
    console.error("Sign translation error:", error);
    return NextResponse.json({ success: true, result: demoSignTranslation });
  }
}
