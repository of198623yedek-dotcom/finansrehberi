import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { ADVISOR_SYSTEM_PROMPT } from '@/lib/ai-advisor-prompt';

const MAX_USER_CHARS = 6000;
const MAX_HISTORY = 20;

/** Groq konsolda kaldırılan modeller; env'de kalmış eski değerleri yeni varsayılana çevir */
const GROQ_DEFAULT_MODEL = 'llama-3.3-70b-versatile';

function resolveGroqModel(raw) {
  let m = String(raw || GROQ_DEFAULT_MODEL).trim();
  m = m.replace(/^["']|["']$/g, '').trim();
  if (!m) return GROQ_DEFAULT_MODEL;
  const lower = m.toLowerCase();
  if (lower === 'llama3-8b-8192' || lower.includes('llama3-8b-8192')) {
    return GROQ_DEFAULT_MODEL;
  }
  return m;
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

  const { messages: rawMessages, stream: wantStream } = body;
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

  const systemMessages = [{ role: 'system', content: ADVISOR_SYSTEM_PROMPT }];

  /* ───────── Streaming response ───────── */
  if (wantStream) {
    try {
      let streamResponse;
      try {
        streamResponse = await client.chat.completions.create({
          model,
          messages: [...systemMessages, ...messages],
          max_tokens: 1500,
          temperature: 0.6,
          stream: true,
        });
      } catch (firstErr) {
        const code = firstErr?.code ?? firstErr?.error?.code;
        if (groqKey && code === 'model_decommissioned') {
          streamResponse = await client.chat.completions.create({
            model: GROQ_DEFAULT_MODEL,
            messages: [...systemMessages, ...messages],
            max_tokens: 1500,
            temperature: 0.6,
            stream: true,
          });
        } else {
          throw firstErr;
        }
      }

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamResponse) {
              const text = chunk.choices[0]?.delta?.content;
              if (text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (err) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: err.message || 'Stream hatası' })}\n\n`)
            );
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } catch (error) {
      const msg =
        error?.message ||
        error?.error?.message ||
        (typeof error === 'string' ? error : null) ||
        'Stream isteği başarısız';
      console.error('advisor stream:', error);
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  }

  /* ───────── Standard response ───────── */
  try {
    let completion;
    try {
      completion = await client.chat.completions.create({
        model,
        messages: [...systemMessages, ...messages],
        max_tokens: 1500,
        temperature: 0.6,
      });
    } catch (firstErr) {
      const code = firstErr?.code ?? firstErr?.error?.code;
      if (groqKey && code === 'model_decommissioned') {
        completion = await client.chat.completions.create({
          model: GROQ_DEFAULT_MODEL,
          messages: [...systemMessages, ...messages],
          max_tokens: 1500,
          temperature: 0.6,
        });
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
