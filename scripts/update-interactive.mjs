import fs from 'fs';
let code = fs.readFileSync('components/cafe-interactive.tsx', 'utf-8');

const newDialog = `
export function SiteDialog({ lang, t }) {
  const [modal, setModal] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handler = (e) => setModal(e.detail);
    window.addEventListener('churros:modal', handler);
    return () => window.removeEventListener('churros:modal', handler);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modal && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!modal && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const close = () => {
    dialogRef.current?.close();
    document.body.style.overflow = '';
    setModal(null);
  };

  if (!modal) return <dialog ref={dialogRef} className="site-dialog" aria-hidden="true"></dialog>;

  if (modal.type === 'product') {
    const product = CHURROS_CAFE.products.find(p => p.id === modal.id);
    if (!product) return <dialog ref={dialogRef} className="site-dialog" onClick={close}></dialog>;
    return (
      <dialog ref={dialogRef} className="site-dialog" onClick={e => e.target === dialogRef.current && close()}>
        <button className="close-dialog" onClick={close} aria-label={t('Close')}><CloseIcon /></button>
        <SiteImage src={\`/assets/\${product.image}\`} width={800} height={800} loading="lazy" alt={lang === 'ar' ? product.ar : product.displayName} />
        <Rich as="h2">{lang === 'ar' ? product.ar : product.displayName}</Rich>
        {product.description && <Rich as="p">{lang === 'ar' && product.description_ar ? product.description_ar : product.description}</Rich>}
        {(product.dietaryFlags?.length > 0 || product.allergens?.length > 0) && (
          <p className="menu-bottom" style={{ marginTop: '15px' }}>
            {product.allergens?.length > 0 && <span>{t('Contains:')} {product.allergens.join(', ')}</span>}
            {product.dietaryFlags?.length > 0 && <span>{product.dietaryFlags.join(', ')}</span>}
          </p>
        )}
      </dialog>
    );
  }
  return <dialog ref={dialogRef} className="site-dialog" onClick={close}></dialog>;
}
`;

code = code.replace(/export function SiteDialog[\s\S]*?return <dialog ref=\{dialogRef\} className="site-dialog" onClick=\{close\}><\/dialog>;\n\}/, newDialog);

// And update ProductCard to dispatch event
code = code.replace(/onClick=\{openProduct ? \(\) => openProduct\(product\.id\) : undefined\}/g, 
  "onClick={() => window.dispatchEvent(new CustomEvent('churros:modal', { detail: { type: 'product', id: product.id } }))}");

fs.writeFileSync('components/cafe-interactive.tsx', code);
