import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoLearningConversation } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, targetLanguage, userLevel, conversationHistory } = body;

    if (!message || !targetLanguage || !userLevel) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: message, targetLanguage, userLevel" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoLearningConversation });
    }

    const client = new Anthropic({ apiKey });

    const historyContext = conversationHistory
      ? `\n\nConversation history:\n${JSON.stringify(conversationHistory)}`
      : "";

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are a patient, encouraging language tutor for ${targetLanguage}. Adapt to the user's level (${userLevel}). Respond in the target language with translation. Gently correct errors with explanation. Celebrate progress. Use vocabulary appropriate to their level. Respond with ONLY valid JSON: { "response": string, "responseTranslation": string, "correction": string | null, "correctionExplanation": string | null, "encouragement": string | null, "newVocabulary": [{"word": string, "meaning": string}] | null }`,
      messages: [
        {
          role: "user",
          content: `Student (${userLevel} level) says: "${message}"${historyContext}`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoLearningConversation });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoLearningConversation });
    }
  } catch (error) {
    console.error("Learning practice error:", error);
    return NextResponse.json({ success: true, result: demoLearningConversation });
  }
}
