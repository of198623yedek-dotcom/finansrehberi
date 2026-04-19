'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { removeFromWatchlist, disablePriceAlert } from '@/lib/watchlistService';
import { useState } from 'react';

export function WatchlistComponent({ compact = false }) {
  const { watchlist, refreshWatchlist, user } = useAuth();
  const [removing, setRemoving] = useState(null);

  const handleRemove = async (watchlistId, assetName) => {
    if (!confirm(`${assetName} favorilerden çıkarılsın mı?`)) return;

    setRemoving(watchlistId);
    const result = await removeFromWatchlist(user.id, watchlistId);
    if (result.success) {
      await refreshWatchlist();
    }
    setRemoving(null);
  };

  if (compact && watchlist.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>📭 Henüz favori eklemediniz</p>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'space-y-4'}>
      {/* Grid View (Compact) */}
      {compact ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((item) => (
            <div
              key={item.watchlist_id}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:border-blue-400/50 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-white text-lg">{item.asset_name}</p>
                  <p className="text-gray-400 text-sm">{item.asset_symbol}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.watchlist_id, item.asset_name)}
                  disabled={removing === item.watchlist_id}
                  className="text-red-400 hover:text-red-300 transition text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">
                  {item.current_price || 'N/A'}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    item.change_percent >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {item.change_percent >= 0 ? '+' : ''}{item.change_percent?.toFixed(2)}%
                </p>
              </div>

              <Link
                href={`/assets/${item.asset_id}`}
                className="mt-3 block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm"
              >
                Detaylı Analiz
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // Table View (Full)
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Varlık</th>
                <th className="text-right px-4 py-3 text-gray-400 font-semibold">Fiyat</th>
                <th className="text-right px-4 py-3 text-gray-400 font-semibold">24h %</th>
                <th className="text-right px-4 py-3 text-gray-400 font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item.watchlist_id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{item.asset_name}</p>
                      <p className="text-sm text-gray-400">{item.asset_symbol}</p>
                    </div>
                  </td>
                  <td className="text-right px-4 py-3 text-white">{item.current_price || 'N/A'}</td>
                  <td
                    className={`text-right px-4 py-3 font-semibold ${
                      item.change_percent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {item.change_percent >= 0 ? '+' : ''}{item.change_percent?.toFixed(2)}%
                  </td>
                  <td className="text-right px-4 py-3 space-x-2">
                    <Link
                      href={`/assets/${item.asset_id}`}
                      className="text-blue-400 hover:text-blue-300 transition text-sm"
                    >
                      Analiz
                    </Link>
                    <button
                      onClick={() => handleRemove(item.watchlist_id, item.asset_name)}
                      disabled={removing === item.watchlist_id}
                      className="text-red-400 hover:text-red-300 transition text-sm"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WatchlistComponent;
