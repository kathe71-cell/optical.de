import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('====================================================');
console.log('QA TEST SUITE: SEHKOMFORT-MODUS & BUTTON-INTEGRITÄT');
console.log('====================================================');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Prüfe SehkomfortContext.jsx
const contextFile = resolve(process.cwd(), 'src/context/SehkomfortContext.jsx');
const contextContent = readFileSync(contextFile, 'utf-8');
assert(contextContent.includes('optical_sehkomfort_active'), 'SehkomfortContext nutzt Schlüssel optical_sehkomfort_active');
assert(contextContent.includes('memoryStorageFallback'), 'SehkomfortContext besitzt in-memory Fallback bei blockiertem localStorage');
assert(contextContent.includes('classList.add(\'sehkomfort-active\')'), 'SehkomfortContext toggelt CSS-Klasse auf dem Root-DOM');
assert(contextContent.includes('useSehkomfort'), 'SehkomfortContext exportiert Hook useSehkomfort');

// 2. Prüfe Header.jsx
const headerFile = resolve(process.cwd(), 'src/components/Header.jsx');
const headerContent = readFileSync(headerFile, 'utf-8');
assert(headerContent.includes('toggleSehkomfort'), 'Header enthält Schalter für toggleSehkomfort');
assert(headerContent.includes('aria-pressed={sehkomfort}'), 'Schalter besitzt barrierefreies ARIA-Attribut aria-pressed');
assert(headerContent.includes('Sehkomfort'), 'Schalter ist mit „Sehkomfort“ beschriftet');

// 3. Prüfe index.css
const cssFile = resolve(process.cwd(), 'src/index.css');
const cssContent = readFileSync(cssFile, 'utf-8');
assert(cssContent.includes('.sehkomfort-active'), 'index.css enthält .sehkomfort-active Selektor');
assert(cssContent.includes('white-space: normal;'), 'Button-Texte dürfen im Sehkomfort-Modus umbrechen');
assert(cssContent.includes('min-height: 48px;'), 'Buttons halten barrierefreies 48px Mindestmaß ein');
assert(cssContent.includes('overflow: visible;'), 'Künstliche Textkürzungen (truncate) werden aufgehoben');
assert(cssContent.includes('flex-shrink: 0;'), 'Icons in Buttons werden vor Verzerrung geschützt');
assert(cssContent.includes('card-action-grid'), '2-Spalten-Button-Grids schalten für Schutz vor Überlauf auf vertikales Stapeln');

// 4. Prüfe Prerender HTML Output
const indexHtml = readFileSync(resolve(process.cwd(), 'dist/index.html'), 'utf-8');
assert(indexHtml.includes('Sehkomfort'), 'Startseite im SSG Prerender enthält den Sehkomfort-Button');

console.log('====================================================');
console.log(`ERGEBNIS: ${passed} PASS | ${failed} FAIL`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ Alle Sehkomfort- & Button-Integritätstests bestanden!');
}
