import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { demoScriptDecode } from "@/lib/demo-translations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, scriptType } = body;

    if (!description) {
      return NextResponse.json(
        { success: false, error: "Missing required field: description" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }

    const client = new Anthropic({ apiKey });

    const scriptHint = scriptType ? ` The user suspects this may be ${scriptType}.` : "";

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, a script identification and analysis engine. Analyze the described visual script or inscription. Identify the script system if possible. Provide translation for known scripts. For partially deciphered scripts, show what's known and hypothesize on unknowns. For undeciphered scripts, provide scholarly context and pattern analysis. Respond with ONLY valid JSON: { "scriptIdentified": string, "confidence": string, "translation": string | null, "historicalContext": string, "symbolAnalysis": [{"symbol": string, "meaning": string | null, "frequency": string | null, "notes": string}], "scholarlyDebate": string | null, "relatedScripts": [string] }`,
      messages: [
        {
          role: "user",
          content: `Analyze the following script or inscription:${scriptHint}\n\n${description}`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }
  } catch (error) {
    console.error("Script decode error:", error);
    return NextResponse.json({ success: true, result: demoScriptDecode });
  }
}
