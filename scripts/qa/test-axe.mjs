import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

console.log('====================================================');
console.log('QA AUDIT: AXE-CORE ACCESSIBILITY & WCAG AUTOMATION');
console.log('====================================================');

const distDir = resolve(process.cwd(), 'dist');

// Liste aller vorgerenderten HTML-Dateien ermitteln
function getHtmlFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html') && !file.includes('404')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Gefundene vorgerenderte HTML-Seiten: ${htmlFiles.length}`);

// Stichprobe der wichtigsten Seitentypen testen
const samplePaths = [
  'index.html',
  'vergleichskatalog/index.html',
  'preisrechner/index.html',
  'eigenmarken-decoder/index.html',
  'meine-linsen/index.html',
  'biofinity/index.html',
  'tageslinsen-vergleich/index.html'
];

async function auditPage(filePath, activeSehkomfort = false) {
  const html = readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const { document } = dom.window;

  if (activeSehkomfort) {
    document.documentElement.classList.add('sehkomfort-active');
  }

  // Axe-Core im JSDOM ausführen
  const results = await axe.run(document.documentElement, {
    rules: {
      // In statischer JSDOM-Umgebung ohne CSS-Layout-Engine sind reine Pixel-Layout-Regeln irrelevant/eingeschränkt
      'color-contrast': { enabled: false } // Kontraste werden separat visuell & algorithmisch geprüft
    }
  });

  return results;
}

async function run() {
  let totalViolations = 0;

  for (const relativePath of samplePaths) {
    const fullPath = join(distDir, relativePath);
    console.log(`\nPrüfe: ${relativePath}...`);
    
    // Test 1: Standard Modus
    const normalResults = await auditPage(fullPath, false);
    if (normalResults.violations.length > 0) {
      console.error(`[FAIL] Standard: ${normalResults.violations.length} Barrierefreiheits-Verstöße!`);
      normalResults.violations.forEach(v => {
        console.error(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} Elemente)`);
      });
      totalViolations += normalResults.violations.length;
    } else {
      console.log(`[PASS] Standard-Modus: 0 Verstöße.`);
    }

    // Test 2: Sehkomfort Modus
    const sehkomfortResults = await auditPage(fullPath, true);
    if (sehkomfortResults.violations.length > 0) {
      console.error(`[FAIL] Sehkomfort: ${sehkomfortResults.violations.length} Barrierefreiheits-Verstöße!`);
      sehkomfortResults.violations.forEach(v => {
        console.error(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} Elemente)`);
      });
      totalViolations += sehkomfortResults.violations.length;
    } else {
      console.log(`[PASS] Sehkomfort-Modus: 0 Verstöße.`);
    }
  }

  console.log('\n====================================================');
  if (totalViolations > 0) {
    console.error(`❌ Axe-Core Audit fehlgeschlagen: ${totalViolations} Verstöße insgesamt.`);
    process.exit(1);
  } else {
    console.log('✅ Axe-Core Audit für alle Hauptseitentypen fehlerfrei (0 Verstöße)!');
  }
}

run().catch(err => {
  console.error('Audit Fehler:', err);
  process.exit(1);
});
