import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const SCREENSHOT_DIR = resolve('/Users/MRT/.gemini/antigravity/brain/0c17d309-bc7a-4f2d-8467-8720b483062d/screenshots');
mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium']
  });

  const page = await browser.newPage();

  // Test matrix
  // 1. Mobile 320px Normal
  console.log('1. Mobile 320px - Sehkomfort AUS');
  await page.setViewport({ width: 320, height: 800, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/vergleichskatalog', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/01-mobile-320px-katalog-normal.png`, fullPage: false });

  // 2. Mobile 320px Sehkomfort AN
  console.log('2. Mobile 320px - Sehkomfort AN');
  // Klicke Sehkomfort Schalter
  await page.evaluate(() => {
    document.documentElement.classList.add('sehkomfort-active');
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02-mobile-320px-katalog-sehkomfort.png`, fullPage: false });

  // 3. Mobile Navigation Drawer (320px)
  console.log('3. Mobile Navigation Drawer (320px)');
  await page.evaluate(() => {
    // Öffne mobiles Menü
    const menuBtn = document.querySelector('header button[aria-label="Hauptmenü umschalten"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: `${SCREENSHOT_DIR}/03-mobile-320px-menu-drawer.png`, fullPage: false });

  // 4. Desktop 200% Zoom (Effektiv 640x500 bei 1280 Standard)
  console.log('4. Desktop 200% Zoom - Sehkomfort AN');
  await page.setViewport({ width: 640, height: 700, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/vergleichskatalog', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('sehkomfort-active');
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `${SCREENSHOT_DIR}/04-desktop-zoom200-katalog-sehkomfort.png`, fullPage: false });

  // 5. Desktop 400% Zoom (Effektiv 320px Viewport bei hoher Skalierung)
  console.log('5. Desktop 400% Zoom - Sehkomfort AN');
  await page.setViewport({ width: 320, height: 600, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/biofinity', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('sehkomfort-active');
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: `${SCREENSHOT_DIR}/05-desktop-zoom400-product-sehkomfort.png`, fullPage: false });

  // 6. Nachkauf-Assistent Modal
  console.log('6. Nachkauf-Assistent Modal (Sehkomfort AN)');
  await page.setViewport({ width: 375, height: 850, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/biofinity', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('sehkomfort-active');
    // Finde Refill-Button und klicke
    const buttons = Array.from(document.querySelectorAll('button'));
    const refillBtn = buttons.find(b => b.textContent.includes('Nachkauf') || b.textContent.includes('Plan'));
    if (refillBtn) refillBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: `${SCREENSHOT_DIR}/06-nachkauf-modal-sehkomfort.png`, fullPage: false });

  // 7. Textüberlauf-Messung im DOM
  console.log('7. Berechne Überläufe aller Buttons...');
  const overflowResults = await page.evaluate(() => {
    const issues = [];
    const elements = Array.from(document.querySelectorAll('button, a[role="button"], a.w-full, .card-action-grid *'));
    elements.forEach(el => {
      const scrollW = el.scrollWidth;
      const clientW = el.clientWidth;
      const scrollH = el.scrollHeight;
      const clientH = el.clientHeight;
      // Wenn Inhalt breiter ist als Container (mehr als 2px Rundungstoleranz)
      if (scrollW > clientW + 2) {
        issues.push({
          type: 'overflow-x',
          tag: el.tagName,
          text: el.textContent.trim().substring(0, 30),
          clientW,
          scrollW
        });
      }
      if (scrollH > clientH + 2 && getComputedStyle(el).overflow === 'hidden') {
        issues.push({
          type: 'overflow-y',
          tag: el.tagName,
          text: el.textContent.trim().substring(0, 30),
          clientH,
          scrollH
        });
      }
    });
    return issues;
  });

  console.log('Erkannte DOM-Überläufe:', overflowResults);

  await browser.close();
  console.log('✅ Alle Screenshots und Überlauf-Messungen erfolgreich abgeschlossen!');
}

run().catch(err => {
  console.error('Screenshot Fehler:', err);
  process.exit(1);
});
