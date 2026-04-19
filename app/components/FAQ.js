'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'FinansRehberi kimdir?',
      answer: 'FinansRehberi, borsa, kripto para ve yatırım stratejileri hakkında kapsamlı bilgi sunan bir finans rehberlik platformudur. Başlangıçtan profesyonel seviyeye kadar tüm yatırımcılar için içerik üretiyoruz.'
    },
    {
      id: 2,
      question: 'Yazıları ücretsiz mi okuyabilirim?',
      answer: 'Evet! Tüm makalelerimiz tamamen ücretsizdir. Hiçbir gizli ücret veya premium üyelik yoktur.'
    },
    {
      id: 3,
      question: 'İçerikler ne sıklıkta güncelleniyor?',
      answer: 'Haftada 1-2 yeni makale ekliyoruz. Pazar koşulları değiştiğinde eski makaleleri güncelliyoruz.'
    },
    {
      id: 4,
      question: 'Yatırım tavsiyesi veriyor musunuz?',
      answer: 'Hayır, biz yatırım tavsiyesi vermeyiz. Yalnızca eğitim ve bilgi sağlıyoruz. Tüm yatırım kararlarınız kendi sorumluluğunuzda olmalıdır.'
    },
    {
      id: 5,
      question: 'AdSense reklamları neden var?',
      answer: 'Google AdSense reklamları, sitenin bakım ve geliştirme masraflarını karşılamak için kullanılır. Bu sayede ücretsiz kaliteli içerik sunabiliyoruz.'
    },
    {
      id: 6,
      question: 'Kripto para güvenli mi?',
      answer: 'Kripto para teknolojisi güvenlidir, ancak kayıp riski yüksektir. Makale serimizde kripto para güvenliği ve risk yönetimi hakkında detaylı bilgi verilir.'
    },
    {
      id: 7,
      question: 'Başlangıçta ne kadar para ile başlayabilirim?',
      answer: 'Birkaç dolar ile başlayabilirsiniz! Çoğu platform kesirli hisse ve düşük minimum işlemlere izin verir. Önemli olan başlamaktır.'
    },
    {
      id: 8,
      question: 'Hangi broker\'ı seçmeliyim?',
      answer: 'En iyi broker kişiye göre değişir. Yazılarımızda popüler brokerler karşılaştırılır. Düşük ücretler, güvenlik ve kullanıcı dostu arayüzü tercih edin.'
    }
  ];

  return (
    <section className="py-12 my-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Sık Sorulan Sorular</h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-700 transition"
              >
                <span className="font-bold text-slate-100">{faq.question}</span>
                <span className={`text-accent text-2xl transition ${openId === faq.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 bg-slate-700 border-t border-slate-600">
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
