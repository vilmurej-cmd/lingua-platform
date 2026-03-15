import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }

    const client = new OpenAI({ apiKey });

    const scriptHint = scriptType ? ` The user suspects this may be ${scriptType}.` : "";

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: `You are LINGUA, a script identification and analysis engine. Analyze the described visual script or inscription. Identify the script system if possible. Provide translation for known scripts. For partially deciphered scripts, show what's known and hypothesize on unknowns. For undeciphered scripts, provide scholarly context and pattern analysis. Respond with ONLY valid JSON: { "scriptIdentified": string, "confidence": string, "translation": string | null, "historicalContext": string, "symbolAnalysis": [{"symbol": string, "meaning": string | null, "frequency": string | null, "notes": string}], "scholarlyDebate": string | null, "relatedScripts": [string] }`,
        },
        {
          role: "user",
          content: `Analyze the following script or inscription:${scriptHint}\n\n${description}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || '';
    if (!content) {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }

    try {
      const result = JSON.parse(content);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoScriptDecode });
    }
  } catch (error) {
    console.error("Script decode error:", error);
    return NextResponse.json({ success: true, result: demoScriptDecode });
  }
}
