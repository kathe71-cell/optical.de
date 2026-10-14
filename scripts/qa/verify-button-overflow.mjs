import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';

// Mini static server for dist
const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, reqPath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4173, async () => {
  console.log('Static preview server listening on port 4173');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const testUrls = ['/', '/vergleichskatalog', '/biofinity', '/preisrechner', '/nachkauf-assistent'];
  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 800 },
    { name: 'Mobile 375px', width: 375, height: 800 },
    { name: 'Desktop 200% zoom (640px)', width: 640, height: 700 },
    { name: 'Desktop standard (1280px)', width: 1280, height: 800 }
  ];

  let totalButtonsChecked = 0;
  let issuesFound = 0;

  for (const urlPath of testUrls) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto(`http://localhost:4173${urlPath}`, { waitUntil: 'networkidle0' });

      for (const sehkomfort of [false, true]) {
        await page.evaluate((active) => {
          if (active) {
            document.documentElement.classList.add('sehkomfort-active');
          } else {
            document.documentElement.classList.remove('sehkomfort-active');
          }
        }, sehkomfort);

        await new Promise(r => setTimeout(r, 100));

        const buttonIssues = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, a[role="button"], .card-action-grid a'));
          const issues = [];

          buttons.forEach((btn, index) => {
            // Check if element is visible
            const rect = btn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0 || window.getComputedStyle(btn).display === 'none') {
              return;
            }

            // Check if text/content overflows element bounding box
            const scrollW = btn.scrollWidth;
            const clientW = btn.clientWidth;
            // Toleranz von 1px für Subpixel-Rounding
            if (scrollW > clientW + 1) {
              issues.push({
                tag: btn.tagName,
                text: btn.innerText.trim().replace(/\n/g, ' ').slice(0, 30),
                scrollW,
                clientW,
                diff: scrollW - clientW
              });
            }
          });

          return { count: buttons.length, issues };
        });

        totalButtonsChecked += buttonIssues.count;
        if (buttonIssues.issues.length > 0) {
          console.error(`❌ [${urlPath}] Viewport ${vp.name} (Sehkomfort: ${sehkomfort ? 'AN' : 'AUS'}) - ${buttonIssues.issues.length} Overflows:`);
          buttonIssues.issues.forEach(iss => {
            console.error(`   - "${iss.text}" (scrollWidth: ${iss.scrollW}px > clientWidth: ${iss.clientW}px, diff: +${iss.diff}px)`);
          });
          issuesFound += buttonIssues.issues.length;
        } else {
          console.log(`✅ [${urlPath}] Viewport ${vp.name} (Sehkomfort: ${sehkomfort ? 'AN' : 'AUS'}): ${buttonIssues.count} Buttons ohne Überlauf.`);
        }
      }
    }
  }

  await browser.close();
  server.close();

  console.log(`\n====================================================`);
  console.log(`GESAMTERGEBNIS: ${totalButtonsChecked} Button-Prüfungen`);
  console.log(`Überläufe gefunden: ${issuesFound}`);
  if (issuesFound === 0) {
    console.log(`✅ ABSOLUTE BUTTON-INTEGRITÄT BESTÄTIGT (Normal & Sehkomfort)`);
  } else {
    process.exit(1);
  }
});
