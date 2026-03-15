import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { demoResurrection } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, mode, text, userMessage } = body;

    if (!language || !mode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: language, mode" },
        { status: 400 }
      );
    }

    if (mode !== "pronunciation" && mode !== "conversation") {
      return NextResponse.json(
        { success: false, error: "mode must be 'pronunciation' or 'conversation'" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoResurrection });
    }

    const client = new OpenAI({ apiKey });

    let systemPrompt: string;
    let userContent: string;
    let responseFormat: string;

    if (mode === "pronunciation") {
      systemPrompt = `You are LINGUA, a dead language resurrection engine. Provide reconstructed pronunciation of ancient ${language} text using IPA notation and phonetic approximation. Rate confidence. Explain phonological reasoning.`;
      responseFormat = `Respond with ONLY valid JSON: { "ipa": string, "phoneticGuide": string, "confidence": string, "explanation": string }`;
      userContent = `Provide reconstructed pronunciation for the following ${language} text:\n\n"${text || ""}"`;
    } else {
      systemPrompt = `You are a speaker of ${language} from the era when it was a living language. Respond in that language (with translation) using period-appropriate vocabulary, grammar, and cultural knowledge. Stay in character and era.`;
      responseFormat = `Respond with ONLY valid JSON: { "response": string, "translation": string, "culturalContext": string, "vocabularyNotes": string }`;
      userContent = userMessage || `Greet me in ${language} and tell me about your daily life.`;
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1536,
      messages: [
        {
          role: "system",
          content: `${systemPrompt} ${responseFormat}`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoResurrection });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoResurrection });
    }
  } catch (error) {
    console.error("Resurrection error:", error);
    return NextResponse.json({ success: true, result: demoResurrection });
  }
}
