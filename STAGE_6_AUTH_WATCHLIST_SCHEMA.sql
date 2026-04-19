-- ============================================
-- AŞAMA 6: Authentication & Watchlist Schema
-- ============================================

-- 1. User Profiles (Supabase Auth ile bağlantılı)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- User Info
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Preferences
  theme TEXT DEFAULT 'dark',                -- "dark" or "light"
  currency TEXT DEFAULT 'TRY',              -- Kullanıcının tercih ettiği para birimi
  notification_enabled BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);

-- 2. Watchlist (Takip Listesi)
CREATE TABLE IF NOT EXISTS watchlists (
  id BIGSERIAL PRIMARY KEY,
  
  -- User Reference
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Asset Reference
  asset_id TEXT NOT NULL,                  -- "bitcoin", "altin", etc
  asset_name TEXT NOT NULL,
  asset_symbol TEXT NOT NULL,
  
  -- Status
  is_watched BOOLEAN DEFAULT TRUE,
  
  -- Alerts
  price_alert_enabled BOOLEAN DEFAULT FALSE,
  price_alert_value DECIMAL(20, 8),       -- Hangi fiyatta alert gönder?
  alert_type TEXT,                         -- "above" or "below"
  
  -- Notes
  user_notes TEXT,
  tags JSONB DEFAULT '[]',                -- ["long-term", "short-term", etc]
  
  -- Metadata
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  removed_at TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, asset_id)
);

CREATE INDEX idx_watchlist_user_id ON watchlists(user_id);
CREATE INDEX idx_watchlist_is_watched ON watchlists(is_watched);
CREATE INDEX idx_watchlist_user_watched ON watchlists(user_id, is_watched);
CREATE INDEX idx_watchlist_added_at ON watchlists(added_at DESC);

-- 3. Watchlist Performance Tracking
CREATE TABLE IF NOT EXISTS watchlist_performance (
  id BIGSERIAL PRIMARY KEY,
  
  -- Reference
  watchlist_id BIGINT NOT NULL REFERENCES watchlists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  asset_id TEXT NOT NULL,
  
  -- Performance Data
  entry_price DECIMAL(20, 8),              -- Ne zaman aldı?
  entry_date TIMESTAMP WITH TIME ZONE,
  current_price DECIMAL(20, 8),
  profit_loss DECIMAL(20, 8),              -- Current - Entry
  profit_loss_percent DECIMAL(10, 4),
  
  -- Tracked At
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_perf_watchlist_id ON watchlist_performance(watchlist_id);
CREATE INDEX idx_perf_user_id ON watchlist_performance(user_id);
CREATE INDEX idx_perf_recorded_at ON watchlist_performance(recorded_at DESC);

-- 4. Price Alerts Log
CREATE TABLE IF NOT EXISTS price_alerts_log (
  id BIGSERIAL PRIMARY KEY,
  
  -- Reference
  watchlist_id BIGINT REFERENCES watchlists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  asset_id TEXT NOT NULL,
  
  -- Alert Info
  alert_type TEXT NOT NULL,                -- "price_above", "price_below"
  triggered_price DECIMAL(20, 8),
  target_price DECIMAL(20, 8),
  
  -- Status
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  notification_method TEXT,                -- "email", "in-app", "push"
  email_sent_to TEXT
);

CREATE INDEX idx_alerts_user_id ON price_alerts_log(user_id);
CREATE INDEX idx_alerts_sent_at ON price_alerts_log(sent_at DESC);
CREATE INDEX idx_alerts_read_at ON price_alerts_log(read_at);

-- 5. User Activity Log
CREATE TABLE IF NOT EXISTS user_activity_log (
  id BIGSERIAL PRIMARY KEY,
  
  -- User Reference
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Activity
  action TEXT NOT NULL,                    -- "added_watchlist", "removed_watchlist", etc
  asset_id TEXT,
  details JSONB,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_user_id ON user_activity_log(user_id);
CREATE INDEX idx_activity_created_at ON user_activity_log(created_at DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- user_profiles: Users can read their own, admins can read all
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_profiles_own_read" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "user_profiles_own_update" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "user_profiles_own_insert" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- watchlists: Users can only access their own
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "watchlist_own_read" ON watchlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "watchlist_own_insert" ON watchlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "watchlist_own_update" ON watchlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "watchlist_own_delete" ON watchlists
  FOR DELETE USING (auth.uid() = user_id);

-- watchlist_performance: Users can only access their own
ALTER TABLE watchlist_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "perf_own_read" ON watchlist_performance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "perf_own_insert" ON watchlist_performance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Views
-- ============================================

-- User's active watchlist with current price
CREATE VIEW IF NOT EXISTS user_watchlist_with_prices AS
SELECT 
  w.id as watchlist_id,
  w.user_id,
  w.asset_id,
  w.asset_name,
  w.asset_symbol,
  md.current_price,
  md.change_percent,
  w.user_notes,
  w.tags,
  w.added_at,
  w.price_alert_enabled,
  w.price_alert_value,
  w.alert_type
FROM watchlists w
LEFT JOIN market_data md ON w.asset_id = md.asset_id
WHERE w.is_watched = TRUE
ORDER BY w.added_at DESC;

-- User stats
CREATE VIEW IF NOT EXISTS user_statistics AS
SELECT 
  up.id,
  up.email,
  up.username,
  COUNT(DISTINCT w.id) as total_watchlist_items,
  COUNT(DISTINCT CASE WHEN w.is_watched = TRUE THEN w.id END) as active_watchlist_items,
  COUNT(DISTINCT pal.id) as total_alerts_received,
  COUNT(DISTINCT CASE WHEN pal.read_at IS NULL THEN pal.id END) as unread_alerts,
  COUNT(DISTINCT ual.id) as total_actions,
  MAX(up.last_login) as last_login
FROM user_profiles up
LEFT JOIN watchlists w ON up.id = w.user_id
LEFT JOIN price_alerts_log pal ON up.id = pal.user_id
LEFT JOIN user_activity_log ual ON up.id = ual.user_id
GROUP BY up.id, up.email, up.username;
