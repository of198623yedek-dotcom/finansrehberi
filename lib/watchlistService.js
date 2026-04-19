/**
 * AŞAMA 6: Watchlist Service
 * 
 * CRUD operations for watchlists
 * - addToWatchlist()
 * - removeFromWatchlist()
 * - getWatchlist()
 * - updateWatchlist()
 * - setPriceAlert()
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl.includes('supabase')) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
} catch (err) {
  console.warn('⚠️ Supabase not configured');
}

// ============================================
// Add to Watchlist
// ============================================

export async function addToWatchlist(userId, asset) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // Check if already exists
    const { data: existing } = await supabaseClient
      .from('watchlists')
      .select('*')
      .eq('user_id', userId)
      .eq('asset_id', asset.id)
      .single();

    if (existing) {
      // Already exists, just mark as watched again
      await supabaseClient
        .from('watchlists')
        .update({ is_watched: true, removed_at: null })
        .eq('id', existing.id);

      return {
        success: true,
        message: `${asset.name} favorilerinize eklendi`,
        watchlist_id: existing.id,
      };
    }

    // Insert new
    const { data, error } = await supabaseClient
      .from('watchlists')
      .insert({
        user_id: userId,
        asset_id: asset.id,
        asset_name: asset.name,
        asset_symbol: asset.symbol,
        is_watched: true,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await logActivity(userId, 'added_to_watchlist', asset.id);

    return {
      success: true,
      message: `${asset.name} favorilerinize eklendi`,
      watchlist_id: data.id,
    };
  } catch (error) {
    console.error('Add to watchlist error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Remove from Watchlist
// ============================================

export async function removeFromWatchlist(userId, watchlistId) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabaseClient
      .from('watchlists')
      .select('asset_name, asset_id')
      .eq('id', watchlistId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    // Soft delete (mark as not watched)
    await supabaseClient
      .from('watchlists')
      .update({
        is_watched: false,
        removed_at: new Date(),
      })
      .eq('id', watchlistId);

    // Log activity
    await logActivity(userId, 'removed_from_watchlist', data.asset_id);

    return {
      success: true,
      message: `${data.asset_name} favorilerinizden çıkarıldı`,
    };
  } catch (error) {
    console.error('Remove from watchlist error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Get User's Watchlist
// ============================================

export async function getUserWatchlist(userId) {
  if (!supabaseClient) {
    return [];
  }

  try {
    const { data, error } = await supabaseClient
      .from('user_watchlist_with_prices')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Get watchlist error:', error);
    return [];
  }
}

// ============================================
// Check if Asset in Watchlist
// ============================================

export async function isInWatchlist(userId, assetId) {
  if (!supabaseClient) {
    return false;
  }

  try {
    const { data, error } = await supabaseClient
      .from('watchlists')
      .select('id')
      .eq('user_id', userId)
      .eq('asset_id', assetId)
      .eq('is_watched', true)
      .single();

    if (error) return false;

    return !!data;
  } catch (error) {
    return false;
  }
}

// ============================================
// Update Watchlist Item
// ============================================

export async function updateWatchlistItem(userId, watchlistId, updates) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabaseClient
      .from('watchlists')
      .update(updates)
      .eq('id', watchlistId)
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Update watchlist error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Set Price Alert
// ============================================

export async function setPriceAlert(userId, watchlistId, priceAlertValue, alertType) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabaseClient
      .from('watchlists')
      .update({
        price_alert_enabled: true,
        price_alert_value: priceAlertValue,
        alert_type: alertType, // "above" or "below"
      })
      .eq('id', watchlistId)
      .eq('user_id', userId);

    if (error) throw error;

    // Log activity
    const watchlist = await supabaseClient
      .from('watchlists')
      .select('asset_id')
      .eq('id', watchlistId)
      .single();

    await logActivity(userId, 'set_price_alert', watchlist.data?.asset_id, {
      price: priceAlertValue,
      type: alertType,
    });

    return {
      success: true,
      message: `Fiyat uyarısı ayarlandı: ${alertType} ${priceAlertValue}`,
    };
  } catch (error) {
    console.error('Set price alert error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Disable Price Alert
// ============================================

export async function disablePriceAlert(userId, watchlistId) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabaseClient
      .from('watchlists')
      .update({
        price_alert_enabled: false,
        price_alert_value: null,
      })
      .eq('id', watchlistId)
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true, message: 'Fiyat uyarısı devre dışı bırakıldı' };
  } catch (error) {
    console.error('Disable alert error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Add Note to Watchlist Item
// ============================================

export async function addNoteToWatchlist(userId, watchlistId, note) {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabaseClient
      .from('watchlists')
      .update({ user_notes: note })
      .eq('id', watchlistId)
      .eq('user_id', userId);

    if (error) throw error;

    return { success: true, message: 'Not eklendi' };
  } catch (error) {
    console.error('Add note error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Get Watchlist Stats
// ============================================

export async function getWatchlistStats(userId) {
  if (!supabaseClient) {
    return null;
  }

  try {
    const { data, error } = await supabaseClient
      .from('user_statistics')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Get stats error:', error);
    return null;
  }
}

// ============================================
// Export Watchlist to CSV
// ============================================

export async function exportWatchlistAsCSV(userId) {
  const watchlist = await getUserWatchlist(userId);

  if (!watchlist.length) {
    return null;
  }

  const headers = ['Asset', 'Symbol', 'Current Price', 'Change %', 'Added Date', 'Notes'];
  const rows = watchlist.map((item) => [
    item.asset_name,
    item.asset_symbol,
    item.current_price || 'N/A',
    item.change_percent || 'N/A',
    new Date(item.added_at).toLocaleDateString('tr-TR'),
    item.user_notes || '',
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

  return csv;
}

// ============================================
// Activity Logging
// ============================================

async function logActivity(userId, action, assetId = null, details = {}) {
  if (!supabaseClient) return;

  try {
    // Use service client for logging (bypasses RLS)
    const { createClient } = require('@supabase/supabase-js');
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    await serviceClient.from('user_activity_log').insert({
      user_id: userId,
      action,
      asset_id: assetId,
      details,
    });
  } catch (err) {
    console.error('Activity log error:', err);
  }
}

export default {
  addToWatchlist,
  removeFromWatchlist,
  getUserWatchlist,
  isInWatchlist,
  updateWatchlistItem,
  setPriceAlert,
  disablePriceAlert,
  addNoteToWatchlist,
  getWatchlistStats,
  exportWatchlistAsCSV,
};
