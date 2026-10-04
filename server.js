const express = require('express');
const path = require('path');
const { CREOVO, translations } = require('./data/content');

const app = express();
const PORT = process.env.PORT || 4173;

// Configure EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));
app.use('/theme.css', express.static(path.join(__dirname, 'theme.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));
app.use('/content.js', express.static(path.join(__dirname, 'content.js')));
app.use('/robots.txt', express.static(path.join(__dirname, 'robots.txt')));

// Internationalization Middleware
app.use((req, res, next) => {
  const isArabic = req.path.startsWith('/ar');
  const langPrefix = isArabic ? '/ar' : '';

  res.locals.isArabic = isArabic;
  res.locals.langPrefix = langPrefix;
  res.locals.currentPath = req.path;
  res.locals.brand = CREOVO.brand;
  res.locals.products = CREOVO.products;
  res.locals.branches = CREOVO.branches;

  // Translation helper function
  res.locals.t = (text) => {
    if (!isArabic) return text;
    return translations[text] || text;
  };

  next();
});

// Helper for rendering routes dynamically
const renderPage = (viewName) => (req, res) => {
  res.render(viewName);
};

// Route definitions for both English and Arabic
const setupRoute = (routePath, viewName) => {
  app.get(routePath, renderPage(viewName));
  app.get(`/ar${routePath === '/' ? '' : routePath}`, renderPage(viewName));
};

// Application pages
setupRoute('/', 'home');
setupRoute('/menu/', 'menu');
setupRoute('/locations/', 'locations');
setupRoute('/about/', 'about');
setupRoute('/catering/', 'catering');
setupRoute('/contact/', 'contact');
setupRoute('/reservations/', 'reservations');
setupRoute('/offers/', 'offers');
setupRoute('/stories/', 'stories');
setupRoute('/privacy/', 'privacy');

// Branch detail page dynamic handler
const handleBranchDetail = (req, res) => {
  const { id } = req.params;
  const branch = CREOVO.branches.find((b) => b.id === id);

  if (!branch) {
    return res.status(404).render('404');
  }

  const otherBranches = CREOVO.branches.filter((b) => b.id !== id);
  res.render('location-detail', { branch, otherBranches });
};

app.get('/locations/:id/', handleBranchDetail);
app.get('/ar/locations/:id/', handleBranchDetail);

// API Endpoints for interactive forms
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  res.json({
    status: 'success',
    message: 'Demo inquiry previewed successfully.',
    data: { name, email, message }
  });
});

app.post('/api/catering', (req, res) => {
  const { name, email, occasion, guests, message } = req.body;
  res.json({
    status: 'success',
    message: 'Demo catering inquiry previewed successfully.',
    data: { name, email, occasion, guests, message }
  });
});

app.post('/api/reservations', (req, res) => {
  const { branch, date, guests } = req.body;
  res.json({
    status: 'success',
    message: 'Demo reservation previewed successfully.',
    data: { branch, date, guests }
  });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).render('404');
});

// Start Express server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`CreovoCafe Express SSR App running at: http://localhost:${PORT}`);
});
