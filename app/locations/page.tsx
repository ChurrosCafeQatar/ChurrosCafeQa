import Link from 'next/link';
import { CHURROS_CAFE } from '../../data/content';
import SiteImage from '../../components/site-image';
import { SparkIcon, ArrowIcon } from '../../components/icons';
import SchemaMarkup from '../../components/SchemaMarkup';

export const metadata = {
  title: 'Churros Cafe Locations in Qatar',
  description: 'Find Churros Cafe locations across Qatar, including branch addresses, opening hours, directions and catering contact details.',
  alternates: {
    canonical: '/locations/',
    languages: {
      en: '/locations/',
      ar: '/ar/locations/',
      'x-default': '/locations/'
    }
  }
};

export default function LocationsPage() {
  // We use the verified CHURROS_CAFE.branches array.
  return (
    <>
      <SchemaMarkup type="locations" branches={CHURROS_CAFE.branches} lang="en" />
      <main id="main" className="locations-page">
      <div className="page-heading">
        <p className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> CHURROS CAFE BRANCHES</p>
        <h1>Churros Cafe<br/><em>Locations in Qatar</em></h1>
        <p className="lead">Find Churros Cafe locations across Qatar, including branch addresses, opening hours, directions and catering contact details.</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/menu/" className="button">Explore the Menu <ArrowIcon /></Link>
        </div>
      </div>

      <div className="page-body">
        <div className="locations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', padding: '2rem 0' }}>
          {CHURROS_CAFE.branches.map((branch: any) => (
            <article key={branch.id} className="location-card" style={{ background: 'var(--brand-card-bg, #fff)', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              {branch.image && (
                <div className="location-photo">
                  <SiteImage src={`/assets/${branch.image}`} width={800} height={600} alt={`Churros Cafe ${branch.name}`} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                </div>
              )}
              
              <div className="location-details" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Churros Cafe — {branch.name}</h2>
                <address style={{ fontStyle: 'normal', color: 'var(--brand-text-muted, #666)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {branch.locationLabel}
                </address>
                
                {/* We don't have hardcoded openingHours string natively, but we can check if it exists in the future */}
                {branch.openingHours && (
                  <p className="opening-hours" style={{ marginBottom: '1.5rem' }}>
                    <strong>Hours:</strong> {branch.openingHours}
                  </p>
                )}

                <div className="location-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  {branch.mapUrl && (
                    <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="button" style={{ textAlign: 'center' }}>
                      Get Directions <ArrowIcon />
                    </a>
                  )}
                  {branch.phone && (
                    <a href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Churros Cafe, I\'m interested in catering for an event.')}`} target="_blank" rel="noopener noreferrer" className="button light" style={{ textAlign: 'center' }}>
                      Catering via WhatsApp <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
