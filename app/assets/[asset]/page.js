import React from 'react';
import { getAssetBySlug } from '@/lib/assets-data';
import AssetClient from './AssetClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AssetPage({ params }) {
  const assetSlug = params.asset;
  const assetMeta = getAssetBySlug(assetSlug);

  if (!assetMeta) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center p-10">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">VARLIK BULUNAMADI</h1>
            <p className="text-slate-500 mb-8 font-bold uppercase tracking-widest text-xs">Aradığınız {assetSlug} terminal kayıtlarında mevcut değil.</p>
            <Link href="/market" className="bg-blue-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">TERMİNAL'E DÖN</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return <AssetClient assetMeta={assetMeta} assetSlug={assetSlug} />;
}
