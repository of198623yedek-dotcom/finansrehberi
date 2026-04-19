'use client';

import { useState } from 'react';

function num(v, fallback = 0) {
  const n = parseFloat(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : fallback;
}

export default function Calculators() {
  const [tab, setTab] = useState('compound');

  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(20);
  const [years, setYears] = useState(5);
  const [compoundResult, setCompoundResult] = useState(null);

  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanRate, setLoanRate] = useState(2.5);
  const [loanTerm, setLoanTerm] = useState(12);
  const [loanResult, setLoanResult] = useState(null);

  const calcCompound = () => {
    const P = num(principal);
    const r = num(rate) / 100;
    const t = Math.max(0, Math.floor(num(years)));
    const n = 12;
    if (P <= 0 || t <= 0) {
      setCompoundResult(null);
      return;
    }
    const amount = P * Math.pow(1 + r / n, n * t);
    setCompoundResult({
      total: amount.toFixed(2),
      profit: (amount - P).toFixed(2),
    });
  };

  const calcLoan = () => {
    const P = num(loanAmount);
    const monthlyPct = num(loanRate);
    const n = Math.max(1, Math.floor(num(loanTerm)));
    if (P <= 0) {
      setLoanResult(null);
      return;
    }
    const r = monthlyPct / 100;
    let monthly;
    if (r <= 0) {
      monthly = P / n;
    } else {
      monthly = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }
    const totalPay = monthly * n;
    setLoanResult({
      monthly: monthly.toFixed(2),
      totalPay: totalPay.toFixed(2),
      totalInt: (totalPay - P).toFixed(2),
    });
  };

  return (
    <div className="my-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab('compound')}
          className={`flex-1 p-4 text-sm sm:text-base font-semibold transition ${
            tab === 'compound' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          💰 Bileşik faiz
        </button>
        <button
          type="button"
          onClick={() => setTab('loan')}
          className={`flex-1 p-4 text-sm sm:text-base font-semibold transition ${
            tab === 'loan' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          🏦 Kredi taksiti
        </button>
      </div>

      <div className="p-6">
        {tab === 'compound' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Yıllık faiz yılda 12 kez bileşiklenir (aylık dönem). Sonuçlar tahminidir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Ana para (₺)</span>
                <input
                  type="number"
                  min={0}
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value === '' ? 0 : num(e.target.value, 0))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Yıllık faiz (%)</span>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value === '' ? 0 : num(e.target.value, 0))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Süre (yıl)</span>
                <input
                  type="number"
                  min={0}
                  value={years}
                  onChange={(e) => setYears(e.target.value === '' ? 0 : num(e.target.value, 0))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={calcCompound}
              className="bg-emerald-600 text-white w-full py-2.5 rounded-lg hover:bg-emerald-700 font-medium"
            >
              Hesapla
            </button>

            {compoundResult && (
              <div className="bg-emerald-50 p-4 rounded-lg mt-4 border border-emerald-200">
                <p className="text-lg font-bold text-emerald-900">
                  Toplam: {Number(compoundResult.total).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </p>
                <p className="text-emerald-700 mt-1">
                  Tahmini net kazanç: {Number(compoundResult.profit).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}{' '}
                  ₺
                </p>
              </div>
            )}
          </div>
        )}

        {tab === 'loan' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Aylık faiz oranı girişi; eşit taksit (anüite) formülü. Faiz %0 ise taksit anapara / vade.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Kredi tutarı (₺)</span>
                <input
                  type="number"
                  min={0}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value === '' ? 0 : num(e.target.value, 0))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Aylık faiz (%)</span>
                <input
                  type="number"
                  step="0.01"
                  value={loanRate}
                  onChange={(e) => setLoanRate(e.target.value === '' ? 0 : num(e.target.value, 0))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gray-700 font-medium">Vade (ay)</span>
                <input
                  type="number"
                  min={1}
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value === '' ? 1 : num(e.target.value, 1))}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={calcLoan}
              className="bg-orange-600 text-white w-full py-2.5 rounded-lg hover:bg-orange-700 font-medium"
            >
              Taksiti hesapla
            </button>

            {loanResult && (
              <div className="bg-orange-50 p-4 rounded-lg mt-4 border border-orange-200">
                <p className="text-2xl font-bold text-orange-900">
                  {Number(loanResult.monthly).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺{' '}
                  <span className="text-sm font-normal text-orange-800">/ ay</span>
                </p>
                <div className="text-sm text-gray-700 mt-3 flex justify-between gap-2">
                  <span>Toplam ödeme</span>
                  <b>{Number(loanResult.totalPay).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</b>
                </div>
                <div className="text-sm text-gray-700 flex justify-between gap-2 mt-1">
                  <span>Toplam faiz</span>
                  <b className="text-red-700">{Number(loanResult.totalInt).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</b>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-gray-500 border-t border-gray-100 pt-4">
          Bu araçlar eğitim amaçlıdır; gerçek ürün koşulları bankaya göre değişir. Yatırım veya kredi tavsiyesi değildir.
        </p>
      </div>
    </div>
  );
}
