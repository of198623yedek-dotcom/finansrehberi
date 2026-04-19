'use client';

import Link from 'next/link';
import { DashboardCard } from './DashboardCard';

/**
 * Dashboard Overview Component
 * Şık dashboard kartları grid'i
 */
export function DashboardOverview({ data }) {
  const defaultCards = [
    {
      icon: '📊',
      title: 'Borsa',
      description: 'BIST 100, BIST 50 ve diğer endeksler',
      status: 'Canlı',
      statusColor: 'bg-blue-100 text-blue-700',
      value: 'XU100',
      link: '/market',
      actionText: 'Borsa Verileri'
    },
    {
      icon: '🚀',
      title: 'Halka Arz',
      description: 'IPO takvimi, filtreler ve lot ile kar/zarar hesaplayıcı',
      status: 'Güncel',
      statusColor: 'bg-purple-100 text-purple-700',
      value: 'IPO Panel',
      link: '/halka-arz',
      actionText: 'Panele git'
    },
    {
      icon: '💰',
      title: 'Altın',
      description: 'Canlı altın fiyatları ve analizler',
      status: 'Trend',
      statusColor: 'bg-yellow-100 text-yellow-700',
      value: 'Ons Altın',
      link: '/assets/altin',
      actionText: 'Altın Fiyatları'
    },
    {
      icon: '₿',
      title: 'Bitcoin',
      description: 'Kripto para piyasası ve grafikleri',
      status: 'Volatile',
      statusColor: 'bg-orange-100 text-orange-700',
      value: 'BTC/USD',
      link: '/assets/bitcoin',
      actionText: 'Kripto Verileri'
    },
    {
      icon: '💵',
      title: 'Döviz',
      description: 'USD, EUR, GBP ve diğer kur pariteler',
      status: 'Güncel',
      statusColor: 'bg-green-100 text-green-700',
      value: 'USD/TRY',
      link: '/assets/usd-try',
      actionText: 'Döviz Kurları'
    },
    {
      icon: '📈',
      title: 'Watchlist',
      description: 'Takip ettiğin varlıkları ve alertları yönet',
      status: 'Kişisel',
      statusColor: 'bg-indigo-100 text-indigo-700',
      value: 'Favoriler',
      link: '/dashboard',
      actionText: 'Watchlist\'im'
    },
  ];

  const cards = data || defaultCards;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">📊 Dashboard</h2>
          <p className="text-gray-600">Tüm finansal araçlara hızlı erişim</p>
          <div className="mt-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 text-sm text-slate-800">
            <strong className="text-purple-800">Yeni:</strong> Halka arz sayfasında IPO takvimi, filtreler ve lot bazlı hesaplayıcı var.{' '}
            <Link href="/halka-arz" className="font-semibold text-purple-700 underline decoration-purple-400 underline-offset-2 hover:text-purple-900">
              Halka Arz aracını aç →
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <DashboardCard
              key={idx}
              icon={card.icon}
              title={card.title}
              description={card.description}
              status={card.status}
              statusColor={card.statusColor}
              value={card.value}
              change={card.change}
              isPositive={card.isPositive}
              link={card.link}
              actionText={card.actionText}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-bold text-black mb-3">💡 İpuçları</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Her kartın üzerine hover yap ve detaylarını gör</li>
            <li>✓ Kartlara tıkla ve daha derinlemesine analiz et</li>
            <li>✓ Watchlist'e eklediklerini takip et ve alertlar al</li>
            <li>✓ Halka Arz aracı ile kar/zarar hesapla</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DashboardOverview;
