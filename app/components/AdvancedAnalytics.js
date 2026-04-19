'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

/**
 * Advanced Analytics Component
 * Varlıkların fiyat hareketlerini grafik ile göster
 */

export function PriceChart({ data, title = "Fiyat Trendi" }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg text-center text-gray-500">
        📊 Grafik verisi yükleniyor...
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Fiyat (TL)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ChangeChart({ data, title = "Değişim %" }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar 
            dataKey="change" 
            fill="#10b981" 
            name="Değişim (%)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function VolumeChart({ data, title = "İşlem Hacmi" }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="volume" 
            stroke="#f59e0b" 
            fillOpacity={1} 
            fill="url(#colorVolume)"
            name="Hacim"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AnalyticsStats({ data }) {
  // Her zaman useMemo'yu çağırıyoruz (koşullu değil)
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return { minPrice: 0, maxPrice: 0, avgPrice: 0, avgChange: 0 };
    }

    const prices = data.map(d => d.price).filter(p => p);
    const changes = data.map(d => d.change).filter(c => c);
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length;

    return { minPrice, maxPrice, avgPrice, avgChange };
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600 mb-1">En Düşük</p>
        <p className="text-lg font-bold text-black">{stats.minPrice.toFixed(2)} TL</p>
      </div>
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600 mb-1">En Yüksek</p>
        <p className="text-lg font-bold text-black">{stats.maxPrice.toFixed(2)} TL</p>
      </div>
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <p className="text-xs text-gray-600 mb-1">Ortalama</p>
        <p className="text-lg font-bold text-black">{stats.avgPrice.toFixed(2)} TL</p>
      </div>
      <div className={`bg-white p-4 border border-gray-200 rounded-lg`}>
        <p className="text-xs text-gray-600 mb-1">Ort. Değişim</p>
        <p className={`text-lg font-bold ${stats.avgChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stats.avgChange >= 0 ? '+' : ''}{stats.avgChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

/**
 * Complete Analytics Component
 */
export function AdvancedAnalytics({ asset, data }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg text-center text-gray-500">
        📊 Analiz verileri yükleniyor...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black mb-4">📈 {asset} Analizi</h2>
        <AnalyticsStats data={data} />
      </div>

      <PriceChart data={data} title={`${asset} Fiyat Trendi`} />
      <ChangeChart data={data} title={`${asset} Değişim %`} />
      <VolumeChart data={data} title={`${asset} İşlem Hacmi`} />

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
        💡 <strong>İpucu:</strong> Grafikler üzerine hover yap detayları görmek için.
      </div>
    </section>
  );
}

export default AdvancedAnalytics;
