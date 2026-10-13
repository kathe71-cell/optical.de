import fs from 'node:fs';
import { PRODUCTS } from '../../src/data/products.js';
import { VERIFIED_ACTIVE_ASINS } from '../../src/utils/affiliate.js';
const date = new Date().toISOString().slice(0, 10);
// Ergebnisse der Amazon-Erreichbarkeitsprüfung (Phase 9.3, einzelne GETs, kein Scraping)
const rows = PRODUCTS.map(p => {
  const active = VERIFIED_ACTIVE_ASINS.has(p.asin);
  return {
    product_id: p.id, asin: p.asin || null, merchant: 'amazon.de', product_name: p.product_name || p.id,
    pack_size: p.packSize || p.pack_size || null,
    verification_status: active ? 'REACHABILITY_CONFIRMED' : 'BROKEN',
    verification_method: active ? 'HTTP GET /dp/<ASIN>: 200, Seitentitel nicht als 404' : 'HTTP GET /dp/<ASIN>: 404 "Seite wurde nicht gefunden"',
    verification_date: '2026-10-13', evidence: active ? 'HTTP 200; Identität, Variante, Packungsgröße NICHT geprüft' : 'HTTP 404', last_checked: '2026-10-13',
  };
});
fs.mkdirSync('src/data/verification', { recursive: true });
fs.writeFileSync('src/data/verification/amazon-register.js',
`// Maschinenlesbares Verifikationsregister Amazon (generiert von scripts/verify/build-registers.mjs).
// HTTP 200 ist maximal REACHABILITY_CONFIRMED. EXACT_MATCH_VERIFIED erfordert manuelle Prüfung (Variante + Packungsgröße).
export const AMAZON_VERIFICATION_STATUSES = ['UNVERIFIED','REACHABILITY_CONFIRMED','IDENTITY_CONFIRMED','EXACT_MATCH_VERIFIED','BROKEN','MISMATCH'];
export const AMAZON_VERIFICATION_REGISTER = ${JSON.stringify(rows, null, 1)};
`);
const src = JSON.parse(fs.readFileSync('scripts/verify/source-check-results.json', 'utf8'));
const checks = {};
for (const r of src) checks[r.id] = {
  source_url: r.source_url, http_status: r.http_status, reachable: r.reachable, checked_at: r.checked_at, blocker: r.blocker,
  name_mentioned_automated: r.reachable && r.family_mentioned, brand_mentioned_automated: r.reachable && r.brand_mentioned,
  source_check_level: !r.reachable ? 'SOURCE_LISTED' : 'SOURCE_REACHABLE',
  attributes: Object.fromEntries(['material','water_content','dk_t','base_curve','diameter','replacement_schedule','lens_type','standard_pack_size'].map(k => [k, 'UNVERIFIED'])),
};
fs.writeFileSync('src/data/verification/source-checks.js',
`// Ergebnis der automatisierten Quellenprüfung (generiert). Attribute bleiben UNVERIFIED, bis ein Mensch/Datenblatt sie belegt.
// name_mentioned_automated = reiner Textabgleich, KEIN Identitätsnachweis.
export const SOURCE_CHECKS = ${JSON.stringify(checks, null, 1)};
`);
// Pipeline-Status im Katalog: nicht erreichbare Quelle => DISCOVERED
let t = fs.readFileSync('src/data/research/catalog-expansion.js', 'utf8'); let n = 0;
for (const r of src) if (!r.reachable) {
  const i = t.indexOf(`"id": "${r.id}"`); if (i < 0) continue;
  const j = t.indexOf('"pipeline_status": "SOURCE_IDENTIFIED"', i); const end = t.indexOf('\n  },', i);
  if (j > 0 && j < end) { t = t.slice(0, j) + '"pipeline_status": "DISCOVERED"' + t.slice(j + '"pipeline_status": "SOURCE_IDENTIFIED"'.length); n++; }
}
fs.writeFileSync('src/data/research/catalog-expansion.js', t);
console.log('downgraded to DISCOVERED:', n, 'rows', rows.length);
