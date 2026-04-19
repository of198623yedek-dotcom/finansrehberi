'use client';

import { useState, useEffect } from 'react';
import { getTopStocks } from '@/lib/finnhub';
import Link from 'next/link';

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStocks() {
      setLoading(true);
      const data = await getTopStocks();
      setStocks(data);
      setLoading(false);
    }
    loadStocks();
  }, []);

  const categorizeStock = (symbol) => {
    if (['BTC', 'ETH', 'XRP', 'BNB'].includes(symbol)) return 'Kripto';
    if (['JPM', 'GS', 'BAC'].includes(symbol)) return 'Finans';
    if (['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'NFLX'].includes(symbol)) return 'Teknoloji';
    return 'Diğer';
  };

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || categorizeStock(stock.symbol) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Teknoloji', 'Finans', 'Kripto', 'Diğer'];

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      {/* Header */}
      <div style={{backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee', padding: '40px 20px', position: 'sticky', top: 0, zIndex: 40}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h1 style={{fontSize: '40px', fontWeight: 'bold', color: '#000', margin: '0 0 15px 0'}}>Hisse Senetleri & Kripto</h1>
          <p style={{color: '#666', fontSize: '16px', margin: 0}}>Gerçek zamanlı veriler ve analiz</p>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '30px 20px'}}>
        
        {/* Search & Filter */}
        <div style={{marginBottom: '30px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'end'}}>
          <input
            type="text"
            placeholder="Hisse ara (AAPL, MSFT, BTC...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '12px 16px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px'}}
          />
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedCategory === cat ? '#000' : '#f0f0f0',
                  color: selectedCategory === cat ? '#fff' : '#000',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#999'}}>Yükleniyor...</div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
            {filteredStocks.map(stock => {
              const changePercent = stock.changePercent || 0;
              const isPositive = changePercent >= 0;
              const category = categorizeStock(stock.symbol);

              return (
                <Link key={stock.symbol} href={`/stocks/${stock.symbol}`} style={{textDecoration: 'none'}}>
                  <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minHeight: '240px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    {/* Header */}
                    <div style={{marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                      <div>
                        <p style={{fontSize: '18px', fontWeight: 'bold', color: '#000', margin: 0}}>{stock.symbol}</p>
                        <p style={{fontSize: '12px', color: '#999', margin: '4px 0 0 0'}}>{stock.name}</p>
                      </div>
                      <span style={{fontSize: '11px', fontWeight: 'bold', backgroundColor: category === 'Kripto' ? '#e0f2fe' : category === 'Teknoloji' ? '#fef3c7' : '#f0fdf4', color: category === 'Kripto' ? '#0369a1' : category === 'Teknoloji' ? '#92400e' : '#166534', padding: '4px 8px', borderRadius: '4px'}}>
                        {category}
                      </span>
                    </div>

                    {/* Price */}
                    <p style={{fontSize: '24px', fontWeight: 'bold', color: '#000', margin: '10px 0'}}>
                      ${stock.price?.toFixed(2) || '0.00'}
                    </p>

                    {/* Change */}
                    <p style={{fontSize: '16px', fontWeight: 'bold', color: isPositive ? '#22c55e' : '#ef4444', margin: 0}}>
                      {isPositive ? '▲' : '▼'} {Math.abs(changePercent).toFixed(2)}%
                    </p>

                    <div style={{flex: 1}} />

                    {/* Details Link */}
                    <div style={{marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee', color: '#3b82f6', fontSize: '14px', fontWeight: 'bold'}}>
                      Detayları Gör →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
