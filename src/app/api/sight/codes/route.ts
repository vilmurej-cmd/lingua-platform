import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { demoCipherAnalysis } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, cipherType } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Missing required field: text" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }

    const client = new OpenAI({ apiKey });

    const cipherHint = cipherType ? ` The user suspects this may be a ${cipherType} cipher.` : "";

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: `You are LINGUA, a cipher analysis engine. Analyze this potentially encoded text. Run frequency analysis. Propose decipherment approaches. If it appears to be a known cipher type, attempt to decode it. Respond with ONLY valid JSON: { "analysis": string, "proposedCipherType": string, "frequencyData": Record<string, number>, "decryptionAttempt": string | null, "confidence": string, "explanation": string }`,
        },
        {
          role: "user",
          content: `Analyze and attempt to decode the following text:${cipherHint}\n\n"${text}"`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }
  } catch (error) {
    console.error("Cipher analysis error:", error);
    return NextResponse.json({ success: true, result: demoCipherAnalysis });
  }
}
