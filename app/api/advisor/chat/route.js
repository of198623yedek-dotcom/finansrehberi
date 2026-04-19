import { NextResponse } from 'next/server';
import { ADVISOR_SYSTEM_PROMPT } from '@/lib/ai-advisor-prompt';

const MAX_USER_CHARS = 4000;
const MAX_HISTORY = 12;

export const runtime = 'nodejs';

function resolveProvider() {
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  if (groqKey) {
    return {
      kind: 'groq',
      apiKey: groqKey,
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    };
  }
  if (openaiKey) {
    return {
      kind: 'openai',
      apiKey: openaiKey,
      url: 'https://api.openai.com/v1/chat/completions',
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    };
  }
  return null;
}

export async function POST(request) {
  const provider = resolveProvider();
  if (!provider) {
    return NextResponse.json(
      {
        error:
          'AI danışman yapılandırılmadı. GROQ_API_KEY veya OPENAI_API_KEY ekleyin (.env.local / Vercel).',
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

  const payload = {
    model: provider.model,
    messages: [{ role: 'system', content: ADVISOR_SYSTEM_PROMPT }, ...messages],
    max_tokens: 900,
    temperature: 0.65,
  };

  try {
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg =
        data?.error?.message ||
        (typeof data?.error === 'string' ? data.error : null) ||
        'Model isteği başarısız';
      console.error(`${provider.kind} error:`, data);
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
