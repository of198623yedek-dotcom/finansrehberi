'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

export default function FinancialChart({ data, symbol = 'BIST100' }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(51, 65, 85, 0.5)' },
        horzLines: { color: 'rgba(51, 65, 85, 0.5)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderColor: 'rgba(51, 65, 85, 1)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(51, 65, 85, 1)',
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    // Generate some realistic-looking mock data if real data isn't provided
    const chartData = data || generateMockCandleData();
    candlestickSeries.setData(chartData);

    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-[400px] relative">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}

function generateMockCandleData() {
  const data = [];
  let basePrice = 13500;
  const now = new Date();
  
  for (let i = 0; i < 100; i++) {
    const time = new Date(now.getTime() - (100 - i) * 24 * 60 * 60 * 1000);
    const open = basePrice + Math.random() * 200 - 100;
    const close = open + Math.random() * 300 - 150;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;
    
    data.push({
      time: time.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    });
    basePrice = close;
  }
  return data;
}
