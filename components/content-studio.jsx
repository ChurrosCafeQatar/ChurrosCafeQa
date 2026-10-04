'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CHURROS_CAFE } from '../data/content';
import { ArrowIcon } from './icons';

const storageKey = 'churros-cafe-content-draft';
const fieldMap = {
  products: {
    displayName: 'Display name (English)', ar: 'Product name (Arabic)', description: 'Official menu description',
  },
  branches: {
    name: 'Branch concept name', ar: 'Branch name (Arabic)', subtitle: 'Short introduction', intro: 'Branch story',
  },
};

function valid(value) {
  return value && Array.isArray(value.products) && Array.isArray(value.branches) &&
    value.products.length > 0 && value.branches.length > 0 &&
    value.products.every(item => item && typeof item.id === 'string' && typeof item.displayName === 'string') &&
    value.branches.every(item => item && typeof item.id === 'string' && typeof item.name === 'string');
}

export default function ContentStudio() {
  const [data, setData] = useState(() => structuredClone(CHURROS_CAFE));
  const [collection, setCollection] = useState('products');
  const [entryId, setEntryId] = useState(CHURROS_CAFE.products[0].id);
  const [status, setStatus] = useState('Ready to customize.');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (valid(saved)) {
        setData(saved);
        setEntryId(saved.products[0].id);
      }
    } catch {}
  }, []);

  const entry = useMemo(() => data[collection].find(item => item.id === entryId) || data[collection][0], [data, collection, entryId]);
  const updateField = (name, value) => setData(current => ({ ...current, [collection]: current[collection].map(item => item.id === entry.id ? { ...item, [name]: value } : item) }));
  const switchCollection = value => { setCollection(value); setEntryId(data[value][0].id); };

  const save = event => {
    event.preventDefault();
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setStatus('Draft saved on this device. The public website has not changed.');
    } catch { setStatus('Browser storage is unavailable. Use Export to keep your draft.'); }
  };

  const exportDraft = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'churros-cafe-content-draft.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Draft exported. Your file is ready for the publishing workflow.');
  };

  const importDraft = async event => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 1000000) throw new Error('File too large');
      const value = JSON.parse(await file.text());
      if (!valid(value)) throw new Error('Invalid structure');
      setData(value); setCollection('products'); setEntryId(value.products[0].id);
      setStatus('Draft imported. Save on this device to keep it.');
    } catch { setStatus('Import failed. Choose a valid Churros Cafe draft JSON file under 1 MB.'); }
    finally { event.target.value = ''; }
  };

  const clear = () => {
    localStorage.removeItem(storageKey);
    const fresh = structuredClone(CHURROS_CAFE);
    setData(fresh); setCollection('products'); setEntryId(fresh.products[0].id);
    setStatus('Local draft cleared. Original template content restored in the editor.');
  };

  return (
    <>
      <header className="header"><Link className="logo brand-logo" href="/" aria-label="Churros Cafe home"><img className="brand-logo-image" src="/assets/churros_logo.webp" alt="Churros Cafe" width="181" height="130" /></Link><Link className="link" href="/">Back to the website <ArrowIcon /></Link></header>
      <main>
        <section className="page-heading"><p className="eyebrow">YOUR LITTLE CONTENT STUDIO</p><h1>Make it <em>your own.</em></h1><p>Edit menu and branch drafts, save on this device, and export a content file. This demo editor does not publish to the website or provide a secure production CMS.</p></section>
        <section className="page-body"><div className="info-grid">
          <div className="info-panel"><form id="editor" className="form-fields" onSubmit={save}>
            <label>Collection<select value={collection} onChange={event => switchCollection(event.target.value)}><option value="products">Menu products</option><option value="branches">Branch concepts</option></select></label>
            <label>Entry<select value={entry.id} onChange={event => setEntryId(event.target.value)}>{data[collection].map(item => <option value={item.id} key={item.id}>{item.displayName || item.name}</option>)}</select></label>
            <div className="form-fields">{Object.entries(fieldMap[collection]).map(([name, label]) => <label key={name}>{label}{name === 'intro' || name === 'description' ? <textarea name={name} value={entry[name] || ''} onChange={event => updateField(name, event.target.value)} maxLength="2000" required={name === 'name' || name === 'displayName'} /> : <input name={name} value={entry[name] || ''} onChange={event => updateField(name, event.target.value)} maxLength="2000" required={name === 'name' || name === 'displayName'} />}</label>)}</div>
            <button className="button" type="submit">Save draft on this device <ArrowIcon /></button>
          </form></div>
          <div className="info-panel"><p className="eyebrow">DRAFT WORKFLOW</p><h2>One place for<br />the little details.</h2><p>Save writes this collection to local browser storage. Export downloads the current draft as JSON. Import restores a previously exported draft. A developer can connect the same content model to an authenticated CMS for approval and publishing.</p><button className="button" id="export" onClick={exportDraft}>Export draft JSON <ArrowIcon /></button><label style={{ display: 'block', marginTop: 25 }}>Import a draft<input type="file" id="import" accept="application/json,.json" onChange={importDraft} style={{ display: 'block', marginTop: 10 }} /></label><button className="link" id="clear" onClick={clear} style={{ background: 'none', border: 0, marginTop: 25 }}>Clear saved draft</button><p role="status" className="status">{status}</p><p>Do not enter secrets or customer information here.</p></div>
        </div></section>
      </main>
    </>
  );
}
