import Link from 'next/link';
import Calculators from '@/app/components/Calculators';

export const metadata = {
  title: 'Bileşik Faiz ve Kredi Hesaplama - FinansRehberi',
  description: 'Bileşik faiz getirisi ve kredi taksit tutarı hesaplayın',
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-zinc-900 text-white px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools" className="text-sm text-zinc-300 hover:text-white">
            ← Araçlar
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Hızlı hesaplayıcılar</h1>
        <p className="text-gray-600 text-sm mb-6">Bileşik faiz ve eşit taksitli kredi simülasyonu</p>
        <Calculators />
      </div>
    </div>
  );
}
