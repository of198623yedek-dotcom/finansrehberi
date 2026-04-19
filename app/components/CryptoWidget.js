'use client';

// Crypto ticker component - Real-time kripto fiyatları
import { useState, useEffect } from 'react';

export default function CryptoWidget() {
  const [cryptos, setCryptos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana,dogecoin&vs_currencies=usd,try&include_24hr_change=true');
        const data = await response.json();
        setCryptos(data);
        setLoading(false);
      } catch (error) {
        console.error('Crypto fetch error:', error);
        setLoading(false);
      }
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 30000); // 30 segundos
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{padding: '20px', textAlign: 'center'}}>Yükleniyor...</div>;

  const cryptoList = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  ];

  return (
    <div style={{backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee'}}>
      <div style={{backgroundColor: '#2a2a2a', color: '#fff', padding: '15px', fontWeight: 'bold'}}>
        🚀 Kripto Para - Gerçek Zamanlı
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}>
        {cryptoList.map((crypto) => {
          const data = cryptos?.[crypto.id];
          const change = data?.usd_24h_change || 0;
          const price = data?.usd || 0;

          return (
            <div key={crypto.id} style={{padding: '15px', borderRight: '1px solid #eee', borderBottom: '1px solid #eee'}}>
              <p style={{margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '14px'}}>{crypto.symbol}</p>
              <p style={{margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold', color: '#000'}}>
                ${price.toFixed(2)}
              </p>
              <p style={{margin: 0, fontSize: '12px', color: change > 0 ? '#22c55e' : '#ef4444', fontWeight: 'bold'}}>
                {change > 0 ? '+' : ''}{change.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
