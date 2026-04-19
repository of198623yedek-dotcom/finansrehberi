/**
 * AŞAMA 6: Supabase Authentication Service
 * 
 * Fonksiyonlar:
 * - signUp() - Yeni hesap oluştur
 * - signIn() - Giriş yap
 * - signOut() - Çık
 * - getCurrentUser() - Mevcut kullanıcıyı oku
 * - updateProfile() - Profili güncelle
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseClient = null;
let supabaseServiceClient = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl.includes('supabase')) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    supabaseServiceClient = createClient(supabaseUrl, supabaseServiceKey);
  }
} catch (err) {
  console.warn('⚠️ Supabase not configured:', err.message);
}

// ============================================
// Sign Up (Yeni Hesap Oluştur)
// ============================================

export async function signUp(email, password, fullName) {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    // 1. Supabase Auth'ta hesap oluştur
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Auth signup error:', authError);
      throw authError;
    }

    const userId = authData.user.id;

    // 2. User profile oluştur
    const { error: profileError } = await supabaseClient
      .from('user_profiles')
      .insert({
        id: userId,
        email,
        full_name: fullName,
        username: email.split('@')[0],
        created_at: new Date(),
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Auth başarılı ama profile başarısız - kısmi başarı
    }

    // 3. Activity log
    await logActivity(userId, 'signup', null, { email });

    return {
      success: true,
      user: authData.user,
      message: 'Hesap oluşturuldu! Lütfen emailinizi doğrulayın.',
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============================================
// Sign In (Giriş Yap)
// ============================================

export async function signIn(email, password) {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Auth signin error:', error);
      throw error;
    }

    const userId = data.user.id;

    // Update last login
    await supabaseClient
      .from('user_profiles')
      .update({ last_login: new Date() })
      .eq('id', userId);

    // Activity log
    await logActivity(userId, 'signin', null, {});

    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error('Signin error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============================================
// Sign Out (Çık)
// ============================================

export async function signOut() {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Signout error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Get Current User
// ============================================

export async function getCurrentUser() {
  if (!supabaseClient) {
    return null;
  }

  try {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) return null;

    // Get profile
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      ...user,
      profile,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

// ============================================
// Get Auth Session
// ============================================

export async function getAuthSession() {
  if (!supabaseClient) {
    return null;
  }

  try {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

// ============================================
// Update Profile
// ============================================

export async function updateProfile(userId, updates) {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date(),
      })
      .eq('id', userId);

    if (error) throw error;

    // Activity log
    await logActivity(userId, 'profile_update', null, updates);

    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Get User Profile
// ============================================

export async function getUserProfile(userId) {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    const { data, error } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

// ============================================
// Password Reset
// ============================================

export async function resetPassword(email) {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }

  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;

    return { success: true, message: 'Şifre sıfırlama emaili gönderildi.' };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// Activity Logging
// ============================================

export async function logActivity(userId, action, assetId = null, details = {}) {
  if (!supabaseClient) return;

  try {
    await supabaseClient.from('user_activity_log').insert({
      user_id: userId,
      action,
      asset_id: assetId,
      details,
    });
  } catch (err) {
    console.error('Activity log error:', err);
  }
}

// ============================================
// Auth State Listener
// ============================================

export function onAuthStateChange(callback) {
  if (!supabaseClient) return undefined;

  return supabaseClient.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

export default {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  getAuthSession,
  updateProfile,
  getUserProfile,
  resetPassword,
  logActivity,
  onAuthStateChange,
};
