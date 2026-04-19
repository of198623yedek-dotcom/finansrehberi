-- ============================================
-- Supabase SQL Schema for Market Data Caching
-- ============================================

-- 1. Market Data Table (Main Cache)
CREATE TABLE IF NOT EXISTS market_data (
  id BIGSERIAL PRIMARY KEY,
  
  -- Asset Identification
  asset_id TEXT NOT NULL UNIQUE,           -- "bitcoin", "altin", "usd_try"
  asset_name TEXT NOT NULL,                -- "Bitcoin", "Altın"
  asset_symbol TEXT NOT NULL,              -- "BTC", "XAU/USD"
  category TEXT NOT NULL,                  -- "Kripto", "Emtia", "Döviz"
  
  -- Price Data
  current_price DECIMAL(20, 8) NOT NULL,
  price_usd DECIMAL(20, 8),
  change_absolute DECIMAL(15, 8),
  change_percent DECIMAL(10, 4),
  
  -- Extended Data
  market_cap DECIMAL(20, 2),
  volume_24h DECIMAL(20, 2),
  high_24h DECIMAL(20, 8),
  low_24h DECIMAL(20, 8),
  
  -- Metadata
  last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_freshness_seconds INT DEFAULT 0,   -- Kaç saniye önce güncellenmiş?
  api_source TEXT,                         -- "finnhub", "coingecko", etc.
  error_count INT DEFAULT 0,               -- Consecutive error count
  last_error TEXT,                         -- Son hata mesajı
  
  -- Indexes
  CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_market_data_asset_id ON market_data(asset_id);
CREATE INDEX idx_market_data_category ON market_data(category);
CREATE INDEX idx_market_data_updated_at ON market_data(last_updated_at DESC);

-- ============================================
-- 2. Cron Job Execution Log
-- ============================================
CREATE TABLE IF NOT EXISTS cron_execution_log (
  id BIGSERIAL PRIMARY KEY,
  
  -- Job Info
  job_name TEXT NOT NULL,                  -- "update-markets", "update-bitcoin", etc.
  cron_expression TEXT,                    -- "0 */5 * * * *" (every 5 minutes)
  
  -- Execution Details
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_ms INT,                         -- How long did it take?
  
  -- Results
  status TEXT NOT NULL,                    -- "success", "partial", "failed"
  items_updated INT DEFAULT 0,             -- Kaç asset güncellendi?
  items_failed INT DEFAULT 0,              -- Kaç asset failed?
  error_message TEXT,
  details JSONB,                           -- Detailed execution logs
  
  -- Metadata
  triggered_by TEXT,                       -- "vercel-cron" or "manual"
  ip_address TEXT
);

CREATE INDEX idx_cron_log_job_name ON cron_execution_log(job_name);
CREATE INDEX idx_cron_log_executed_at ON cron_execution_log(executed_at DESC);
CREATE INDEX idx_cron_log_status ON cron_execution_log(status);

-- ============================================
-- 3. API Call Statistics (Rate Limit Tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS api_call_stats (
  id BIGSERIAL PRIMARY KEY,
  
  -- API Info
  api_provider TEXT NOT NULL,              -- "finnhub", "coingecko"
  endpoint TEXT NOT NULL,
  
  -- Statistics
  total_calls INT DEFAULT 0,
  calls_last_hour INT DEFAULT 0,
  calls_last_day INT DEFAULT 0,
  rate_limit_remaining INT,
  rate_limit_reset_at TIMESTAMP WITH TIME ZONE,
  
  -- Status
  is_rate_limited BOOLEAN DEFAULT FALSE,
  last_called_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_api_stats_provider ON api_call_stats(api_provider, endpoint);

-- ============================================
-- 4. Error Recovery Queue
-- ============================================
CREATE TABLE IF NOT EXISTS failed_assets_queue (
  id BIGSERIAL PRIMARY KEY,
  
  -- Failed Asset
  asset_id TEXT NOT NULL,
  asset_name TEXT,
  reason TEXT,
  
  -- Retry Info
  retry_count INT DEFAULT 0,
  max_retries INT DEFAULT 3,
  next_retry_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  first_failed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_attempted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_failed_assets_next_retry ON failed_assets_queue(next_retry_at);
CREATE INDEX idx_failed_assets_retry_count ON failed_assets_queue(retry_count);

-- ============================================
-- 5. Row Level Security (RLS) - Public Read Only
-- ============================================
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read market_data (public endpoint)
CREATE POLICY "market_data_public_read" ON market_data
  FOR SELECT USING (true);

-- Only service role can insert/update
CREATE POLICY "market_data_service_write" ON market_data
  FOR INSERT WITH CHECK (false);

CREATE POLICY "market_data_service_update" ON market_data
  FOR UPDATE USING (false);

-- ============================================
-- 6. Helper Views
-- ============================================

-- Latest market data for all assets
CREATE VIEW IF NOT EXISTS latest_market_data AS
SELECT
  asset_id,
  asset_name,
  asset_symbol,
  category,
  current_price,
  change_percent,
  last_updated_at,
  data_freshness_seconds,
  error_count,
  last_error
FROM market_data
ORDER BY last_updated_at DESC;

-- Assets that need update
CREATE VIEW IF NOT EXISTS assets_needing_update AS
SELECT
  asset_id,
  asset_name,
  last_updated_at,
  EXTRACT(EPOCH FROM (NOW() - last_updated_at))::INT as seconds_since_update,
  error_count
FROM market_data
WHERE 
  (EXTRACT(EPOCH FROM (NOW() - last_updated_at)) > 300)  -- Older than 5 minutes
  OR error_count > 0                                      -- Or has errors
ORDER BY last_updated_at ASC;

-- Cron job health status
CREATE VIEW IF NOT EXISTS cron_job_health AS
SELECT
  job_name,
  COUNT(*) as total_executions,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful_runs,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_runs,
  ROUND(SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100, 2) as success_rate,
  MAX(executed_at) as last_executed,
  AVG(duration_ms)::INT as avg_duration_ms
FROM cron_execution_log
GROUP BY job_name;
