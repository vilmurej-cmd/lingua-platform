import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const demoImmersion = {
  scenario: "You walk into a cozy cafe in Madrid on a sunny afternoon. The barista greets you warmly.",
  dialogue: [
    { speaker: "Barista", text: "¡Buenos tardes! ¿Qué le puedo servir?", translation: "Good afternoon! What can I serve you?" },
    { speaker: "You", text: "Hola, quiero un café con leche, por favor.", translation: "Hello, I would like a coffee with milk, please." },
    { speaker: "Barista", text: "¡Muy bien! ¿Grande o pequeño?", translation: "Very good! Large or small?" },
    { speaker: "You", text: "Grande, por favor. ¿Tienen churros?", translation: "Large, please. Do you have churros?" },
    { speaker: "Barista", text: "¡Sí, claro! Los churros están recién hechos.", translation: "Yes, of course! The churros are freshly made." },
    { speaker: "You", text: "Perfecto. Un café grande y churros, por favor.", translation: "Perfect. A large coffee and churros, please." },
  ],
  vocabulary: [
    { word: "café con leche", meaning: "coffee with milk", context: "The most common coffee order in Spain" },
    { word: "por favor", meaning: "please", context: "Essential politeness — used in nearly every transaction" },
    { word: "grande", meaning: "large", context: "Size descriptor, used for food and drink orders" },
    { word: "pequeño", meaning: "small", context: "Opposite of grande" },
    { word: "recién hechos", meaning: "freshly made", context: "'Recién' = recently/just, 'hechos' = made (past participle)" },
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetLanguage, level, topic } = body;

    if (!targetLanguage || !level) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: targetLanguage, level" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, result: demoImmersion });
    }

    const client = new Anthropic({ apiKey });

    const topicNote = topic ? ` The scenario should involve: ${topic}.` : "";

    const msg = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are LINGUA, an immersive language learning engine. Generate a realistic conversation scenario in ${targetLanguage} at the ${level} level. Include translations and vocabulary highlights.${topicNote} Respond with ONLY valid JSON: { "scenario": string, "dialogue": [{"speaker": string, "text": string, "translation": string}], "vocabulary": [{"word": string, "meaning": string, "context": string}] }`,
      messages: [
        {
          role: "user",
          content: `Generate an immersion exercise in ${targetLanguage} for a ${level} student.${topic ? ` Topic: ${topic}` : ""}`,
        },
      ],
    });

    const content = msg.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ success: true, result: demoImmersion });
    }

    try {
      const result = JSON.parse(content.text);
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json({ success: true, result: demoImmersion });
    }
  } catch (error) {
    console.error("Immersion exercise error:", error);
    return NextResponse.json({ success: true, result: demoImmersion });
  }
}
