import { RESEARCH_CATALOG, getResearchCatalogStats } from '../../src/data/research/catalog-expansion.js';

console.log("====================================================");
console.log("QA TEST SUITE: SYSTEMATIC MARKET RESEARCH CATALOG");
console.log("====================================================");

const stats = getResearchCatalogStats();
console.log(`Gesamtzahl recherchierter Kandidaten: ${stats.total_researched}`);
console.log(`Davon DATA_VERIFIED: ${stats.verified_sources_count} (${Math.round(stats.verified_sources_count / stats.total_researched * 100)} %)`);

console.log("\n--- Herstellerverteilung ---");
Object.entries(stats.by_manufacturer).sort((a,b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`- ${k}: ${v}`);
});

console.log("\n--- Linsentyp- und Segmentverteilung ---");
Object.entries(stats.by_type).sort((a,b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`- ${k}: ${v}`);
});

console.log("\n--- Entitätstypen ---");
Object.entries(stats.by_entity_type).sort((a,b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`- ${k}: ${v}`);
});

// Strikte Validierungsprüfung
let errors = 0;
const ids = new Set();
const productNames = new Set();

RESEARCH_CATALOG.forEach((item, index) => {
  // 1. ID Prüfung
  if (!item.id || typeof item.id !== 'string') {
    console.error(`[FAIL] Index ${index}: Fehlende oder ungültige ID`);
    errors++;
  } else if (ids.has(item.id)) {
    console.error(`[FAIL] Duplizierte ID gefunden: ${item.id}`);
    errors++;
  } else {
    ids.add(item.id);
  }

  // 2. Erforderliche Felder
  const requiredFields = [
    'id', 'product_name', 'manufacturer', 'brand', 'product_family',
    'product_variant', 'lens_type', 'entity_type', 'source_url',
    'source_type', 'source_name', 'research_date', 'pipeline_status',
    'market_relevance', 'market_availability_de'
  ];

  for (const field of requiredFields) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      console.error(`[FAIL] ${item.id}: Fehlendes Pflichtfeld '${field}'`);
      errors++;
    }
  }

  // 3. Quellen-URL Format
  if (!item.source_url.startsWith('https://')) {
    console.error(`[FAIL] ${item.id}: Ungültiges Quellen-URL-Protokoll: ${item.source_url}`);
    errors++;
  }

  // 4. Status-Gültigkeit
  const validStatuses = ['DISCOVERED', 'SOURCE_IDENTIFIED', 'DATA_VERIFIED', 'EDITORIAL_REVIEW', 'APPROVED'];
  if (!validStatuses.includes(item.pipeline_status)) {
    console.error(`[FAIL] ${item.id}: Ungültiger Pipeline-Status: ${item.pipeline_status}`);
    errors++;
  }

  // 5. Eigenmarken-Strenge
  if (item.entity_type === 'PRIVATE_LABEL_MAPPING') {
    const validConf = ['CONFIRMED_MANUFACTURER_IDENTITY', 'DOCUMENTED_TECHNICAL_MATCH', 'POSSIBLE_MATCH', 'UNVERIFIED'];
    if (!validConf.includes(item.confidence_level)) {
      console.error(`[FAIL] ${item.id}: Eigenmarke ohne valides Confidence-Level: ${item.confidence_level}`);
      errors++;
    }
    if (!item.matched_brand_id) {
      console.error(`[FAIL] ${item.id}: Eigenmarke ohne gemappte Referenz-ID`);
      errors++;
    }
  }
});

console.log("\n====================================================");
if (errors === 0) {
  console.log(`[PASS] Alle ${RESEARCH_CATALOG.length} Kandidaten erfüllen 100% der Qualitätsanforderungen!`);
  console.log("====================================================");
} else {
  console.error(`[FAIL] ${errors} Validierungsfehler gefunden!`);
  process.exit(1);
}
