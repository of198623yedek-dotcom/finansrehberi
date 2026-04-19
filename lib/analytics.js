// Google Analytics tracking helper
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
};

// Özel event'ler
export const trackAffiliateClick = (broker, source = 'unknown') => {
  trackEvent('affiliate_click', {
    broker,
    source,
    page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
  });
};

export const trackCalculatorUsed = (calculatorType) => {
  trackEvent('calculator_used', {
    calculator: calculatorType,
    page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
  });
};

export const trackArticleViewed = (articleId, articleTitle) => {
  trackEvent('article_viewed', {
    article_id: articleId,
    article_title: articleTitle,
  });
};

export const trackStockViewed = (symbol) => {
  trackEvent('stock_viewed', {
    symbol,
  });
};
