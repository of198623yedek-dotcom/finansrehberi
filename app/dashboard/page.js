'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useProtectedRoute } from '@/lib/useProtectedRoute';
import { WatchlistComponent } from '@/app/components/WatchlistComponent';
import { LoadingSpinner } from '@/app/components/SkeletonLoaders';
import { addToWatchlist } from '@/lib/watchlistService';
import { ASSETS } from '@/lib/assets-data';
import { useState } from 'react';

export default function DashboardPage() {
  const { isAuthorized, loading } = useProtectedRoute();
  const { user, profile, watchlist, refreshWatchlist } = useAuth();
  const [addingAsset, setAddingAsset] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const handleAddToWatchlist = async (asset) => {
    setAddingAsset(asset.id);
    const result = await addToWatchlist(user.id, asset);
    if (result.success) {
      await refreshWatchlist();
    }
    setAddingAsset(null);
  };

  const watchedAssetIds = new Set(watchlist.map((w) => w.asset_id));
  const availableAssets = Object.values(ASSETS).filter((a) => !watchedAssetIds.has(a.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Hoşgeldiniz, {profile?.full_name || 'Kullanıcı'}! 👋
              </h1>
              <p className="text-gray-400">{profile?.email}</p>
            </div>
            <button
              onClick={async () => {
                const { logout } = await import('@/lib/authService');
                await logout();
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Çık
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <p className="text-gray-400 text-sm mb-2">Takip Edilen</p>
            <p className="text-3xl font-bold text-white">{watchlist.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <p className="text-gray-400 text-sm mb-2">Kayıt Tarihi</p>
            <p className="text-xl font-bold text-white">
              {new Date(profile?.created_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <p className="text-gray-400 text-sm mb-2">Son Giriş</p>
            <p className="text-xl font-bold text-white">
              {profile?.last_login
                ? new Date(profile.last_login).toLocaleDateString('tr-TR')
                : 'Şimdi'}
            </p>
          </div>
        </div>

        {/* Watchlist Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">⭐ İzleme Listem</h2>
          {watchlist.length > 0 ? (
            <WatchlistComponent compact={false} />
          ) : (
            <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-gray-400 text-lg mb-6">📭 Henüz favori eklemediniz</p>
              <Link
                href="/market"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Piyasaya Git
              </Link>
            </div>
          )}
        </div>

        {/* Available Assets to Add */}
        {availableAssets.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">➕ Favorilere Ekle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableAssets.slice(0, 6).map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:border-blue-400/50 transition"
                >
                  <p className="font-semibold text-white mb-1">{asset.name}</p>
                  <p className="text-gray-400 text-sm mb-4">{asset.symbol}</p>
                  <button
                    onClick={() => handleAddToWatchlist(asset)}
                    disabled={addingAsset === asset.id}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded transition text-sm font-semibold"
                  >
                    {addingAsset === asset.id ? '⏳ Ekleniyor...' : '⭐ Ekle'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
