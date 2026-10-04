import Link from 'next/link';
import { ArrowIcon } from '../components/icons';

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-heading">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>This page is taking<br /><em>a coffee break.</em></h1>
      </section>
      <section className="page-body"><Link className="button" href="/">Back to a little golden <ArrowIcon /></Link></section>
    </main>
  );
}
