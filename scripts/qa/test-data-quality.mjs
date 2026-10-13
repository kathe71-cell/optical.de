// Datenqualitäts-Gate: verhindert, dass ungeprüfte Daten als verifiziert gelten.
import { RESEARCH_CATALOG } from '../../src/data/research/catalog-expansion.js';
import { SOURCE_CHECKS } from '../../src/data/verification/source-checks.js';
import { AMAZON_VERIFICATION_REGISTER, AMAZON_VERIFICATION_STATUSES } from '../../src/data/verification/amazon-register.js';
import { PRODUCTS } from '../../src/data/products.js';
import { EIGENMARKEN_DATABASE } from '../../src/data/eigenmarken.js';
import { VERIFIED_ACTIVE_ASINS } from '../../src/utils/affiliate.js';
let fail = 0; const t = (ok, m) => { if (!ok) { fail++; console.error('[FAIL]', m); } };
const HIGH = ['PRODUCT_IDENTITY_VERIFIED', 'TECHNICAL_DATA_PARTIALLY_VERIFIED', 'TECHNICAL_DATA_VERIFIED', 'EDITORIAL_REVIEW', 'APPROVED'];
const ids = new Set(); const variants = new Set();
for (const e of RESEARCH_CATALOG) {
  t(!ids.has(e.id), 'Doppelte ID ' + e.id); ids.add(e.id);
  const vk = [e.manufacturer, e.product_family, e.product_variant, e.standard_pack_size].join('|').toLowerCase();
  t(!variants.has(vk), 'Doppelte Variante ' + e.id); variants.add(vk);
  t(!!e.source_url && /^https:\/\//.test(e.source_url), 'Quelle fehlt/ungültig ' + e.id);
  const c = SOURCE_CHECKS[e.id];
  t(!!c, 'Keine Quellenprüfung ' + e.id);
  t(!!e.manufacturer && !!e.product_name, 'Pflichtfeld fehlt ' + e.id);
  t(e.pipeline_status !== 'DATA_VERIFIED', 'Pauschal DATA_VERIFIED ' + e.id);
  if (c && !c.reachable) t(e.pipeline_status === 'DISCOVERED', 'Unerreichbare Quelle, aber Status ' + e.pipeline_status + ' ' + e.id);
  if (HIGH.includes(e.pipeline_status)) t(c && c.reachable && c.name_mentioned_automated, 'Hoher Status ohne belegte Quelle ' + e.id);
  if (c) t(Object.values(c.attributes).every(v => ['UNVERIFIED', 'VERIFIED', 'PARTIALLY_VERIFIED'].includes(v)), 'Attributstatus ungültig ' + e.id);
  if (e.entity_type === 'PRIVATE_LABEL_MAPPING')
    t(e.confidence_level === 'UNVERIFIED' || (c && c.reachable && c.name_mentioned_automated), 'Eigenmarken-Mapping ohne Beleg ' + e.id);
}
// Eigenmarken: gleiche Marke -> unterschiedliche Ziel-Produkte darf nicht beide als belegt gelten
const live = new Map(EIGENMARKEN_DATABASE.map(m => [m.private_label.toLowerCase(), m]));
for (const e of RESEARCH_CATALOG.filter(x => x.entity_type === 'PRIVATE_LABEL_MAPPING')) {
  const l = live.get((e.private_label || '').toLowerCase());
  if (l && l.matched_brand_id && l.matched_brand_id !== e.matched_brand_id) t(e.confidence_level === 'UNVERIFIED', 'Eigenmarken-Konflikt nicht UNVERIFIED ' + e.id);
}
// Amazon-Register
const live39 = new Set(PRODUCTS.map(p => p.id));
t(AMAZON_VERIFICATION_REGISTER.length === PRODUCTS.length, 'Register unvollständig');
for (const r of AMAZON_VERIFICATION_REGISTER) {
  t(live39.has(r.product_id), 'Register: unbekanntes Produkt ' + r.product_id);
  t(AMAZON_VERIFICATION_STATUSES.includes(r.verification_status), 'Ungültiger Status ' + r.product_id);
  t(!!r.verification_method && !!r.verification_date && !!r.evidence && !!r.last_checked, 'Verifikationsdaten fehlen ' + r.product_id);
  if (r.verification_status === 'EXACT_MATCH_VERIFIED') t(/manuell/i.test(r.verification_method), 'EXACT_MATCH ohne manuelle Prüfung ' + r.product_id);
  const direct = VERIFIED_ACTIVE_ASINS.has(r.asin);
  t(direct === ['REACHABILITY_CONFIRMED', 'IDENTITY_CONFIRMED', 'EXACT_MATCH_VERIFIED'].includes(r.verification_status), 'Direktlink-Gate inkonsistent ' + r.product_id);
  if (r.verification_status === 'BROKEN' || r.verification_status === 'MISMATCH') t(!direct, 'Defekte ASIN aktiv ' + r.product_id);
}
console.log(fail ? `❌ ${fail} Fehler` : `✅ Datenqualitäts-Gate bestanden (${RESEARCH_CATALOG.length} Recherche, ${AMAZON_VERIFICATION_REGISTER.length} Amazon)`);
process.exit(fail ? 1 : 0);
