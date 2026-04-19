/**
 * Bildirim Servisi (Notification Service)
 * OneSignal üzerinden push bildirim yönetimi
 */

let OneSignal = null;

export async function initializeNotifications() {
  if (typeof window === 'undefined') return;
  
  if (!window.OneSignalDeferred) {
    console.warn('⚠️ OneSignal SDK yüklenmedi');
    return false;
  }

  try {
    window.OneSignalDeferred.push(function(OS) {
      OneSignal = OS;
      return OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '',
        allowLocalhostAsSecureOrigin: true,
      });
    });
    console.log('✅ OneSignal başlatıldı');
    return true;
  } catch (err) {
    console.error('❌ OneSignal initialization error:', err);
    return false;
  }
}

export async function requestNotificationPermission() {
  if (!OneSignal) {
    console.warn('⚠️ OneSignal tanımlanmamış');
    return false;
  }

  try {
    const permission = await OneSignal.Notifications.requestPermission(true);
    console.log('✅ Bildirim izni alındı:', permission);
    return permission;
  } catch (err) {
    console.error('❌ Bildirim izni hatası:', err);
    return false;
  }
}

export async function subscribeToUser(userId) {
  if (!OneSignal) return false;

  try {
    await OneSignal.login(userId);
    const subscription = await OneSignal.User.PushSubscription.optIn();
    console.log('✅ Kullanıcı subscribe edildi:', userId);
    return subscription;
  } catch (err) {
    console.error('❌ Subscribe hatası:', err);
    return false;
  }
}

export async function unsubscribeFromUser() {
  if (!OneSignal) return false;

  try {
    await OneSignal.User.PushSubscription.optOut();
    await OneSignal.logout();
    console.log('✅ Kullanıcı unsubscribe edildi');
    return true;
  } catch (err) {
    console.error('❌ Unsubscribe hatası:', err);
    return false;
  }
}

export async function sendNotification(title, message, options = {}) {
  if (!OneSignal) {
    console.warn('⚠️ OneSignal tanımlanmamış');
    return false;
  }

  try {
    await OneSignal.Notifications.sendNotification({
      title: title,
      body: message,
      ...options,
    });
    console.log('✅ Bildirim gönderildi:', title);
    return true;
  } catch (err) {
    console.error('❌ Bildirim gönderme hatası:', err);
    return false;
  }
}

export function getNotificationPermissionStatus() {
  if (!OneSignal) return 'unknown';
  
  try {
    return OneSignal.Notifications.permission;
  } catch (err) {
    console.error('❌ İzin durumu alınamadı:', err);
    return 'unknown';
  }
}

export async function sendNotificationToUser(userId, title, message) {
  // Note: Bu fonksiyon backend'den çağrılır
  // OneSignal REST API ile kullanıcıya doğrudan bildirim gönder
  // Detay: https://documentation.onesignal.com/reference/send-notification
  
  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        filters: [
          { field: 'tag', key: 'user_id', value: userId },
        ],
        headings: { en: title },
        contents: { en: message },
      }),
    });

    if (!response.ok) {
      throw new Error(`OneSignal API error: ${response.statusText}`);
    }

    console.log('✅ OneSignal bildirim gönderildi');
    return true;
  } catch (err) {
    console.error('❌ OneSignal REST API hatası:', err);
    return false;
  }
}

export default {
  initializeNotifications,
  requestNotificationPermission,
  subscribeToUser,
  unsubscribeFromUser,
  sendNotification,
  sendNotificationToUser,
  getNotificationPermissionStatus,
};
