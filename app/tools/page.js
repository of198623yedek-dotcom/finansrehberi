import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Profesyonel Araçlar - FinansRehberi',
  description: 'Kar, lot, faiz, tavan serisi hesaplamak için profesyonel araçlar',
};

const ToolsPage = () => {
  const tools = [
    {
      id: 'ceiling',
      icon: '🎯',
      title: 'Tavan Serisi Hesaplama',
      description: '%10 tavan artışlarıyla kazanç hesapla',
      href: '/tools/ceiling',
      features: ['Tavan Hesaplama', 'Kar Analizi', 'Detaylı Rapor'],
    },
    {
      id: 'faiz',
      icon: '💹',
      title: 'Faiz Hesaplama',
      description: 'Basit ve bileşik faiz hesapla',
      href: '/tools/faiz',
      features: ['Basit Faiz', 'Bileşik Faiz', 'Yıllık Getiri'],
    },
    {
      id: 'profit',
      icon: '💰',
      title: 'Kar Hesaplama',
      description: 'Giriş-çıkış fiyatından kazanç hesapla',
      href: '/tools/profit',
      features: ['Kazanç/Kayıp', 'Yüzde Hesabı', 'Detaylı Analiz'],
    },
    {
      id: 'lot',
      icon: '📊',
      title: 'Lot Hesaplama',
      description: 'Risk yönetimi için lot miktarı hesapla',
      href: '/tools/lot',
      features: ['Lot Analizi', 'Risk Yönetimi', 'Ticaret Önerisi'],
    },
    {
      id: 'compound',
      icon: '📈',
      title: 'Bileşik Faiz',
      description: 'Yatırım getirisini detaylıca hesapla',
      href: '/tools/compound',
      features: ['Yapılandırılan Getiri', 'Zaman Analizi', 'Proje Raporları'],
    },
  ];

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: '"Segoe UI", system-ui, sans-serif'}}>
      {/* HEADER */}
      <div style={{backgroundColor: '#2a2a2a', padding: '15px 20px'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <Link href="/" style={{color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold'}}>← Ana Sayfa</Link>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div style={{backgroundColor: '#f9f9f9', padding: '40px 20px', borderBottom: '1px solid #eee'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000', margin: 0}}>Profesyonel Araçlar</h1>
          <p style={{color: '#666', fontSize: '16px', margin: '10px 0 0 0'}}>Hisse senedi, döviz ve kripto işlemleri için gereken hesap makineleri ve analizler</p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px'}}>
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} style={{textDecoration: 'none'}}>
              <div
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '30px',
                  borderRadius: '8px',
                  border: '2px solid #eee',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#eee';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{fontSize: '48px', marginBottom: '15px'}}>{tool.icon}</div>
                <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#000', margin: '0 0 10px 0'}}>{tool.title}</h2>
                <p style={{color: '#666', fontSize: '14px', margin: '0 0 15px 0', lineHeight: '1.5'}}>{tool.description}</p>

                {/* FEATURES */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px'}}>
                  {tool.features.map((feature, idx) => (
                    <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666'}}>
                      <span style={{color: '#22c55e', fontWeight: 'bold'}}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee'}}>
                  <span style={{color: '#000', fontWeight: 'bold', fontSize: '14px'}}>Aç →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div style={{backgroundColor: '#f0f0f0', padding: '40px 20px', marginTop: '60px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '20px'}}>💡 Araçlar Hakkında</h2>
          <p style={{color: '#666', fontSize: '15px', lineHeight: '1.8', marginBottom: '15px'}}>
            FinansRehberi&apos;nin profesyonel araçları, borsa yatırımcılarından kripto yatırımcılarına kadar herkes için tasarlanmıştır. 
            Her araç, gerçek piyasa koşullarında test edilmiş ve optimize edilmiştir.
          </p>
          <p style={{color: '#666', fontSize: '15px', lineHeight: '1.8'}}>
            Kar hesaplama, lot yönetimi, faiz analizi ve tavan serisi gibi önemli hesaplamaları 
            kolaylıkla yapabilir ve yatırım stratejilerinizi iyileştirebilirsiniz.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{backgroundColor: '#2a2a2a', color: '#fff', padding: '30px 20px', textAlign: 'center', marginTop: '60px'}}>
        <p style={{margin: 0, fontSize: '13px'}}>© 2026 FinansRehberi - Profesyonel Finans Rehberi</p>
      </footer>
    </div>
  );
};

export default ToolsPage;
