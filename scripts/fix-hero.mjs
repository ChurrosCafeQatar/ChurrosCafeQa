import fs from 'fs';
let code = fs.readFileSync('app/menu/page.tsx', 'utf-8');

const oldHero = `<section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> THE CHURROS CAFE MENU</div>
          <h1>Churros Cafe<br/><em>Menu.</em></h1>
          <p className="lead">Explore Churros Cafe&apos;s menu of freshly prepared churros, shareable boxes, sweet bites and refreshing drinks across our Qatar locations.</p>
          <div className="hero-actions">
            <Link href="/locations/" className="button">Find nearest cafAc <ArrowIcon /></Link>
          </div>
        </div>
      </section>`;

const newHeading = `<div className="page-heading">
        <p className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> THE CHURROS CAFE MENU</p>
        <h1>Churros Cafe<br/><em>Menu.</em></h1>
        <p className="lead">Explore Churros Cafe's menu of freshly prepared churros, shareable boxes, sweet bites and refreshing drinks across our Qatar locations.</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/locations/" className="button">Find nearest cafAc <ArrowIcon /></Link>
        </div>
      </div>`;

code = code.replace(oldHero, newHeading);

fs.writeFileSync('app/menu/page.tsx', code);
