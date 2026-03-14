import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }

    const client = new Anthropic({ apiKey });

    const cipherHint = cipherType ? ` The user suspects this may be a ${cipherType} cipher.` : "";

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, a cipher analysis engine. Analyze this potentially encoded text. Run frequency analysis. Propose decipherment approaches. If it appears to be a known cipher type, attempt to decode it. Respond with ONLY valid JSON: { "analysis": string, "proposedCipherType": string, "frequencyData": Record<string, number>, "decryptionAttempt": string | null, "confidence": string, "explanation": string }`,
      messages: [
        {
          role: "user",
          content: `Analyze and attempt to decode the following text:${cipherHint}\n\n"${text}"`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoCipherAnalysis });
    }
  } catch (error) {
    console.error("Cipher analysis error:", error);
    return NextResponse.json({ success: true, result: demoCipherAnalysis });
  }
}
