-- Price Alerts Table
CREATE TABLE IF NOT EXISTS price_alerts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  alert_type VARCHAR(20), -- 'price_increase', 'price_decrease', 'threshold'
  threshold_percent DECIMAL(10, 2), -- Örn: 5 (%5)
  current_price DECIMAL(20, 8),
  alert_price DECIMAL(20, 8),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_triggered_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, asset_id, alert_type)
);

-- Alert History (İstatistik amaçlı)
CREATE TABLE IF NOT EXISTS alert_triggers_log (
  id BIGSERIAL PRIMARY KEY,
  alert_id BIGINT REFERENCES price_alerts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  asset_name TEXT,
  old_price DECIMAL(20, 8),
  new_price DECIMAL(20, 8),
  percent_change DECIMAL(10, 2),
  notification_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification Preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  price_alerts_enabled BOOLEAN DEFAULT TRUE,
  email_alerts BOOLEAN DEFAULT FALSE,
  push_alerts BOOLEAN DEFAULT TRUE,
  one_signal_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_triggers_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own alerts"
  ON price_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts"
  ON price_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON price_alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts"
  ON price_alerts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notification preferences"
  ON notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification preferences"
  ON notification_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_price_alerts_user_asset ON price_alerts(user_id, asset_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(is_active, user_id);
CREATE INDEX idx_alert_triggers_alert_id ON alert_triggers_log(alert_id);
CREATE INDEX idx_notification_prefs_user ON notification_preferences(user_id);
