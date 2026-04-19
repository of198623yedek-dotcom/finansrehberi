-- ============================================
-- AŞAMA 5: Error Handling & Stale Data Schema
-- ============================================

-- 1. market_data tablosuna yeni kolonlar ekle
ALTER TABLE market_data ADD COLUMN IF NOT EXISTS 
  last_successful_fetch_at TIMESTAMP WITH TIME ZONE,
  previous_value DECIMAL(20, 8),
  previous_change_percent DECIMAL(10, 4),
  data_quality_score INT DEFAULT 100,  -- 0-100: veri kalitesi
  is_stale BOOLEAN DEFAULT FALSE,
  stale_since TIMESTAMP WITH TIME ZONE;

-- 2. Data Quality Log tablosu (veri kalitesi takibi)
CREATE TABLE IF NOT EXISTS data_quality_log (
  id BIGSERIAL PRIMARY KEY,
  
  -- Asset Info
  asset_id TEXT NOT NULL,
  asset_name TEXT,
  
  -- Quality Metrics
  data_age_seconds INT,               -- Veriler kaç saniye eski?
  freshness_level TEXT,               -- "fresh", "stale", "very_stale"
  quality_score INT,                  -- 0-100
  confidence_level INT,               -- 0-100
  
  -- Issues
  has_error BOOLEAN DEFAULT FALSE,
  error_type TEXT,                    -- "api_timeout", "parse_error", etc
  error_message TEXT,
  
  -- Suggestions
  recommendation TEXT,                -- "Use stale data", "Retry", etc
  
  -- Metadata
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_quality_log_asset ON data_quality_log(asset_id);
CREATE INDEX idx_quality_log_logged_at ON data_quality_log(logged_at DESC);

-- 3. API Health Status tablosu
CREATE TABLE IF NOT EXISTS api_health_status (
  id BIGSERIAL PRIMARY KEY,
  
  -- API Info
  api_provider TEXT NOT NULL UNIQUE,  -- "finnhub", "coingecko"
  endpoint TEXT,
  
  -- Health Metrics
  last_successful_call TIMESTAMP WITH TIME ZONE,
  last_failed_call TIMESTAMP WITH TIME ZONE,
  consecutive_failures INT DEFAULT 0,
  
  -- Status
  is_healthy BOOLEAN DEFAULT TRUE,
  status_message TEXT,
  
  -- Rate Limits
  rate_limit_remaining INT,
  rate_limit_reset_at TIMESTAMP WITH TIME ZONE,
  is_rate_limited BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Fallback Strategy tablosu (stratejik kararlar)
CREATE TABLE IF NOT EXISTS fallback_strategy (
  id BIGSERIAL PRIMARY KEY,
  
  -- Configuration
  asset_id TEXT NOT NULL UNIQUE,
  
  -- Stale Data Policy
  max_stale_age_seconds INT DEFAULT 3600,  -- 1 saat
  use_stale_if_api_fails BOOLEAN DEFAULT TRUE,
  use_previous_value_if_no_stale BOOLEAN DEFAULT TRUE,
  
  -- Notification
  warn_if_older_than_minutes INT DEFAULT 10,
  show_warning_banner BOOLEAN DEFAULT TRUE,
  
  -- Retry Policy
  max_retries INT DEFAULT 3,
  retry_delay_ms INT DEFAULT 5000,
  exponential_backoff BOOLEAN DEFAULT TRUE,
  
  -- Mock Data Fallback
  use_mock_if_all_fail BOOLEAN DEFAULT TRUE,
  mock_data JSONB,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Error Recovery Queue
CREATE TABLE IF NOT EXISTS error_recovery_queue (
  id BIGSERIAL PRIMARY KEY,
  
  -- Error Info
  asset_id TEXT NOT NULL,
  error_type TEXT NOT NULL,           -- "timeout", "invalid_data", "rate_limit"
  error_message TEXT,
  
  -- Recovery Details
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  retry_count INT DEFAULT 0,
  max_retries INT DEFAULT 3,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  
  -- Last Known Good Data
  last_good_value DECIMAL(20, 8),
  last_good_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Status
  status TEXT DEFAULT 'pending',      -- "pending", "recovered", "failed"
  recovery_method TEXT,               -- "stale_data", "previous_value", "mock"
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_recovery_queue_asset ON error_recovery_queue(asset_id);
CREATE INDEX idx_recovery_queue_next_retry ON error_recovery_queue(next_retry_at);
CREATE INDEX idx_recovery_queue_status ON error_recovery_queue(status);

-- 6. Veri Geçmişi (Historical Data - rollback ve trend)
CREATE TABLE IF NOT EXISTS data_history (
  id BIGSERIAL PRIMARY KEY,
  
  -- Asset Info
  asset_id TEXT NOT NULL,
  
  -- Historical Data
  price_value DECIMAL(20, 8),
  change_percent DECIMAL(10, 4),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Source Info
  source TEXT,                        -- "cron", "api", "fallback"
  data_quality INT,
  
  -- Metadata
  is_valid BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_history_asset ON data_history(asset_id);
CREATE INDEX idx_history_recorded_at ON data_history(recorded_at DESC);
CREATE INDEX idx_history_asset_date ON data_history(asset_id, recorded_at DESC);

-- 7. Views

-- View: Asset health dashboard
CREATE VIEW IF NOT EXISTS asset_health_dashboard AS
SELECT 
  md.asset_id,
  md.asset_name,
  md.current_price,
  md.change_percent,
  md.last_updated_at,
  EXTRACT(EPOCH FROM (NOW() - md.last_updated_at))::INT as data_age_seconds,
  CASE 
    WHEN EXTRACT(EPOCH FROM (NOW() - md.last_updated_at)) < 300 THEN 'Fresh'
    WHEN EXTRACT(EPOCH FROM (NOW() - md.last_updated_at)) < 3600 THEN 'Stale'
    ELSE 'Very Stale'
  END as data_status,
  md.error_count,
  md.last_error,
  CASE 
    WHEN md.error_count = 0 THEN 100
    WHEN md.error_count = 1 THEN 80
    WHEN md.error_count = 2 THEN 60
    ELSE 40
  END as quality_score
FROM market_data md
ORDER BY md.last_updated_at DESC;

-- View: Recovery needed assets
CREATE VIEW IF NOT EXISTS assets_needing_recovery AS
SELECT DISTINCT
  asset_id,
  COUNT(*) as error_count,
  MAX(attempted_at) as last_error_time,
  status
FROM error_recovery_queue
WHERE status = 'pending' AND retry_count < max_retries
GROUP BY asset_id, status
ORDER BY last_error_time DESC;

-- View: API health summary
CREATE VIEW IF NOT EXISTS api_health_summary AS
SELECT 
  api_provider,
  is_healthy,
  consecutive_failures,
  is_rate_limited,
  EXTRACT(EPOCH FROM (NOW() - last_successful_call))::INT as seconds_since_last_success,
  status_message,
  checked_at
FROM api_health_status
ORDER BY checked_at DESC;
