import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing text or targetLanguage' },
        { status: 400 }
      );
    }

    // No translation needed for English
    if (targetLanguage === 'en') {
      return NextResponse.json({ translation: text });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful degradation — return original text
      return NextResponse.json({ translation: text });
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.2,
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: `You are translating the UI of LINGUA, the universal understanding engine. Keep brand names unchanged (LINGUA). Translate the following text to ${targetLanguage}. Return ONLY the translated text, nothing else. No quotes, no explanations.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const translation =
      completion.choices[0]?.message?.content?.trim() || text;

    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Translation API error:', error);
    // Graceful degradation — return original text
    try {
      const body = await req.clone().json();
      return NextResponse.json({ translation: body.text || '' });
    } catch {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
  }
}
