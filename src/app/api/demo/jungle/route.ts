import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { demoJungle } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userAction, discoveredWords, conversationHistory } = body;

    if (!userAction) {
      return NextResponse.json(
        { success: false, error: "Missing required field: userAction" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoJungle });
    }

    const client = new OpenAI({ apiKey });

    const wordsContext = discoveredWords?.length
      ? `\n\nPreviously discovered vocabulary:\n${JSON.stringify(discoveredWords)}`
      : "";

    const historyContext = conversationHistory?.length
      ? `\n\nConversation history:\n${JSON.stringify(conversationHistory)}`
      : "";

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1536,
      messages: [
        {
          role: "system",
          content: `You are simulating a speaker of an uncontacted language. Respond in a constructed language with consistent phonological rules (use a Tupian-inspired phonology: CV syllables, nasals, voiceless stops, open vowels). The user is trying to communicate through gestures and basic grounding. Gradually reveal vocabulary based on context. Maintain linguistic consistency — once a word is established, always use it the same way. Track what words have been established. Respond with ONLY valid JSON: { "speakerResponse": string, "linguaAnalysis": {"phonemes": [string] | null, "possibleMeaning": string | null, "confidence": string, "languageFamilyGuess": string | null}, "discoveredVocabulary": [{"word": string, "meaning": string, "confidence": string}] | null, "phaseNote": string }`,
        },
        {
          role: "user",
          content: `The user performs this action/gesture: "${userAction}"${wordsContext}${historyContext}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoJungle });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoJungle });
    }
  } catch (error) {
    console.error("Jungle simulation error:", error);
    return NextResponse.json({ success: true, result: demoJungle });
  }
}
