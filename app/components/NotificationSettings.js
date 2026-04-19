'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getNotificationPreferences, updateNotificationPreferences } from '@/lib/priceAlertService';
import { requestNotificationPermission } from '@/lib/notificationService';

export function NotificationSettings() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({
    notifications_enabled: true,
    price_alerts_enabled: true,
    email_alerts: false,
    push_alerts: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const loadPrefs = async () => {
      const result = await getNotificationPreferences(user.id);
      if (result) {
        setPrefs(result);
      }
      setLoading(false);
    };

    loadPrefs();
  }, [user?.id]);

  const handleToggle = async (key) => {
    const newValue = !prefs[key];
    
    if (key === 'push_alerts' && newValue) {
      const permission = await requestNotificationPermission();
      if (!permission) {
        setMessage('❌ Bildirim izni reddedildi');
        setTimeout(() => setMessage(''), 3000);
        return;
      }
    }

    const newPrefs = { ...prefs, [key]: newValue };
    setPrefs(newPrefs);
    
    setSaving(true);
    const result = await updateNotificationPreferences(user.id, newPrefs);
    setSaving(false);
    
    if (result.success) {
      setMessage('✅ Ayarlar kaydedildi');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Kaydetme hatası');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">⏳ Yükleniyor...</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-black mb-6">Bildirim Ayarları</h3>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${message.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* Notifications Enabled */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <p className="font-medium text-black">Tüm Bildirimleri Aç</p>
            <p className="text-sm text-gray-600">Tüm bildirim türlerini kontrol et</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={prefs.notifications_enabled}
              onChange={() => handleToggle('notifications_enabled')}
              disabled={saving}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Price Alerts */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <p className="font-medium text-black">Fiyat Uyarıları</p>
            <p className="text-sm text-gray-600">Belirlediğin fiyat seviyelerine ulaşınca bildir</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={prefs.price_alerts_enabled}
              onChange={() => handleToggle('price_alerts_enabled')}
              disabled={saving || !prefs.notifications_enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Push Alerts */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div>
            <p className="font-medium text-black">Tarayıcı Bildirimleri</p>
            <p className="text-sm text-gray-600">Push bildirimler ile anlık haberdar ol</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={prefs.push_alerts}
              onChange={() => handleToggle('push_alerts')}
              disabled={saving || !prefs.notifications_enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Email Alerts */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-black">E-posta Uyarıları</p>
            <p className="text-sm text-gray-600">E-posta ile özet bilgi al</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={prefs.email_alerts}
              onChange={() => handleToggle('email_alerts')}
              disabled={saving || !prefs.notifications_enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
        ℹ️ <strong>Bilgi:</strong> Fiyat uyarılarınız çalışması için push bildirimlerinin açık olması gerekir.
      </div>
    </div>
  );
}

export default NotificationSettings;
