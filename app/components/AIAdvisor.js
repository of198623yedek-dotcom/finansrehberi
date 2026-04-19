'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput('');
    const nextUser = { role: 'user', content: text };
    const history = [...messages, nextUser];
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
      }
    } catch {
      setError('Bağlantı hatası. Tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

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
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            <div
              ref={listRef}
              className="min-h-[200px] flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.length === 0 && !loading && (
                <p className="text-sm text-slate-400">
                  Borsa, döviz, altın, kripto veya bütçe hakkında soru sorabilirsin. Kesin al/sat tavsiyesi vermem;
                  eğitim amaçlı yanıtlarım.
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
                <p className="text-xs text-slate-500 animate-pulse">Yazıyor…</p>
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
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Sorunuzu yazın…"
                  rows={2}
                  className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
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
