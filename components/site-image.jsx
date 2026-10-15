import manifest from '../data/image-manifest.json';

// Static exports cannot use the runtime Next image optimizer. Build-time WebP
// variants preserve original assets and are selected natively by the browser.
export default function SiteImage({ src, alt = '', lang = undefined, width = 800, height = 800, sizes = undefined, priority = false, preload = false, loading = undefined, fetchPriority = undefined, ...props }) {
  const asset = manifest[src];
  const critical = priority || preload || fetchPriority === 'high';
  const responsiveSizes = sizes || (src.includes('churros_logo') ? '(max-width: 760px) 122px, 181px'
    : src.includes('/menu/') ? '(max-width: 760px) calc((100vw - 83px) / 2), (max-width: 1100px) 28vw, 350px'
    : src.includes('campaign-seaside-churros') ? '100vw'
    : '(max-width: 760px) 100vw, 50vw');
  const fallback = asset?.variants.find(v => v.width >= 640) || asset?.variants.at(-1);
  const arabicAlt = {
    '/assets/campaign-dessert-spread.png': 'حلويات تشوروز كافيه مع الشوكولاتة والفستق والفراولة والموز',
    '/assets/campaign-churros-moment.png': 'تناول التشوروز مع صلصات التغميس',
    '/assets/campaign-coffee-splash.png': 'قهوة تشوروز كافيه المثلجة مع مكعبات الثلج',
    '/assets/campaign-seaside-churros.png': 'صب الشوكولاتة على التشوروز بجانب البحر',
    '/assets/campaign-coffee-treats.png': 'لاتيه تشوروز كافيه مع حلويات مغلفة',
  };
  return <img {...props} src={fallback?.src || src} alt={lang === 'ar' && alt ? arabicAlt[src] || alt : alt}
    width={asset?.width || width} height={asset?.height || height}
    srcSet={asset?.variants.map(v => `${v.src} ${v.width}w`).join(', ')}
    sizes={asset ? responsiveSizes : undefined}
    loading={critical ? 'eager' : loading || 'lazy'}
    fetchPriority={critical ? 'high' : fetchPriority} decoding={props.decoding || 'async'} />;
}
