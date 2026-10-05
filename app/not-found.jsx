import Link from 'next/link';
import { ArrowIcon } from '../components/icons';

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-heading">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>This page is taking<br /><em>a coffee break.</em></h1>
      </section>
      <section className="page-body"><Link className="button" href="/">Home <ArrowIcon /></Link><p><Link className="link" href="/menu/">Explore the menu</Link></p><p><Link className="link" href="/locations/">Find a branch</Link></p></section>
    </main>
  );
}
