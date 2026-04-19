'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { createPriceAlert, getUserAlerts, deletePriceAlert } from '@/lib/priceAlertService';

export function PriceAlertManager({ assetId, assetName, currentPrice }) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [threshold, setThreshold] = useState('5');
  const [alertType, setAlertType] = useState('threshold');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    const loadAlerts = async () => {
      const userAlerts = await getUserAlerts(user.id);
      const assetAlerts = userAlerts.filter(a => a.asset_id === assetId);
      setAlerts(assetAlerts);
      setLoading(false);
    };

    loadAlerts();
  }, [user?.id, assetId]);

  const handleCreateAlert = async () => {
    if (!user?.id) {
      setMessage('❌ Lütfen giriş yap');
      return;
    }

    setCreating(true);
    const result = await createPriceAlert(
      user.id,
      assetId,
      assetName,
      alertType,
      parseFloat(threshold),
      currentPrice
    );
    setCreating(false);

    if (result.success) {
      setAlerts([...alerts, result.data]);
      setMessage('✅ Uyarı oluşturuldu');
      setThreshold('5');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  const handleDeleteAlert = async (alertId) => {
    if (!user?.id) return;

    const result = await deletePriceAlert(alertId, user.id);
    if (result.success) {
      setAlerts(alerts.filter(a => a.id !== alertId));
      setMessage('✅ Uyarı silindi');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!user) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        ℹ️ Fiyat uyarıları kullanmak için lütfen giriş yap.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-black mb-6">Fiyat Uyarıları - {assetName}</h3>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${message.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Create Alert Form */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <p className="text-sm text-gray-600 mb-4">Şu anki fiyat: <strong>${currentPrice.toFixed(2)}</strong></p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Uyarı Türü</label>
            <select 
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="threshold">%Değişim (Artış veya Azalış)</option>
              <option value="price_increase">Yalnız %Artış</option>
              <option value="price_decrease">Yalnız %Azalış</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eşik Yüzdesi (%)</label>
            <input 
              type="number" 
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              min="0.1"
              step="0.1"
              placeholder="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {alertType === 'threshold' && `Fiyat %${threshold} oranında değiştiğinde bildirileceksin`}
              {alertType === 'price_increase' && `Fiyat %${threshold} oranında yükseldiğinde bildirileceksin`}
              {alertType === 'price_decrease' && `Fiyat %${threshold} oranında düştüğünde bildirileceksin`}
            </p>
          </div>

          <button 
            onClick={handleCreateAlert}
            disabled={creating}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition text-sm"
          >
            {creating ? '⏳ Oluşturuluyor...' : '➕ Uyarı Oluştur'}
          </button>
        </div>
      </div>

      {/* Active Alerts List */}
      <div>
        <h4 className="font-medium text-black mb-3 text-sm">Aktif Uyarılar</h4>
        
        {loading ? (
          <div className="text-center py-4 text-gray-500 text-sm">⏳ Yükleniyor...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">Henüz uyarı yok</div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    {alert.alert_type === 'price_increase' ? '📈' : alert.alert_type === 'price_decrease' ? '📉' : '⚖️'}{' '}
                    {alert.threshold_percent}% {alert.alert_type === 'threshold' ? 'Değişim' : alert.alert_type === 'price_increase' ? 'Artış' : 'Azalış'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {alert.alert_type === 'threshold' && `Hedef fiyat: $${(alert.alert_price).toFixed(2)}`}
                    {alert.alert_type !== 'threshold' && `Başlangıç: $${alert.current_price?.toFixed(2) || 'N/A'}`}
                  </p>
                </div>
                <button 
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium ml-4"
                >
                  ✕ Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900">
        ⚠️ <strong>Önemli:</strong> Uyarıların çalışabilmesi için push bildirim izinlerine izin vermelisin.
      </div>
    </div>
  );
}

export default PriceAlertManager;
