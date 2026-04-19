/**
 * Fiyat Uyarı Servisi (Price Alert Service)
 * Kullanıcıların fiyat uyarılarını yönet
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase = null;
let supabaseConfigured = false;

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    supabaseConfigured = true;
  }
} catch (err) {
  console.warn('⚠️ Supabase initialization skipped:', err.message);
}

// Uyarı oluştur
export async function createPriceAlert(userId, assetId, assetName, alertType, thresholdPercent, currentPrice) {
  if (!supabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase.from('price_alerts').insert({
      user_id: userId,
      asset_id: assetId,
      asset_name: assetName,
      alert_type: alertType, // 'price_increase', 'price_decrease', 'threshold'
      threshold_percent: thresholdPercent,
      current_price: currentPrice,
      alert_price: currentPrice * (1 + (thresholdPercent / 100)),
      is_active: true,
    }).select().single();

    if (error) throw error;
    console.log('✅ Fiyat uyarısı oluşturuldu:', assetId);
    return { success: true, data };
  } catch (err) {
    console.error('❌ Uyarı oluşturma hatası:', err.message);
    return { success: false, error: err.message };
  }
}

// Kullanıcının tüm uyarılarını getir
export async function getUserAlerts(userId) {
  if (!supabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('❌ Uyarılar getirilemedi:', err.message);
    return [];
  }
}

// Uyarı sil
export async function deletePriceAlert(alertId, userId) {
  if (!supabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase
      .from('price_alerts')
      .delete()
      .eq('id', alertId)
      .eq('user_id', userId);

    if (error) throw error;
    console.log('✅ Uyarı silindi');
    return { success: true };
  } catch (err) {
    console.error('❌ Uyarı silme hatası:', err.message);
    return { success: false, error: err.message };
  }
}

// Uyarı tetikle (Cron job tarafından çağrılır)
export async function checkAndTriggerAlerts(assetId, currentPrice) {
  if (!supabaseConfigured || !supabase) {
    console.warn('⚠️ Supabase not configured');
    return [];
  }

  try {
    // Aktif olan uyarıları getir
    const { data: alerts, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('asset_id', assetId)
      .eq('is_active', true);

    if (error) throw error;

    const triggeredAlerts = [];

    for (const alert of alerts || []) {
      let shouldTrigger = false;
      const oldPrice = alert.current_price;
      const percentChange = ((currentPrice - oldPrice) / oldPrice) * 100;

      if (alert.alert_type === 'price_increase' && percentChange >= alert.threshold_percent) {
        shouldTrigger = true;
      } else if (alert.alert_type === 'price_decrease' && percentChange <= -alert.threshold_percent) {
        shouldTrigger = true;
      } else if (alert.alert_type === 'threshold' && Math.abs(percentChange) >= alert.threshold_percent) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        // Log'a ekle
        await supabase.from('alert_triggers_log').insert({
          alert_id: alert.id,
          user_id: alert.user_id,
          asset_name: alert.asset_name,
          old_price: oldPrice,
          new_price: currentPrice,
          percent_change: percentChange,
          notification_sent: false,
        });

        // Uyarı fiyatını güncelle (bir sonraki tetikleme için)
        await supabase.from('price_alerts').update({
          current_price: currentPrice,
          last_triggered_at: new Date().toISOString(),
        }).eq('id', alert.id);

        triggeredAlerts.push({
          alertId: alert.id,
          userId: alert.user_id,
          assetName: alert.asset_name,
          oldPrice,
          currentPrice,
          percentChange: percentChange.toFixed(2),
        });
      }
    }

    return triggeredAlerts;
  } catch (err) {
    console.error('❌ Uyarı kontrol hatası:', err.message);
    return [];
  }
}

// Bildirim tercihlerini getir
export async function getNotificationPreferences(userId) {
  if (!supabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (err) {
    console.error('❌ Bildirim tercihleri getirilemedi:', err.message);
    return null;
  }
}

// Bildirim tercihlerini güncelle
export async function updateNotificationPreferences(userId, preferences) {
  if (!supabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Bildirim tercihleri güncellendi');
    return { success: true, data };
  } catch (err) {
    console.error('❌ Tercih güncelleme hatası:', err.message);
    return { success: false, error: err.message };
  }
}

export default {
  createPriceAlert,
  getUserAlerts,
  deletePriceAlert,
  checkAndTriggerAlerts,
  getNotificationPreferences,
  updateNotificationPreferences,
};
