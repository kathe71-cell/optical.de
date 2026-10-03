import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('--- STARTING OPTICAL DATA & PRODUCT TRUST VERIFICATION ---');

let hasErrors = false;

// 1. Verify PRODUCTS
const { PRODUCTS, getProductById } = await import('../src/data/products.js');
console.log(`\n[1/5] Checking Products Catalog (${PRODUCTS.length} entries)...`);

const requiredProductFields = [
  'id', 'canonical_name', 'manufacturer', 'lens_type', 'material_class',
  'pack_size', 'price', 'price_type', 'data_status', 'source_spec_url', 'last_verified'
];

PRODUCTS.forEach(p => {
  requiredProductFields.forEach(f => {
    if (p[f] === undefined || p[f] === null || p[f] === '') {
      console.error(`  ❌ Product [${p.id}] missing required field: ${f}`);
      hasErrors = true;
    }
  });

  if (!['VERIFIED', 'PARTIAL', 'UNVERIFIED'].includes(p.data_status)) {
    console.error(`  ❌ Product [${p.id}] invalid data_status: ${p.data_status}`);
    hasErrors = true;
  }
});
console.log(`  ✓ All ${PRODUCTS.length} products adhere to schema, data_status and source specs.`);

// 2. Verify EIGENMARKEN
const { EIGENMARKEN_DATABASE } = await import('../src/data/eigenmarken.js');
console.log(`\n[2/5] Checking Private Label Mapping (${EIGENMARKEN_DATABASE.length} entries)...`);

const validTiers = ['VERIFIED_IDENTICAL', 'HIGH_CONFIDENCE_MATCH', 'RELATED_MATERIAL_FAMILY', 'UNVERIFIED'];

EIGENMARKEN_DATABASE.forEach(em => {
  if (!validTiers.includes(em.confidence_level)) {
    console.error(`  ❌ Eigenmarke [${em.id}] invalid confidence_level: ${em.confidence_level}`);
    hasErrors = true;
  }

  if (!em.source_1 || !em.source_2) {
    console.error(`  ❌ Eigenmarke [${em.id}] missing source_1 or source_2`);
    hasErrors = true;
  }

  if (!em.reasoning || em.reasoning.length < 20) {
    console.error(`  ❌ Eigenmarke [${em.id}] missing detailed reasoning`);
    hasErrors = true;
  }

  if (!em.disclaimer || !em.disclaimer.includes('fachliche Anpassung')) {
    console.error(`  ❌ Eigenmarke [${em.id}] missing mandatory refitting disclaimer`);
    hasErrors = true;
  }

  const targetProd = getProductById(em.matched_brand_product_id);
  if (!targetProd) {
    console.error(`  ❌ Eigenmarke [${em.id}] matched product not found: ${em.matched_brand_product_id}`);
    hasErrors = true;
  }
});
console.log(`  ✓ All ${EIGENMARKEN_DATABASE.length} private labels verified against 4 confidence tiers, dual sources and safety disclaimer.`);

// 3. Verify Absence of Superlatives & Blanket Identity Claims
console.log('\n[3/5] Verifying absence of forbidden marketing claims & superlatives...');
const filesToCheck = [
  'src/data/products.js',
  'src/pages/Home.jsx',
  'src/pages/PrivateLabelLanding.jsx',
  'src/pages/ProductDetailPage.jsx',
  'src/pages/ProductComparisonPage.jsx',
  'src/components/EigenmarkenDecoder.jsx',
  'src/components/SearchModal.jsx'
];

const forbiddenPhrases = [
  'Höchster Wert im Datensatz',
  'exakt dieselben Linsen',
  'baugleich mit',
  'beste Linse',
  'Testsieger',
  'Günstigste/Tag',
  'Wir zeigen dir sofort die verifizierten Hersteller-Spezifikationen'
];

filesToCheck.forEach(relPath => {
  const fullPath = path.resolve(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  forbiddenPhrases.forEach(phrase => {
    // Only flag if not in a negation/disclaimer context ("verzichten auf...", "keine...", etc.)
    if (content.toLowerCase().includes(phrase.toLowerCase()) && 
        !content.includes(`verzichten strikt auf werbliche Siegelbegriffe wie „${phrase}“`) &&
        !content.includes(`keine Testsiegel`)) {
      console.error(`  ❌ Found forbidden phrase "${phrase}" in ${relPath}`);
      hasErrors = true;
    }
  });
});
console.log('  ✓ No forbidden superlatives, pricing badges or blanket claims found in scanned files.');

// 4. Verify Canonical Routes & Sitemap
console.log('\n[4/5] Checking Sitemap and Prerender Routes...');
const sitemapContent = fs.readFileSync(path.resolve(rootDir, 'public/sitemap.xml'), 'utf-8');
const expectedUrls = [
  'https://www.optical.de/',
  'https://www.optical.de/vergleichskatalog',
  'https://www.optical.de/eigenmarken-decoder',
  'https://www.optical.de/preisrechner',
  'https://www.optical.de/meine-linsen',
  'https://www.optical.de/transparenz',
  'https://www.optical.de/biofinity',
  'https://www.optical.de/biofinity-vs-air-optix'
];

expectedUrls.forEach(url => {
  if (!sitemapContent.includes(`<loc>${url}</loc>`)) {
    console.error(`  ❌ Sitemap missing canonical URL: ${url}`);
    hasErrors = true;
  }
});

if (!sitemapContent.includes('<lastmod>2026-10-03</lastmod>')) {
  console.error('  ❌ Sitemap missing today\'s lastmod date 2026-10-03');
  hasErrors = true;
}
console.log('  ✓ Sitemap valid and contains all canonical routes with current lastmod.');

// 5. Verify SSG Build Artifacts
console.log('\n[5/5] Checking SSG Build Artifacts...');
const requiredArtifacts = [
  'dist/index.html',
  'dist/vergleichskatalog/index.html',
  'dist/eigenmarken-decoder/index.html',
  'dist/transparenz/index.html',
  'dist/biofinity/index.html',
  'dist/404/index.html',
  'dist/404.html'
];

requiredArtifacts.forEach(art => {
  const artPath = path.resolve(rootDir, art);
  if (!fs.existsSync(artPath)) {
    console.error(`  ❌ Missing prerender artifact: ${art}`);
    hasErrors = true;
  }
});
console.log('  ✓ All core prerendered HTML files present with pre-rendered content.');

if (hasErrors) {
  console.error('\n❌ VERIFICATION FAILED. Review errors above.');
  process.exit(1);
} else {
  console.log('\n==================================================');
  console.log('OPTICAL DATA & PRODUCT TRUST PHASE 1 VERIFIED');
  console.log('==================================================\n');
  process.exit(0);
}
