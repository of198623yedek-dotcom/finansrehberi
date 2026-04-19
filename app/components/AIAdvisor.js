'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const listRef = useRef(null);
  const messagesRef = useRef([]);
  const recognitionRef = useRef(null);
  const speechTranscriptRef = useRef('');
  const speechCancelRef = useRef(false);

  messagesRef.current = messages;

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, loading]);

  useEffect(() => {
    if (!open && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [open]);

  const send = useCallback(async (forcedText) => {
    const text = (typeof forcedText === 'string' ? forcedText : input).trim();
    if (!text || loading) return;

    setError(null);
    setInput('');
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    const nextUser = { role: 'user', content: text };
    const history = [...messagesRef.current, nextUser];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Yanıt alınamadı');
        return;
      }
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        if (
          ttsEnabled &&
          typeof window !== 'undefined' &&
          window.speechSynthesis &&
          data.reply.trim()
        ) {
          const u = new SpeechSynthesisUtterance(data.reply);
          u.lang = 'tr-TR';
          window.speechSynthesis.speak(u);
        }
      }
    } catch {
      setError('Bağlantı hatası. Tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }, [input, loading, ttsEnabled]);

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

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-indigo-500 md:bottom-8 md:right-8"
        aria-expanded={open}
        aria-label="Yapay zeka finans danışmanını aç veya kapat"
      >
        <span className="text-lg" aria-hidden>
          ✨
        </span>
        <span className="hidden sm:inline">AI Danışman</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-end bg-black/50 p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-advisor-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[min(620px,85vh)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-600 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
              <div>
                <h2 id="ai-advisor-title" className="text-sm font-bold text-white">
                  Finans Danışmanı
                </h2>
                <p className="text-[10px] text-slate-500">Yapay zeka — genel bilgi, yatırım tavsiyesi değildir</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setTtsEnabled((v) => !v);
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`rounded-lg p-2 hover:bg-slate-800 ${
                    ttsEnabled ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={ttsEnabled}
                  aria-label={ttsEnabled ? 'Sesli yanıt açık' : 'Sesli yanıt kapalı'}
                  title="Yanıtları sesli oku"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              ref={listRef}
              className="min-h-[200px] flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.length === 0 && !loading && (
                <p className="text-sm text-slate-400">
                  Merhaba — borsa, döviz, altın veya bütçe hakkında yazabilir veya alttaki mikrofonla sorabilirsin.
                  Kesin al/sat tavsiyesi vermem; eğitim amaçlı yanıtlarım. İstersen üstteki hoparlör ile yanıtları sesli
                  dinleyebilirsin.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}
                  >
                    {m.content.split('\n').map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[90%] items-center gap-0.5 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-400">
                    <span>Yanıt hazırlanıyor</span>
                    <span className="inline-block animate-bounce">.</span>
                    <span className="inline-block animate-bounce [animation-delay:0.12s]">.</span>
                    <span className="inline-block animate-bounce [animation-delay:0.24s]">.</span>
                  </div>
                </div>
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <form
              className="border-t border-slate-700 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleSpeech}
                  disabled={loading}
                  aria-pressed={listening}
                  aria-label={listening ? 'Dinlemeyi durdur' : 'Mikrofonla konuş'}
                  title={listening ? 'Durdur' : 'Mikrofon'}
                  className={`self-end shrink-0 rounded-xl border px-3 py-2 transition ${
                    listening
                      ? 'border-rose-500 bg-rose-950/80 text-rose-200 ring-2 ring-rose-500/50'
                      : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white'
                  } disabled:opacity-40`}
                >
                  <span className="sr-only">{listening ? 'Dinleniyor' : 'Mikrofon'}</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                  </svg>
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={listening ? 'Dinleniyor…' : 'Sorunuzu yazın…'}
                  rows={2}
                  className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  disabled={loading || listening}
                />
                <button
                  type="submit"
                  disabled={loading || listening || !input.trim()}
                  className="self-end rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
