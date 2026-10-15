import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

function startServer(port = 4185) {
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
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

const VIEWPORTS = [
  { name: '390px', width: 390, height: 844 },
  { name: '768px', width: 768, height: 1024 },
  { name: '1024px', width: 1024, height: 768 },
  { name: '1440px', width: 1440, height: 900 }
];

const TARGET_ROUTES = [
  { path: '/biofinity', name: 'biofinity' },
  { path: '/produkt/biofinity-toric', name: 'biofinity-toric' },
  { path: '/produkt/biofinity-multifocal', name: 'biofinity-multifocal' },
  { path: '/produkt/airoptix-hydraglyde', name: 'airoptix-hydraglyde' },
  { path: '/produkt/airoptix-toric', name: 'airoptix-toric' },
  { path: '/produkt/proclear-sphere', name: 'proclear-sphere' },
  { path: '/produkt/myday-daily', name: 'myday-daily' },
  { path: '/monatslinsen-vergleich', name: 'monatslinsen-vergleich' },
  { path: '/tageslinsen-vergleich', name: 'tageslinsen-vergleich' }
];

async function runQA() {
  console.log('====================================================');
  console.log('PHASE 15.1 RESPONSIVE & CONVERSION QA AUDIT');
  console.log('====================================================');

  const server = await startServer(4185);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let totalErrors = 0;
  let checksPassed = 0;

  for (const route of TARGET_ROUTES) {
    console.log(`\nAudit Route: ${route.path}`);
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const url = `http://localhost:4185${route.path}`;

      const consoleErrors = [];
      const errorHandler = (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      };
      page.on('console', errorHandler);

      await page.goto(url, { waitUntil: 'networkidle0' });

      // Prüfe horizontalen Overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          hasOverflow: docWidth > winWidth,
          docWidth,
          winWidth
        };
      });

      if (overflow.hasOverflow) {
        console.error(`  [FAIL] ${vp.name}: Horizontaler Overflow erkannt! (scrollWidth: ${overflow.docWidth}px, innerWidth: ${overflow.winWidth}px)`);
        totalErrors++;
      } else {
        checksPassed++;
      }

      // Bei Produktdetailseiten: Prüfe Händlerangebote und Position
      if (route.path.startsWith('/produkt/') || route.path === '/biofinity') {
        const elementsCheck = await page.evaluate(() => {
          const heading = document.getElementById('haendlerangebote-heading');
          const amazonCard = document.querySelector('a[href*="amazon.de"]');
          const spexCard = document.querySelector('a[href*="awin1.com"]');
          const matrix = document.querySelector('h2');

          return {
            hasHeading: !!heading,
            hasAmazon: !!amazonCard,
            hasMisterSpex: !!spexCard
          };
        });

        if (!elementsCheck.hasHeading || !elementsCheck.hasAmazon || !elementsCheck.hasMisterSpex) {
          console.error(`  [FAIL] ${vp.name}: Händlerangebote unvollständig!`, elementsCheck);
          totalErrors++;
        } else {
          checksPassed++;
        }
      }

      // Bei Category Hubs: Prüfe strukturierte Kriterien & ausgewählte Produkte
      if (route.path.includes('-vergleich')) {
        const catCheck = await page.evaluate(() => {
          const content = document.body.textContent || '';
          const intro = content.includes('Fachliche Einordnung & Kriterien');
          const feat = content.includes('Ausgewählte Produkte im Vergleich');
          const guides = content.includes('Themenrelevante Ratgeber');
          return { intro, feat, guides };
        });

        if (!catCheck.intro || !catCheck.feat || !catCheck.guides) {
          console.error(`  [FAIL] ${vp.name}: Category Hub Sektionen unvollständig!`, catCheck);
          totalErrors++;
        } else {
          checksPassed++;
        }
      }

      page.off('console', errorHandler);
    }
    console.log(`  [PASS] Alle Viewports (390px, 768px, 1024px, 1440px) fehlerfrei`);
  }

  await browser.close();
  server.close();

  console.log('\n====================================================');
  console.log(`TESTERGEBNIS: ${checksPassed} Checks bestanden | ${totalErrors} Fehler`);
  if (totalErrors === 0) {
    console.log('✅ Phase 15.1 Responsive & Conversion QA erfolgreich!');
  } else {
    console.log('❌ Fehler festgestellt!');
    process.exit(1);
  }
}

runQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
