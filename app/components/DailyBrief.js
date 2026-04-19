/** Sabah günlük özeti — metinleri burada veya deploy öncesi güncelleyin */
export default function DailyBrief() {
  const briefing = {
    date: new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' }),
    highlight: 'Fed faiz kararları bugün açıklanıyor. Piyasalar oynak olabilir.',
    dolar: '34.20 - 34.80 aralığında seyrediyor.',
    altin: 'Gram altın 2.250 TL seviyesinde.',
    recommendation: 'Yatırımcılar bugün için temkinli duruşu korumalı.',
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-indigo-600 p-6 rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-2xl" aria-hidden>
          📰
        </span>
        <h3 className="text-lg font-bold text-gray-800">Günün Özeti</h3>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{briefing.date}</span>
      </div>

      <p className="text-indigo-800 font-medium mb-4">{briefing.highlight}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
        <div className="flex items-start gap-2">
          <span aria-hidden>💵</span>
          <span>
            <b>Dolar:</b> {briefing.dolar}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span aria-hidden>🪙</span>
          <span>
            <b>Altın:</b> {briefing.altin}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600 italic">
        <span aria-hidden>⚠️ </span>
        {briefing.recommendation} <span className="not-italic text-gray-500">(Genel bilgi, yatırım tavsiyesi değildir.)</span>
      </p>
    </div>
  );
}
