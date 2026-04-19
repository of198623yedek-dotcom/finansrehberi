import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { ADVISOR_SYSTEM_PROMPT } from '@/lib/ai-advisor-prompt';

const MAX_USER_CHARS = 4000;
const MAX_HISTORY = 12;

/** Groq konsolda kaldırılan modeller; env’de kalmış eski değerleri yeni varsayılana çevir */
const GROQ_DEFAULT_MODEL = 'llama-3.3-70b-versatile';

function resolveGroqModel(raw) {
  let m = String(raw || GROQ_DEFAULT_MODEL).trim();
  m = m.replace(/^["']|["']$/g, '').trim();
  if (!m) return GROQ_DEFAULT_MODEL;
  const lower = m.toLowerCase();
  // Groq’un kaldırdığı eski id (env’de tırnak/büyük harf farkı olsa da yakala)
  if (lower === 'llama3-8b-8192' || lower.includes('llama3-8b-8192')) {
    return GROQ_DEFAULT_MODEL;
  }
  return m;
}

async function groqCompletion(client, model, messages) {
  return client.chat.completions.create({
    model,
    messages: [{ role: 'system', content: ADVISOR_SYSTEM_PROMPT }, ...messages],
    max_tokens: 900,
    temperature: 0.65,
  });
}

export const runtime = 'edge';

export async function POST(req) {
  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!groqKey && !openaiKey) {
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
    body = await req.json();
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

  const client = groqKey
    ? new OpenAI({
        apiKey: groqKey,
        baseURL: 'https://api.groq.com/openai/v1',
      })
    : new OpenAI({
        apiKey: openaiKey,
      });

  const groqModel = groqKey ? resolveGroqModel(process.env.GROQ_MODEL) : null;
  const model = groqKey ? groqModel : process.env.OPENAI_MODEL || 'gpt-4o-mini';

  try {
    let completion;
    try {
      completion = await groqCompletion(client, model, messages);
    } catch (firstErr) {
      const code = firstErr?.code ?? firstErr?.error?.code;
      if (groqKey && code === 'model_decommissioned') {
        completion = await groqCompletion(client, GROQ_DEFAULT_MODEL, messages);
      } else {
        throw firstErr;
      }
    }

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: 'Boş yanıt' }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    const msg =
      error?.message ||
      error?.error?.message ||
      (typeof error === 'string' ? error : null) ||
      'Model isteği başarısız';
    console.error('advisor chat:', error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
