import fs from 'fs';
let code = fs.readFileSync('app/locations/page.tsx', 'utf-8');

const oldHero = `<section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> CHURROS CAFE BRANCHES</div>
          <h1>Churros Cafe<br/><em>Locations in Qatar</em></h1>
          <p className="lead">Find Churros Cafe locations across Qatar, including branch addresses, opening hours, directions and catering contact details.</p>
          <div className="hero-actions">
            <Link href="/menu/" className="button">Explore the Menu <ArrowIcon /></Link>
          </div>
        </div>
      </section>`;

const newHeading = `<div className="page-heading">
        <p className="eyebrow"><span className="tiny-sun"><SparkIcon /></span> CHURROS CAFE BRANCHES</p>
        <h1>Churros Cafe<br/><em>Locations in Qatar</em></h1>
        <p className="lead">Find Churros Cafe locations across Qatar, including branch addresses, opening hours, directions and catering contact details.</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/menu/" className="button">Explore the Menu <ArrowIcon /></Link>
        </div>
      </div>`;

code = code.replace(oldHero, newHeading);

fs.writeFileSync('app/locations/page.tsx', code);
