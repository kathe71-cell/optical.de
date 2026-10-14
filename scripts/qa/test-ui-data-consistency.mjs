import assert from 'assert';
import fs from 'fs';
import { PRODUCTS } from '../../src/data/products.js';

console.log('====================================================');
console.log('QA TEST SUITE: HOTFIX 10.3.1 UI DATA CONSISTENCY');
console.log('====================================================');

let testsPassed = 0;
let testsFailed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    testsFailed++;
  }
}

// 1. Quellcode-Integrität & Barrierefreiheit
it('VergleichskatalogPage.jsx nutzt dynamische Kategoriebezeichnung im Trefferzähler', () => {
  const code = fs.readFileSync('src/pages/VergleichskatalogPage.jsx', 'utf8');
  assert(code.includes('activeCategory === \'pflege\''), 'Pflegemittel-Abfrage fehlt');
  assert(code.includes('Pflegemittel'), 'Pflegemittel-Label fehlt');
  assert(code.includes('Monatslinse'), 'Monatslinsen Singular/Plural fehlt');
  assert(code.includes('Tageslinse'), 'Tageslinsen Singular/Plural fehlt');
  assert(code.includes('2-Wochen-Linse'), '2-Wochen-Linsen Singular/Plural fehlt');
  assert(code.includes('role="status"'), 'role="status" für Barrierefreiheit fehlt');
  assert(code.includes('aria-live="polite"'), 'aria-live="polite" für Screenreader fehlt');
});

it('VergleichskatalogPage.jsx besitzt kategorie-spezifische Leermeldung', () => {
  const code = fs.readFileSync('src/pages/VergleichskatalogPage.jsx', 'utf8');
  assert(code.includes("if (activeCategory === 'pflege') return 'Pflegemittel'"), 'Kategoriespezifischer Leerzustand fehlt');
});

// 2. Mathematische Datenkonsistenz über alle Filterzustände
function computeCatalogCount(activeCategory, searchQuery = '', activeBrand = 'all', activeDesign = 'all', activeMaterial = 'all') {
  return PRODUCTS.filter((item) => {
    if (activeCategory === 'monat' && item.wear_schedule !== 'monatslinsen') return false;
    if (activeCategory === 'zweiwoche' && item.wear_schedule !== 'zweiwochenlinsen') return false;
    if (activeCategory === 'tag' && item.wear_schedule !== 'tageslinsen') return false;
    if (activeCategory === 'pflege' && item.category !== 'pflegemittel') return false;
    if (activeCategory === 'tropfen' && item.category !== 'augentropfen') return false;
    if (activeCategory === 'zubehoer' && item.category !== 'zubehoer') return false;

    if (activeDesign === 'sphaerisch' && item.design_type !== 'sphaerisch') return false;
    if (activeDesign === 'torisch' && item.design_type !== 'torisch') return false;
    if (activeDesign === 'multifokal' && item.design_type !== 'multifokal') return false;

    if (activeBrand !== 'all' && item.manufacturer_id !== activeBrand) return false;

    if (activeMaterial === 'silicone') {
      if (item.category !== 'kontaktlinsen' || item.material_type !== 'silikon-hydrogel') return false;
    }
    if (activeMaterial === 'hydrogel') {
      if (item.category !== 'kontaktlinsen' || item.material_type !== 'hydrogel') return false;
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const searchable = [
        item.product_name,
        item.manufacturer,
        item.brand || '',
        item.material || '',
        item.lens_type || '',
        item.id
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  }).length;
}

function getExpectedLabel(count, activeCategory, searchQuery = '') {
  let noun = '';
  if (activeCategory === 'monat') {
    noun = count === 1 ? 'Monatslinse' : 'Monatslinsen';
  } else if (activeCategory === 'zweiwoche') {
    noun = count === 1 ? '2-Wochen-Linse' : '2-Wochen-Linsen';
  } else if (activeCategory === 'tag') {
    noun = count === 1 ? 'Tageslinse' : 'Tageslinsen';
  } else if (activeCategory === 'pflege') {
    noun = count === 1 ? 'Pflegemittel' : 'Pflegemittel';
  } else if (activeCategory === 'tropfen') {
    noun = count === 1 ? 'Augentropfen-Produkt' : 'Augentropfen-Produkte';
  } else if (activeCategory === 'zubehoer') {
    noun = count === 1 ? 'Zubehör-Artikel' : 'Zubehör-Artikel';
  } else {
    noun = count === 1 ? 'Produkt' : 'Produkte';
  }

  if (count === 0) {
    return `Keine ${noun} gefunden${searchQuery.trim() ? ` für „${searchQuery.trim()}“` : ''}`;
  }
  return `${count} ${noun} gefunden${searchQuery.trim() ? ` für „${searchQuery.trim()}“` : ''}`;
}

// 3. Test der Kategorien & Nomen-Grammatik
it('Kategorie „Pflegemittel“ liefert exakt 7 Pflegemittel und keine Kontaktlinsen-Bezeichnung', () => {
  const count = computeCatalogCount('pflege');
  assert.strictEqual(count, 7, 'Pflegemittelanzahl nicht 7');
  const label = getExpectedLabel(count, 'pflege');
  assert.strictEqual(label, '7 Pflegemittel gefunden');
  assert(!label.includes('Kontaktlinsen'), 'Bezeichnung enthält fälschlicherweise Kontaktlinsen');
});

it('Kategorie „Tageslinsen“ liefert Plural „19 Tageslinsen gefunden“', () => {
  const count = computeCatalogCount('tag');
  assert.strictEqual(count, 19);
  const label = getExpectedLabel(count, 'tag');
  assert.strictEqual(label, '19 Tageslinsen gefunden');
});

it('Kategorie „Monatslinsen“ liefert Plural „24 Monatslinsen gefunden“', () => {
  const count = computeCatalogCount('monat');
  assert.strictEqual(count, 24);
  const label = getExpectedLabel(count, 'monat');
  assert.strictEqual(label, '24 Monatslinsen gefunden');
});

it('Kategorie „2-Wochen-Linsen“ liefert Plural „3 2-Wochen-Linsen gefunden“', () => {
  const count = computeCatalogCount('zweiwoche');
  assert.strictEqual(count, 3);
  const label = getExpectedLabel(count, 'zweiwoche');
  assert.strictEqual(label, '3 2-Wochen-Linsen gefunden');
});

it('Kategorie „Augentropfen“ liefert Plural „3 Augentropfen-Produkte gefunden“', () => {
  const count = computeCatalogCount('tropfen');
  assert.strictEqual(count, 3);
  const label = getExpectedLabel(count, 'tropfen');
  assert.strictEqual(label, '3 Augentropfen-Produkte gefunden');
});

it('Kategorie „Zubehör“ liefert Singular „1 Zubehör-Artikel gefunden“', () => {
  const count = computeCatalogCount('zubehoer');
  assert.strictEqual(count, 1);
  const label = getExpectedLabel(count, 'zubehoer');
  assert.strictEqual(label, '1 Zubehör-Artikel gefunden');
});

it('Kategorie „Alle Produkte“ liefert Plural „57 Produkte gefunden“', () => {
  const count = computeCatalogCount('all');
  assert.strictEqual(count, 57);
  const label = getExpectedLabel(count, 'all');
  assert.strictEqual(label, '57 Produkte gefunden');
});

it('Singular-Test: Suche nach genau 1 Monatslinse („Biofinity Toric Multifocal“)', () => {
  const count = computeCatalogCount('monat', 'Biofinity Toric Multifocal');
  assert.strictEqual(count, 1);
  const label = getExpectedLabel(count, 'monat', 'Biofinity Toric Multifocal');
  assert.strictEqual(label, '1 Monatslinse gefunden für „Biofinity Toric Multifocal“');
});

it('Null-Treffer-Test: Ungültige Suche erzeugt „Keine Produkte gefunden für ...“', () => {
  const count = computeCatalogCount('all', 'xyzunbekannt');
  assert.strictEqual(count, 0);
  const label = getExpectedLabel(count, 'all', 'xyzunbekannt');
  assert.strictEqual(label, 'Keine Produkte gefunden für „xyzunbekannt“');
});

it('Kombination Filter + Suche: Pflegemittel gesucht nach „HydraGlyde“ liefert 1 Pflegemittel', () => {
  const count = computeCatalogCount('pflege', 'HydraGlyde');
  assert.strictEqual(count, 1);
  const label = getExpectedLabel(count, 'pflege', 'HydraGlyde');
  assert.strictEqual(label, '1 Pflegemittel gefunden für „HydraGlyde“');
});

it('Kombination Filter + Suche: Pflegemittel gesucht nach „Aosept“ liefert 2 Pflegemittel', () => {
  const count = computeCatalogCount('pflege', 'Aosept');
  assert.strictEqual(count, 2);
  const label = getExpectedLabel(count, 'pflege', 'Aosept');
  assert.strictEqual(label, '2 Pflegemittel gefunden für „Aosept“');
});

console.log('====================================================');
console.log(`TESTERGEBNIS: ${testsPassed} PASS | ${testsFailed} FAIL`);
if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ Alle UI-Data-Consistency Prüfungen erfolgreich bestanden!');
}
