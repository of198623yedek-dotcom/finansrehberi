/**
 * API Route: /api/cron/check-price-alerts
 * Vercel Cron Job'u tarafından periyodik olarak çağrılır
 * 
 * Tüm varlıkların fiyatlarını kontrol eder ve
 * uyarı koşullarını sağlayan kullanıcılara bildirim gönderir
 */

import { checkAndTriggerAlerts } from '@/lib/priceAlertService';
import { sendNotificationToUser } from '@/lib/notificationService';
import { getAllMarketDataFromDB } from '@/lib/supabaseDB';

export const maxDuration = 60;

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  // Security check
  if (authHeader !== expectedAuth) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    console.log('🔔 Fiyat uyarıları kontrol ediliyor...');

    // Veritabanından tüm piyasa verilerini al
    const marketData = await getAllMarketDataFromDB();
    
    if (!marketData || marketData.length === 0) {
      console.warn('⚠️ Piyasa verisi bulunamadı');
      return new Response(JSON.stringify({ 
        message: 'Kontrol tamamlandı - veri yok',
        checked: 0,
        triggered: 0
      }));
    }

    let totalTriggered = 0;
    const assetMap = {};

    // Varlık haritası oluştur
    for (const item of marketData) {
      assetMap[item.asset_id] = item.price || 0;
    }

    // Her varlık için uyarıları kontrol et
    for (const [assetId, price] of Object.entries(assetMap)) {
      const triggeredAlerts = await checkAndTriggerAlerts(assetId, price);
      
      for (const alert of triggeredAlerts) {
        totalTriggered++;
        
        // Bildirim gönder
        const notificationMessage = `
🚨 Fiyat Uyarısı: ${alert.assetName}
Fiyat: $${alert.currentPrice.toFixed(2)}
Değişim: ${alert.percentChange}%
Önceki: $${alert.oldPrice.toFixed(2)}
        `.trim();

        try {
          await sendNotificationToUser(
            alert.userId,
            `${alert.assetName} Fiyat Uyarısı`,
            notificationMessage
          );
          
          console.log(`✅ Bildirim gönderildi: ${alert.assetName} ${alert.userId}`);
        } catch (notifErr) {
          console.error(`❌ Bildirim gönderme hatası: ${alert.userId}`, notifErr);
        }
      }
    }

    console.log(`✅ Uyarı kontrolü tamamlandı: ${totalTriggered} bildirim gönderildi`);

    return new Response(JSON.stringify({
      message: 'Kontrol tamamlandı',
      checkedAssets: Object.keys(assetMap).length,
      triggeredAlerts: totalTriggered,
      timestamp: new Date().toISOString(),
    }));

  } catch (error) {
    console.error('❌ Cron job hatası:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), { status: 500 });
  }
}
