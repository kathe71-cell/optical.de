// Datenqualitäts-Gate: verhindert, dass ungeprüfte Daten als verifiziert gelten.
import { RESEARCH_CATALOG } from '../../src/data/research/catalog-expansion.js';
import { SOURCE_CHECKS } from '../../src/data/verification/source-checks.js';
import { AMAZON_VERIFICATION_REGISTER, AMAZON_VERIFICATION_STATUSES } from '../../src/data/verification/amazon-register.js';
import { PILOT_VERIFICATION, PILOT_STATUSES, SOURCE_QUALITIES } from '../../src/data/verification/pilot-verification.js';
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
  if (c && !c.reachable && !PILOT_VERIFICATION.some(p => p.product_id === e.id)) t(e.pipeline_status === 'DISCOVERED', 'Unerreichbare Quelle, aber Status ' + e.pipeline_status + ' ' + e.id);
  if (HIGH.includes(e.pipeline_status)) t(PILOT_VERIFICATION.some(p => p.product_id === e.id && p.verification_status === e.pipeline_status), 'Hoher Status ohne Pilot-Verifikationsdatensatz ' + e.id);
  if (c) t(Object.values(c.attributes).every(v => ['UNVERIFIED', 'VERIFIED', 'PARTIALLY_VERIFIED'].includes(v)), 'Attributstatus ungültig ' + e.id);
  if (e.entity_type === 'PRIVATE_LABEL_MAPPING')
    t(e.confidence_level === 'UNVERIFIED' || (c && c.reachable && c.name_mentioned_automated), 'Eigenmarken-Mapping ohne Beleg ' + e.id);
}
// Pilot-Verifikation: Nachweisformat und Konsistenz
const REQ_FOR_VERIFIED = ['material', 'water_content', 'dk_t', 'base_curve', 'diameter', 'pack_sizes'];
for (const p of PILOT_VERIFICATION) {
  const e = RESEARCH_CATALOG.find(x => x.id === p.product_id);
  t(!!e, 'Pilot: Produkt nicht im Katalog ' + p.product_id);
  t(PILOT_STATUSES.includes(p.verification_status), 'Pilot: ungültiger Status ' + p.product_id);
  t(e && e.pipeline_status === p.verification_status, 'Pilot: Katalogstatus != Pilotstatus ' + p.product_id);
  t(p.sources.length > 0 && p.sources.every(s => /^https:\/\//.test(s.url) && SOURCE_QUALITIES.includes(s.source_type) && s.checked_at), 'Pilot: Quelle unvollständig ' + p.product_id);
  const idOk = p.sources.some(s => s.product_identity_confirmed === true);
  if (p.verification_status !== 'SOURCE_IDENTIFIED') t(idOk, 'Pilot: Status ohne bestätigte Identität ' + p.product_id);
  for (const [k, v] of Object.entries(p.verified_attributes)) {
    t(v.value !== undefined && v.value !== null && !!v.source_url && !!v.evidence, 'Pilot: Attributnachweis fehlt ' + p.product_id + '.' + k);
    t(p.sources.some(s => s.url === v.source_url), 'Pilot: Attribut-Quelle nicht in sources ' + p.product_id + '.' + k);
    t(['VERIFIED', 'DERIVED', 'CONFLICT'].includes(v.status), 'Pilot: Attributstatus ungültig ' + p.product_id + '.' + k);
  }
  if (p.verification_status === 'TECHNICAL_DATA_VERIFIED' && p.verified_attributes.dk_t)
    t(REQ_FOR_VERIFIED.every(k => p.verified_attributes[k] && p.verified_attributes[k].status === 'VERIFIED'), 'Pilot: TECHNICAL_DATA_VERIFIED ohne alle Pflichtattribute ' + p.product_id);
  if (p.verification_status === 'TECHNICAL_DATA_VERIFIED') t(!!p.human_review_required, 'Pilot: Review-Hinweis fehlt ' + p.product_id);
  // Katalogwert muss belegtem Wert entsprechen (Variantenvermischung verhindern)
  if (e && p.verified_attributes.dk_t) t(String(p.verified_attributes.dk_t.value).startsWith(String(e.dk_t)), 'Pilot: dk_t Katalog != Quelle ' + p.product_id);
  // Phase 9.6 Qualitätsprüfungen:
  // Jedes Datenblatt/PDF muss einen Dokumenttitel besitzen
  for (const s of p.sources) {
    if (s.source_type === 'OFFICIAL_PRODUCT_DOCUMENT') {
      t(!!s.document_title, 'PDF Quelle ohne document_title ' + p.product_id);
    }
  }
  // Konflikte müssen sauber dokumentiert sein
  if (p.conflicts && p.conflicts.length > 0) {
    for (const conf of p.conflicts) {
      t(!!conf.attribute && conf.catalog_value !== undefined && conf.source_value !== undefined && !!conf.note, 'Unvollständiger Konflikt-Datensatz ' + p.product_id);
    }
  }
}
// Eigenmarken im Live-Datenbestand dürfen nicht als belegt gelten
for (const m of EIGENMARKEN_DATABASE) {
  t(m.confidence_level === 'UNVERIFIED', 'Live-Eigenmarke nicht UNVERIFIED ' + m.id);
  t(!/High-Confidence|Hohe Übereinstimmung|identisch|baugleich/i.test([m.confidence_label, m.technical_statement, m.reasoning].join(' ')), 'Live-Eigenmarke: Gleichsetzungsaussage ' + m.id);
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
  // Strenger Schutz: Keine automatischen EXACT_MATCH_VERIFIED ohne vollstaendige manuelle Pruefung
  if (r.verification_status === 'EXACT_MATCH_VERIFIED') t(/manuell/i.test(r.verification_method), 'EXACT_MATCH ohne manuelle Prüfung ' + r.product_id);
  // Pruefe: Direktlink-Freigaben duerfen nicht als EXACT_MATCH gefuehrt werden, wenn nur Erreichbarkeit bestaetigt ist
  if (r.verification_status === 'REACHABILITY_CONFIRMED') t(!r.evidence.toLowerCase().includes('exakt'), 'REACHABILITY_CONFIRMED darf keine Exaktheit behaupten ' + r.product_id);
  const direct = VERIFIED_ACTIVE_ASINS.has(r.asin);
  t(direct === ['REACHABILITY_CONFIRMED', 'IDENTITY_CONFIRMED', 'EXACT_MATCH_VERIFIED'].includes(r.verification_status), 'Direktlink-Gate inkonsistent ' + r.product_id);
  if (r.verification_status === 'BROKEN' || r.verification_status === 'MISMATCH') t(!direct, 'Defekte ASIN aktiv ' + r.product_id);
}

// Regressionstest: Verifizierte technische Parameter duerfen im Live-Katalog nicht ueberschrieben/abweichend sein
const LIVE_TO_PILOT_MAPPING = {
  'clariti-1day-toric': 'res-cv-clariti-1day-toric',
  'clariti-1day-multifocal': 'res-cv-clariti-1day-multifocal',
  'myday-multifocal': 'res-cv-myday-multifocal',
  'acuvue-oasys-max-1day-multifocal': 'res-jnj-acuvue-oasys-max-1day-multifocal',
  'avaira-vitality': 'res-cv-avaira-vitality',
  'avaira-vitality-toric': 'res-cv-avaira-vitality-toric',
  'biofinity-toric-multifocal': 'res-cv-biofinity-toric-multifocal',
  'biofinity-xr': 'res-cv-biofinity-xr',
  'biofinity-xr-toric': 'res-cv-biofinity-xr-toric',
  'biomedics-55-evolution': 'res-cv-biomedics-55-evolution'
};

for (const [liveId, pilotId] of Object.entries(LIVE_TO_PILOT_MAPPING)) {
  const p = PRODUCTS.find(x => x.id === liveId);
  const pilot = PILOT_VERIFICATION.find(x => x.product_id === pilotId);
  t(!!p, 'Live-Produkt fehlt fuer Regressionstest: ' + liveId);
  t(!!pilot, 'Pilot-Verifikationsdatensatz fehlt fuer: ' + pilotId);
  if (p && pilot && pilot.verified_attributes) {
    const attrs = pilot.verified_attributes;
    if (attrs.dk_t) {
      const match = String(attrs.dk_t.value).match(/^(\d+)/);
      if (match) {
        const expectedDk = parseInt(match[1], 10);
        t(p.dk_t === expectedDk, `Regression: Dk/t mismatch bei ${liveId} (Katalog: ${p.dk_t}, Verifiziert: ${expectedDk})`);
      }
    }
    if (attrs.water_content) {
      const expectedWater = String(attrs.water_content.value).replace(/\s+/g, '');
      const actualWater = String(p.water_content).replace(/\s+/g, '');
      t(actualWater === expectedWater, `Regression: Wassergehalt mismatch bei ${liveId} (Katalog: ${actualWater}, Verifiziert: ${expectedWater})`);
    }
    if (attrs.diameter) {
      const expectedDia = String(attrs.diameter.value).replace(/\s+/g, '').replace(',', '.');
      const actualDia = String(p.diameter).replace(/\s+/g, '').replace(',', '.');
      t(expectedDia.includes(actualDia), `Regression: Durchmesser mismatch bei ${liveId} (Katalog: ${actualDia}, Verifiziert: ${expectedDia})`);
    }
    if (attrs.base_curve) {
      const expectedBc = String(attrs.base_curve.value).replace(/\s+/g, '').replace(',', '.');
      const actualBc = String(p.base_curve).replace(/\s+/g, '').replace(',', '.').split(',')[0];
      t(expectedBc.includes(actualBc), `Regression: Basiskurve mismatch bei ${liveId} (Katalog: ${actualBc}, Verifiziert: ${expectedBc})`);
    }
  }
}

console.log(fail ? `❌ ${fail} Fehler` : `✅ Datenqualitäts-Gate bestanden (${RESEARCH_CATALOG.length} Recherche, ${AMAZON_VERIFICATION_REGISTER.length} Amazon, ${Object.keys(LIVE_TO_PILOT_MAPPING).length} Live-Pilot-Konsistenzprüfungen)`);
process.exit(fail ? 1 : 0);
