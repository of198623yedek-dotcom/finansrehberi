'use client';

import Link from 'next/link';

export default function StockCard({ stock }) {
  const isPositive = stock.change >= 0;
  const categoryColors = {
    'Teknoloji': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Finans': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
    'Kripto': 'from-orange-500/20 to-yellow-500/20 border-orange-500/30',
    'Diğer': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  };

  const getCategory = (symbol) => {
    if (['BTC', 'ETH', 'XRP', 'BNB'].includes(symbol)) return 'Kripto';
    if (['JPM', 'GS', 'BAC'].includes(symbol)) return 'Finans';
    if (['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'NFLX'].includes(symbol)) return 'Teknoloji';
    return 'Diğer';
  };

  const category = getCategory(stock.symbol);
  const categoryColor = categoryColors[category] || categoryColors['Diğer'];

  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <div
        className={`group relative p-6 rounded-xl bg-gradient-to-br ${categoryColor} border backdrop-blur-sm cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1`}
      >
        {/* Symbol Badge */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{stock.symbol}</h3>
            <p className="text-sm text-slate-400 truncate">{stock.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            category === 'Teknoloji'
              ? 'bg-blue-500/20 text-blue-300'
              : category === 'Finans'
              ? 'bg-emerald-500/20 text-emerald-300'
              : category === 'Kripto'
              ? 'bg-orange-500/20 text-orange-300'
              : 'bg-purple-500/20 text-purple-300'
          }`}>
            {category}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-white">
            ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Change */}
        <div className={`flex items-center gap-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          <span className="text-2xl">
            {isPositive ? '▲' : '▼'}
          </span>
          <span className="font-semibold">
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        {/* Hover Effect - Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl bg-black/50 backdrop-blur-sm">
          <span className="text-white font-semibold">Detayları Gör →</span>
        </div>
      </div>
    </Link>
  );
}
