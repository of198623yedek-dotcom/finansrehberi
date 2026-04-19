/**
 * Trend Analyzer: Fiyat hareketlerini analiz et, trend güçünü ölç
 * 
 * Özellikler:
 * - Trend güç skoru (0-100)
 * - Volatilite hesaplaması
 * - Support/Resistance levels
 * - Momentum göstergeleri
 */

/**
 * Trend Strength Calculator
 * Girdi: Fiyat değişimi yüzdesi
 * Çıktı: 0-100 puan (0=zayıf, 100=çok güçlü)
 */
export function calculateTrendStrength(changePercent) {
  const absChange = Math.abs(parseFloat(changePercent) || 0);

  if (absChange < 0.5) return 10; // Çok zayıf
  if (absChange < 1) return 25; // Zayıf
  if (absChange < 2) return 45; // Orta
  if (absChange < 4) return 65; // Güçlü
  if (absChange < 6) return 80; // Çok güçlü
  return 95; // Ekstrem
}

/**
 * Volatility Analyzer
 * Son fiyat değişimlerinin volatilitesini ölç
 */
export function analyzeVolatility(historicalPrices = []) {
  if (!historicalPrices || historicalPrices.length < 2) {
    return {
      level: 'Düşük',
      score: 20,
      interpretation: 'Veriler yetersiz',
    };
  }

  // Basit volatilite hesaplaması: standart sapma
  const changes = [];
  for (let i = 1; i < historicalPrices.length; i++) {
    const change = ((historicalPrices[i] - historicalPrices[i - 1]) / historicalPrices[i - 1]) * 100;
    changes.push(change);
  }

  const mean = changes.reduce((a, b) => a + b, 0) / changes.length;
  const variance = changes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / changes.length;
  const stdDev = Math.sqrt(variance);

  let level = 'Düşük';
  let score = 0;

  if (stdDev < 0.5) {
    level = 'Çok Düşük';
    score = 15;
  } else if (stdDev < 1) {
    level = 'Düşük';
    score = 30;
  } else if (stdDev < 2) {
    level = 'Orta';
    score = 50;
  } else if (stdDev < 3) {
    level = 'Yüksek';
    score = 70;
  } else {
    level = 'Çok Yüksek';
    score = 90;
  }

  return {
    level,
    score,
    stdDev: stdDev.toFixed(2),
    interpretation:
      score < 30
        ? 'Stabil hareket, minimal oynaklık'
        : score < 60
        ? 'Normal oynaklık seviyesi'
        : 'Yüksek oynaklık, riskli pozisyon',
  };
}

/**
 * Trend Direction & Momentum
 */
export function analyzeTrendMomentum(changePercent, previousChange = null) {
  const current = parseFloat(changePercent) || 0;
  const previous = parseFloat(previousChange) || 0;

  let direction = 'Nötr';
  let momentum = 'Normal';
  let icon = '➡️';

  if (current > 3) {
    direction = 'Güçlü Yükselmekte';
    icon = '🚀';
  } else if (current > 0.5) {
    direction = 'Yükselmekte';
    icon = '📈';
  } else if (current > -0.5) {
    direction = 'Nötr';
    icon = '➡️';
  } else if (current > -3) {
    direction = 'Düşmekte';
    icon = '📉';
  } else {
    direction = 'Güçlü Düşmekte';
    icon = '📉';
  }

  if (previous > 0 && current > previous) {
    momentum = 'Güçlenme (Acceleration)';
  } else if (previous > 0 && current < previous) {
    momentum = 'Zayıflanma (Deceleration)';
  } else if (previous < 0 && current < previous) {
    momentum = 'Güçlenme (Acceleration)';
  } else if (previous < 0 && current > previous) {
    momentum = 'Zayıflanma (Deceleration)';
  }

  return {
    direction,
    momentum,
    icon,
    score: Math.abs(current),
  };
}

/**
 * RSI-inspired Overextension Detection
 * Varlık aşırı alım/satım (overbought/oversold) mı?
 */
export function detectOverboughtOversold(changePercent) {
  const change = parseFloat(changePercent) || 0;

  if (change > 6) {
    return {
      condition: 'Aşırı Alım (Overbought)',
      risk: 'Yüksek',
      advice: 'Kâr alma ya da pozisyon azaltma düşün',
      emoji: '⚠️',
      level: 80,
    };
  } else if (change > 3) {
    return {
      condition: 'Kuvvetli Alım',
      risk: 'Orta',
      advice: 'Teknik direnç seviyeleri izle',
      emoji: '⬆️',
      level: 60,
    };
  } else if (change > -3 && change < 3) {
    return {
      condition: 'Normal Aralık',
      risk: 'Düşük',
      advice: 'Trend takip stratejisi uygula',
      emoji: '✅',
      level: 50,
    };
  } else if (change < -3) {
    return {
      condition: 'Kuvvetli Satım',
      risk: 'Orta',
      advice: 'Teknik destek seviyeleri kontrol et',
      emoji: '⬇️',
      level: 40,
    };
  } else if (change < -6) {
    return {
      condition: 'Aşırı Satım (Oversold)',
      risk: 'Yüksek',
      advice: 'Alım fırsatı mı? Risk yönetimi önemli',
      emoji: '⚠️',
      level: 20,
    };
  }
}

/**
 * Support & Resistance Levels (Basit Hesaplama)
 * HIGH-LOW farkına göre tahmini resistance/support
 */
export function calculateSupportResistance(currentPrice, highPrice, lowPrice) {
  const atr = (highPrice - lowPrice) / 2;

  const resistance = currentPrice + atr * 0.5;
  const strongResistance = currentPrice + atr;
  const support = currentPrice - atr * 0.5;
  const strongSupport = currentPrice - atr;

  return {
    strongResistance: strongResistance.toFixed(2),
    resistance: resistance.toFixed(2),
    pivot: currentPrice.toFixed(2),
    support: support.toFixed(2),
    strongSupport: strongSupport.toFixed(2),
    atr: atr.toFixed(2),
  };
}

/**
 * Tam Trend Raporu
 */
export function generateCompleteTrendReport(assetName, priceData) {
  if (!priceData) {
    return {
      assetName,
      summary: 'Veri yetersiz',
    };
  }

  const changePercent = priceData.changePercent || 0;
  const trendStrength = calculateTrendStrength(changePercent);
  const momentum = analyzeTrendMomentum(changePercent, priceData.previousChange);
  const overbought = detectOverboughtOversold(changePercent);
  const supportResistance = calculateSupportResistance(
    priceData.value,
    priceData.high,
    priceData.low
  );

  return {
    assetName,
    currentPrice: priceData.value,
    change: changePercent,
    changeAbsolute: priceData.change,
    trendStrength,
    momentum,
    overbought,
    supportResistance,
    summary: {
      headline: `${assetName} ${momentum.icon} ${momentum.direction}`,
      analysis: `Trend gücü: %${trendStrength}, Momentum: ${momentum.momentum}, Risk: ${overbought.risk}`,
      recommendation: overbought.advice,
    },
  };
}

/**
 * Comparison: Bu varlık diğerlerine göre nasıl?
 */
export function compareAssetPerformance(assets, priceDataMap) {
  const rankings = assets
    .map((asset) => ({
      name: asset.name,
      symbol: asset.symbol,
      change: parseFloat(priceDataMap[asset.id]?.changePercent || 0),
      trend: calculateTrendStrength(priceDataMap[asset.id]?.changePercent || 0),
    }))
    .sort((a, b) => b.change - a.change);

  const leaders = rankings.slice(0, 3);
  const laggers = rankings.slice(-3).reverse();

  return {
    leaders: {
      title: '🏆 En Çok Kazananlar',
      assets: leaders,
    },
    laggers: {
      title: '📉 En Çok Kaybedenler',
      assets: laggers,
    },
    average:
      rankings.reduce((sum, a) => sum + a.change, 0) / rankings.length,
  };
}

/**
 * Trend Prediction (Basit MA-based)
 * Son trend'in devam edip etmeyeceğini tahmin et
 */
export function predictTrendContinuation(historicalChanges = []) {
  if (!historicalChanges || historicalChanges.length < 3) {
    return {
      prediction: 'Belirsiz',
      confidence: 0,
      reasoning: 'Veriler yetersiz',
    };
  }

  const recent = historicalChanges.slice(-3);
  const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
  const older = historicalChanges.slice(-10, -3);
  const avgOlder = older.reduce((a, b) => a + b, 0) / older.length;

  const momentum = avgRecent - avgOlder;
  const isConsistent = recent.every((val) => (val > 0 && avgRecent > 0) || (val < 0 && avgRecent < 0));

  let prediction = 'Nötr Devam';
  let confidence = 30;

  if (momentum > 0.5 && isConsistent) {
    prediction = 'Yükseliş Devam (Bullish Continuation)';
    confidence = 70;
  } else if (momentum < -0.5 && isConsistent) {
    prediction = 'Düşüş Devam (Bearish Continuation)';
    confidence = 70;
  } else if (momentum > 0) {
    prediction = 'Yükseliş Beklentisi';
    confidence = 50;
  } else if (momentum < 0) {
    prediction = 'Düşüş Beklentisi';
    confidence = 50;
  }

  return {
    prediction,
    confidence,
    momentum: momentum.toFixed(2),
    reasoning: isConsistent
      ? 'Trend tutarlı devam ediyor'
      : 'Trend tutarlılığında azalma gözleniyor',
  };
}

export default {
  calculateTrendStrength,
  analyzeVolatility,
  analyzeTrendMomentum,
  detectOverboughtOversold,
  calculateSupportResistance,
  generateCompleteTrendReport,
  compareAssetPerformance,
  predictTrendContinuation,
};
