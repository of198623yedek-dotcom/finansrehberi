'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email doğrulama
    if (email && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-accent to-blue-600 py-12 rounded-lg my-12">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-3">Haftalık İçerik Almak İster misin?</h2>
        <p className="text-primary text-opacity-90 mb-6">
          En yeni finans stratejileri, yatırım ipuçları ve kripto haberleri doğrudan posta kutunuza gelsun.
        </p>

        {submitted ? (
          <div className="bg-green-500 text-primary px-6 py-3 rounded-lg font-bold">
            ✓ Başarıyla kaydedildiniz! Hoşgeldiniz!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email adresinizi girin..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-accent font-bold rounded-lg hover:bg-opacity-90 transition"
            >
              Abone Ol
            </button>
          </form>
        )}

        <p className="text-primary text-opacity-70 text-sm mt-4">
          Spam göndermeyiz. Aboneliğinizi istediğiniz zaman iptal edebilirsiniz.
        </p>
      </div>
    </section>
  );
}
