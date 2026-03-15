import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { demoConversation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, speaker, lang1, lang2, conversationHistory } = body;

    if (!message || !speaker || !lang1 || !lang2) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: message, speaker, lang1, lang2" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoConversation });
    }

    const client = new OpenAI({ apiKey });

    const originalLang = speaker === "person1" ? lang1 : lang2;
    const targetLang = speaker === "person1" ? lang2 : lang1;

    const historyContext = conversationHistory
      ? `\n\nConversation so far:\n${JSON.stringify(conversationHistory)}`
      : "";

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `You are LINGUA, a bilingual conversation translator. Translate the message for the other speaker. Preserve emotional tone exactly — if the speaker is excited, the translation should feel excited. Flag cultural nuances that might cause misunderstanding. Respond with ONLY valid JSON: { "translation": string, "emotionTone": string, "culturalNote": string | null, "originalLang": string, "targetLang": string }`,
        },
        {
          role: "user",
          content: `Speaker (${speaker}) said in ${originalLang}: "${message}"\n\nTranslate to ${targetLang} for the other speaker.${historyContext}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoConversation });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoConversation });
    }
  } catch (error) {
    console.error("Conversation translation error:", error);
    return NextResponse.json({ success: true, result: demoConversation });
  }
}
