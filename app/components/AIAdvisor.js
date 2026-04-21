'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { QUICK_SUGGESTIONS } from '@/lib/ai-advisor-prompt';
import MarkdownRenderer from './MarkdownRenderer';

/* ───────── helpers ───────── */
function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

/* ───────── component ───────── */
export default function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const listRef = useRef(null);
  const messagesRef = useRef([]);
  const recognitionRef = useRef(null);
  const speechTranscriptRef = useRef('');
  const speechCancelRef = useRef(false);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);

  messagesRef.current = messages;

  /* auto-scroll */
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, open, loading, streamingText]);

  /* cancel TTS on close */
  useEffect(() => {
    if (!open && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [open]);

  /* auto-focus textarea on open */
  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }, [open]);

  /* ───────── streaming send ───────── */
  const send = useCallback(
    async (forcedText) => {
      const text = (typeof forcedText === 'string' ? forcedText : input).trim();
      if (!text || loading) return;

      setError(null);
      setInput('');
      setShowSuggestions(false);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      const nextUser = { role: 'user', content: text };
      const history = [...messagesRef.current, nextUser];
      setMessages(history);
      setLoading(true);
      setStreamingText('');

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/advisor/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
            stream: true,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Yanıt alınamadı');
          setLoading(false);
          return;
        }

        const contentType = res.headers.get('content-type') || '';

        /* SSE streaming */
        if (contentType.includes('text/event-stream')) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let fullText = '';
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const payload = line.slice(6).trim();
              if (payload === '[DONE]') break;

              try {
                const parsed = JSON.parse(payload);
                if (parsed.error) {
                  setError(parsed.error);
                  break;
                }
                if (parsed.text) {
                  fullText += parsed.text;
                  setStreamingText(fullText);
                }
              } catch {
                /* ignore parse error */
              }
            }
          }

          if (fullText) {
            setMessages((prev) => [...prev, { role: 'assistant', content: fullText }]);
            if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
              const u = new SpeechSynthesisUtterance(fullText.replace(/[*#`_]/g, ''));
              u.lang = 'tr-TR';
              window.speechSynthesis.speak(u);
            }
          }
        } else {
          /* fallback: non-streaming JSON */
          const data = await res.json().catch(() => ({}));
          if (data.reply) {
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
            if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
              const u = new SpeechSynthesisUtterance(data.reply.replace(/[*#`_]/g, ''));
              u.lang = 'tr-TR';
              window.speechSynthesis.speak(u);
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Bağlantı hatası. Tekrar deneyin.');
        }
      } finally {
        setLoading(false);
        setStreamingText('');
        abortRef.current = null;
      }
    },
    [input, loading, ttsEnabled]
  );

  /* ───────── speech recognition ───────── */
  const toggleSpeech = useCallback(() => {
    if (typeof window === 'undefined' || loading) return;

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError('Bu tarayıcı sesli girişi desteklemiyor. Chrome veya Edge kullanın.');
      return;
    }

    if (listening && recognitionRef.current) {
      speechCancelRef.current = true;
      recognitionRef.current.abort();
      recognitionRef.current = null;
      setListening(false);
      return;
    }

    speechCancelRef.current = false;
    speechTranscriptRef.current = '';
    const rec = new SR();
    rec.lang = 'tr-TR';
    rec.interimResults = true;
    rec.continuous = false;

    rec.onresult = (event) => {
      let t = '';
      for (let i = 0; i < event.results.length; i++) {
        t += event.results[i][0].transcript;
      }
      t = t.trim();
      speechTranscriptRef.current = t;
      setInput(t);
    };

    rec.onerror = (event) => {
      if (event.error === 'aborted') return;
      if (event.error === 'not-allowed') {
        setError('Mikrofon izni gerekli. Tarayıcı ayarlarından izin verin.');
      } else if (event.error !== 'no-speech') {
        setError('Ses tanınamadı. Tekrar deneyin.');
      }
      setListening(false);
      recognitionRef.current = null;
    };

    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      const cancelled = speechCancelRef.current;
      speechCancelRef.current = false;
      const t = speechTranscriptRef.current.trim();
      speechTranscriptRef.current = '';
      if (!cancelled && t) {
        void send(t);
      }
    };

    recognitionRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
      recognitionRef.current = null;
      setError('Mikrofon başlatılamadı.');
    }
  }, [listening, loading, send]);

  /* cleanup */
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      abortRef.current?.abort();
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingText('');
    setError(null);
    setShowSuggestions(true);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const stopGeneration = () => {
    abortRef.current?.abort();
    setLoading(false);
    setStreamingText('');
  };

  /* ───────── render ───────── */
  return (
    <>
      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={classNames(
          'fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full px-5 py-3.5',
          'text-sm font-semibold text-white shadow-xl transition-all duration-300',
          'hover:scale-105 hover:shadow-2xl active:scale-95',
          'md:bottom-8 md:right-8',
          open
            ? 'bg-slate-700 shadow-slate-900/40'
            : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 shadow-violet-900/40'
        )}
        aria-expanded={open}
        aria-label="Yapay zeka finans danışmanını aç veya kapat"
        style={{
          animation: open ? 'none' : 'advisor-pulse 2s ease-in-out infinite',
        }}
      >
        <span className="text-lg" aria-hidden>
          {open ? '✕' : '✨'}
        </span>
        <span className="hidden sm:inline">{open ? 'Kapat' : 'AI Danışman'}</span>
      </button>

      {/* Chat Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-end bg-black/60 backdrop-blur-sm p-3 sm:items-center sm:p-6 animate-[advisor-fade-in_0.2s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-advisor-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[min(680px,90vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-600/50 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-2xl shadow-black/40 animate-[advisor-slide-up_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ─── Header ─── */}
            <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/40 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg shadow-lg shadow-violet-900/30">
                  🤖
                </div>
                <div>
                  <h2 id="ai-advisor-title" className="text-sm font-bold text-white">
                    Finans Asistan
                  </h2>
                  <p className="text-[10px] text-slate-500">
                    AI destekli • Yatırım tavsiyesi değildir
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {/* TTS toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setTtsEnabled((v) => !v);
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={classNames(
                    'rounded-lg p-2 transition-colors',
                    ttsEnabled
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-slate-500 hover:bg-slate-700 hover:text-white'
                  )}
                  aria-pressed={ttsEnabled}
                  aria-label={ttsEnabled ? 'Sesli yanıt açık' : 'Sesli yanıt kapalı'}
                  title="Yanıtları sesli oku"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </button>
                {/* Clear chat */}
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-700 hover:text-white"
                    aria-label="Sohbeti temizle"
                    title="Sohbeti temizle"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-700 hover:text-white"
                  aria-label="Kapat"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div
              ref={listRef}
              className="min-h-[220px] flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-smooth"
              style={{ scrollbarGutter: 'stable' }}
            >
              {/* Welcome message */}
              {messages.length === 0 && !loading && (
                <div className="animate-[advisor-fade-in_0.4s_ease-out]">
                  <div className="mb-4 rounded-2xl border border-slate-700/40 bg-slate-800/50 px-4 py-4">
                    <p className="mb-2 text-sm font-medium text-white">
                      👋 Merhaba! Ben <strong>Finans Asistan</strong>.
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Borsa, döviz, altın, kripto, yatırım araçları ve kişisel finans hakkında
                      sorularınızı yanıtlayabilirim. Yazarak veya mikrofon ile sorabilirsiniz.
                    </p>
                  </div>

                  {/* Quick suggestions */}
                  {showSuggestions && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                        Hızlı Sorular
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {QUICK_SUGGESTIONS.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => send(s.text)}
                            className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/40 px-3 py-2.5 text-left text-xs text-slate-300 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                          >
                            <span className="shrink-0 text-base">{s.icon}</span>
                            <span className="line-clamp-2">{s.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={classNames(
                    'flex animate-[advisor-fade-in_0.2s_ease-out]',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role === 'assistant' && (
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-sm">
                      🤖
                    </div>
                  )}
                  <div
                    className={classNames(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/20'
                        : 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
                    )}
                  >
                    {m.role === 'assistant' ? (
                      <MarkdownRenderer content={m.content} />
                    ) : (
                      m.content.split('\n').map((line, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {line}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}

              {/* Streaming in progress */}
              {loading && streamingText && (
                <div className="flex justify-start animate-[advisor-fade-in_0.2s_ease-out]">
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-sm">
                    🤖
                  </div>
                  <div className="max-w-[85%] rounded-2xl border border-slate-700/50 bg-slate-800/80 px-3.5 py-2.5 text-sm leading-relaxed text-slate-100">
                    <MarkdownRenderer content={streamingText} />
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-400" />
                  </div>
                </div>
              )}

              {/* Loading dots (before stream starts) */}
              {loading && !streamingText && (
                <div className="flex justify-start animate-[advisor-fade-in_0.2s_ease-out]">
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-600/20 text-sm">
                    🤖
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl border border-slate-700/50 bg-slate-800/80 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                    <span className="ml-2 text-xs text-slate-500">Düşünüyor...</span>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 animate-[advisor-fade-in_0.2s_ease-out]">
                  <span className="shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* ─── Input Area ─── */}
            <form
              className="border-t border-slate-700/60 bg-slate-800/30 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              {/* Stop button */}
              {loading && (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-red-500/50 hover:text-red-400"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  Yanıtı durdur
                </button>
              )}

              <div className="flex gap-2">
                {/* Mic button */}
                <button
                  type="button"
                  onClick={toggleSpeech}
                  disabled={loading}
                  aria-pressed={listening}
                  aria-label={listening ? 'Dinlemeyi durdur' : 'Mikrofonla konuş'}
                  title={listening ? 'Durdur' : 'Mikrofon'}
                  className={classNames(
                    'self-end shrink-0 rounded-xl border p-2.5 transition-all',
                    listening
                      ? 'border-rose-500 bg-rose-950/80 text-rose-300 ring-2 ring-rose-500/50 animate-pulse'
                      : 'border-slate-600/50 bg-slate-800/60 text-slate-400 hover:border-indigo-500 hover:text-white',
                    'disabled:opacity-40'
                  )}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                  </svg>
                </button>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={listening ? '🎤 Dinleniyor…' : 'Finansal sorunuzu yazın…'}
                  rows={1}
                  className="min-h-[42px] max-h-[120px] flex-1 resize-none rounded-xl border border-slate-600/50 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  disabled={loading || listening}
                  style={{ fieldSizing: 'content' }}
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={loading || listening || !input.trim()}
                  className={classNames(
                    'self-end rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all',
                    'disabled:opacity-30',
                    input.trim()
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-900/30 hover:shadow-xl hover:from-indigo-500 hover:to-violet-500'
                      : 'bg-slate-700'
                  )}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Inline Styles for animations ─── */}
      <style jsx global>{`
        @keyframes advisor-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(124, 58, 237, 0); }
        }
        @keyframes advisor-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes advisor-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
