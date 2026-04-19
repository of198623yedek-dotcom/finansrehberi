import { NextResponse } from 'next/server';
import { ADVISOR_SYSTEM_PROMPT } from '@/lib/ai-advisor-prompt';

const MAX_USER_CHARS = 4000;
const MAX_HISTORY = 12;

export const runtime = 'nodejs';

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'AI danışman yapılandırılmadı. OPENAI_API_KEY ortam değişkenini ekleyin (yerelde .env.local, canlıda Vercel).',
      },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi' }, { status: 400 });
  }

  const { messages: rawMessages } = body;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: 'messages dizisi gerekli' }, { status: 400 });
  }

  const messages = rawMessages
    .slice(-MAX_HISTORY)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_USER_CHARS),
    }));

  if (messages.length === 0) {
    return NextResponse.json({ error: 'Geçerli mesaj yok' }, { status: 400 });
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: ADVISOR_SYSTEM_PROMPT }, ...messages],
        max_tokens: 900,
        temperature: 0.65,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || 'OpenAI isteği başarısız';
      console.error('OpenAI error:', data);
      return NextResponse.json({ error: msg }, { status: res.status >= 400 && res.status < 600 ? res.status : 502 });
    }

    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: 'Boş yanıt' }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error('advisor chat:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
