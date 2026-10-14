import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// Simple static file server for dist/
function startServer(port = 4173) {
  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    let filePath = path.join(process.cwd(), 'dist', reqUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'dist', 'index.html');
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.json': 'application/json'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise(resolve => {
    server.listen(port, () => resolve(server));
  });
}

async function runTests() {
  const PORT = 4174;
  const server = await startServer(PORT);
  const BASE = `http://localhost:${PORT}`;
  console.log(`Test server running at ${BASE}`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const results = {
    hydration: [],
    searchAction: null,
    breadcrumbs: [],
    canonical: [],
    comparisons: [],
    guides: []
  };

  try {
    const page = await browser.newPage();

    // 1. Hydration & Console Verification
    const testRoutes = [
      '/',
      '/vergleichskatalog',
      '/preisrechner',
      '/eigenmarken-decoder',
      '/meine-linsen',
      '/biofinity',
      '/produkt/airoptix-hydraglyde',
      '/vergleich',
      '/biofinity-vs-air-optix',
      '/transparenz',
      '/ratgeber/kontaktlinsen-anpassen',
      '/ratgeber/astigmatismus-kontaktlinsen',
      '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
      '/ratgeber/kontaktlinsen-pflegemittel-vergleich'
    ];

    for (const r of testRoutes) {
      const consoleErrors = [];
      const onMsg = msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      };
      page.on('console', onMsg);

      await page.goto(`${BASE}${r}`, { waitUntil: 'networkidle0' });
      results.hydration.push({
        route: r,
        errors: consoleErrors.length,
        details: consoleErrors
      });
      page.off('console', onMsg);
    }

    // 2. SearchAction Query Evaluation (F11)
    await page.goto(`${BASE}/vergleichskatalog?q=Biofinity`, { waitUntil: 'networkidle0' });
    const searchVal = await page.$eval('input[placeholder*="Linsenname"]', el => el.value);
    const resultCount = await page.evaluate(() => {
      return document.querySelectorAll('a[href="/biofinity"], a[href^="/produkt/biofinity"]').length;
    });
    results.searchAction = { query: 'Biofinity', inputVal: searchVal, resultCount };

    // 3. BreadcrumbList JSON-LD Evaluation (F12)
    const breadcrumbRoutes = [
      { path: '/', shouldHave: false },
      { path: '/vergleichskatalog', shouldHave: true, expectedLast: 'Katalog' },
      { path: '/biofinity', shouldHave: true, expectedLast: 'CooperVision Biofinity' },
      { path: '/produkt/airoptix-hydraglyde', shouldHave: true, expectedLast: 'Air Optix Plus HydraGlyde' },
      { path: '/ratgeber/tageslinsen-vs-monatslinsen-kosten', shouldHave: true, expectedLast: 'Tageslinsen vs. Monatslinsen Kosten' },
      { path: '/ratgeber/kontaktlinsen-pflegemittel-vergleich', shouldHave: true, expectedLast: 'Kontaktlinsen-Pflegemittel' },
      { path: '/transparenz', shouldHave: true, expectedLast: 'Transparenz-Standard' },
      { path: '/vergleich', shouldHave: true, expectedLast: 'Produktvergleich' }
    ];

    for (const br of breadcrumbRoutes) {
      await page.goto(`${BASE}${br.path}`, { waitUntil: 'networkidle0' });
      const schema = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        for (const s of scripts) {
          try {
            const data = JSON.parse(s.innerText);
            if (data['@type'] === 'BreadcrumbList') return data;
          } catch(e) {}
        }
        return null;
      });
      const hasBreadcrumb = !!schema;
      const lastItem = schema ? schema.itemListElement[schema.itemListElement.length - 1]?.name : null;
      results.breadcrumbs.push({
        route: br.path,
        hasBreadcrumb,
        lastItem,
        pass: hasBreadcrumb === br.shouldHave && (!br.expectedLast || lastItem === br.expectedLast)
      });
    }

    // 4. Canonical Consistency (F17)
    const canonicalChecks = [
      { path: '/vergleich', expected: 'https://www.optical.de/vergleich' },
      { path: '/biofinity-vs-air-optix', expected: 'https://www.optical.de/biofinity-vs-air-optix' },
      { path: '/vergleich?ids=biofinity,airoptix-hydraglyde', expected: 'https://www.optical.de/vergleich' }
    ];

    for (const c of canonicalChecks) {
      await page.goto(`${BASE}${c.path}`, { waitUntil: 'networkidle0' });
      const domCanonical = await page.$eval('link[rel="canonical"]', el => el.href);
      results.canonical.push({
        route: c.path,
        expected: c.expected,
        domCanonical,
        pass: domCanonical === c.expected
      });
    }

    // 5. Invalid Comparison State (F18)
    const comparisonTests = [
      { name: '2 Valid Lenses', path: '/vergleich?ids=biofinity,airoptix-hydraglyde', shouldShowError: false },
      { name: '1 Invalid Lens', path: '/vergleich?ids=biofinity,unbekannte-linse-123', shouldShowError: true },
      { name: '2 Invalid Lenses', path: '/vergleich?ids=unbekannt-1,unbekannt-2', shouldShowError: true },
      { name: 'Identical Lenses', path: '/vergleich?ids=biofinity,biofinity', shouldShowError: true },
      { name: 'Non-Lens Category', path: '/vergleich?ids=biofinity,biotrue-fluid', shouldShowError: true }
    ];

    for (const ct of comparisonTests) {
      await page.goto(`${BASE}${ct.path}`, { waitUntil: 'networkidle0' });
      const hasErrorBox = await page.evaluate(() => {
        return document.body.innerText.includes('Kein gültiger Produktvergleich möglich');
      });
      results.comparisons.push({
        test: ct.name,
        path: ct.path,
        hasErrorBox,
        pass: hasErrorBox === ct.shouldShowError
      });
    }

    // 6. Migrated Ratgeber Layout (F16)
    const guideRoutes = [
      '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
      '/ratgeber/kontaktlinsen-pflegemittel-vergleich'
    ];

    for (const gr of guideRoutes) {
      await page.goto(`${BASE}${gr}`, { waitUntil: 'networkidle0' });
      const layoutCheck = await page.evaluate(() => {
        const hasHeader = !!document.querySelector('header');
        const hasFooter = !!document.querySelector('footer');
        const hasMedicalDisclaimer = document.body.innerText.includes('MEDIZINPRODUKTE-HINWEIS') || document.body.innerText.includes('Medizinprodukt');
        const hasTrust = document.body.innerText.includes('Transparenzstandard von optical.de') || document.body.innerText.includes('Datenethik');
        const hasSehkomfortBtn = !!document.querySelector('button[aria-label*="Sehkomfort"]');
        return { hasHeader, hasFooter, hasMedicalDisclaimer, hasTrust, hasSehkomfortBtn };
      });
      results.guides.push({
        route: gr,
        ...layoutCheck,
        pass: layoutCheck.hasHeader && layoutCheck.hasFooter && layoutCheck.hasSehkomfortBtn
      });
    }

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=== TEST RESULTS SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));

  const allHydrationPass = results.hydration.every(h => h.errors === 0);
  const searchPass = results.searchAction.resultCount > 0 && results.searchAction.inputVal === 'Biofinity';
  const breadcrumbPass = results.breadcrumbs.every(b => b.pass);
  const canonicalPass = results.canonical.every(c => c.pass);
  const comparisonPass = results.comparisons.every(cp => cp.pass);
  const guidesPass = results.guides.every(g => g.pass);

  console.log('\n=== VERIFICATION CHECKLIST ===');
  console.log('Hydration (F14):', allHydrationPass ? 'ALL PASS (0 errors)' : 'FAIL');
  console.log('SearchAction (F11):', searchPass ? 'ALL PASS' : 'FAIL');
  console.log('Breadcrumbs (F12):', breadcrumbPass ? 'ALL PASS' : 'FAIL');
  console.log('Canonicals (F17):', canonicalPass ? 'ALL PASS' : 'FAIL');
  console.log('Comparisons (F18):', comparisonPass ? 'ALL PASS' : 'FAIL');
  console.log('Migrated Guides (F16):', guidesPass ? 'ALL PASS' : 'FAIL');
}

runTests();
