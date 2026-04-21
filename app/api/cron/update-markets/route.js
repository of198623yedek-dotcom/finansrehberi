/**
 * Cron Job: Update market data from APIs every 5 minutes
 * Endpoint: /api/cron/update-markets
 * 
 * This runs automatically via Vercel Cron:
 * - Every 5 minutes for fast-moving assets (crypto)
 */

import { NextResponse } from 'next/server';
import {
  upsertMarketData,
  logCronExecution,
  addFailedAssetToQueue,
} from '@/lib/supabaseDB';

import {
  getBistIndices,
  getExchangeRates,
  getMetalsPrices,
  getCryptoPrices,
} from '@/lib/turk-markets';

const ASSETS_TO_UPDATE = [
  { id: 'bist-indices', fetcher: getBistIndices, category: 'Endeks' },
  { id: 'forex', fetcher: getExchangeRates, category: 'Döviz' },
  { id: 'metals', fetcher: getMetalsPrices, category: 'Emtia' },
  { id: 'crypto', fetcher: getCryptoPrices, category: 'Kripto' },
];

export const maxDuration = 60; // Max 60 seconds for serverless function
export const dynamic = 'force-dynamic';

export async function GET(req) {
  // Security: Verify cron token or secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('🔄 Starting market data update cron job...');
  
  const startTime = Date.now();
  const results = {
    updated: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Update each asset category
    for (const asset of ASSETS_TO_UPDATE) {
      try {
        console.log(`📊 Updating ${asset.id}...`);

        const data = await asset.fetcher();

        if (!data) {
          results.failed++;
          results.errors.push(`${asset.id}: No data returned`);
          await addFailedAssetToQueue(asset.id, asset.id, 'No data returned');
          continue;
        }

        // Handle different data structures (array or object)
        const entries = Array.isArray(data) 
          ? data 
          : Object.entries(data).map(([key, val]) => ({
              id: key,
              ...val,
              category: asset.category,
            }));

        for (const entry of entries) {
          try {
            const success = await upsertMarketData(entry.id, {
              name: entry.name || entry.symbol,
              symbol: entry.symbol,
              category: asset.category,
              value: entry.value || entry.price_usd,
              price_usd: entry.price_usd || entry.value,
              change: entry.change || entry.change_24h,
              changePercent: entry.changePercent || entry.change_24h,
              market_cap: entry.market_cap,
              volume_24h: entry.volume_24h,
              high: entry.high,
              low: entry.low,
              source: 'api-sync',
            });

            if (success) {
              results.updated++;
            } else {
              results.failed++;
              await addFailedAssetToQueue(entry.id, entry.name || entry.symbol, 'Database write failed');
            }
          } catch (err) {
            results.failed++;
            results.errors.push(`${entry.id}: ${err.message}`);
          }
        }
      } catch (err) {
        results.failed++;
        results.errors.push(`${asset.id}: ${err.message}`);
        console.error(`❌ Error updating ${asset.id}:`, err);
      }
    }

    const duration = Date.now() - startTime;

    // Log execution to Supabase
    await logCronExecution('update-markets', 'success', {
      updated: results.updated,
      failed: results.failed,
      duration_ms: duration,
      errors: results.errors,
    });

    return NextResponse.json({
      success: true,
      message: 'Market data updated successfully',
      updated: results.updated,
      failed: results.failed,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('❌ Cron job failed:', err);

    await logCronExecution('update-markets', 'failed', {
      error: err.message,
    });

    return NextResponse.json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
