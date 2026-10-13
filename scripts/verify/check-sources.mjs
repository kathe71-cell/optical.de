// Ruft die Quellen-URLs der Recherche höflich ab (1 GET, sequenziell, Pause) und protokolliert
// Erreichbarkeit + Namensnennung. Keine Umgehung von Zugriffsschutz; Blocker werden dokumentiert.
import { RESEARCH_CATALOG } from '../../src/data/research/catalog-expansion.js';
import fs from 'node:fs';
const out = [];
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9äöüß]+/g, ' ');
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const e of RESEARCH_CATALOG) {
  const r = { id: e.id, source_url: e.source_url, http_status: null, final_url: null, reachable: false, brand_mentioned: false, family_mentioned: false, blocker: null, checked_at: new Date().toISOString().slice(0, 10) };
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 15000);
    const res = await fetch(e.source_url, { redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; optical.de-datacheck; manual-rate-limited)', 'Accept-Language': 'de' } });
    clearTimeout(t);
    r.http_status = res.status; r.final_url = res.url;
    const txt = norm((await res.text()).slice(0, 600000));
    r.reachable = res.status >= 200 && res.status < 300;
    r.brand_mentioned = txt.includes(norm(e.brand).trim());
    r.family_mentioned = txt.includes(norm(e.product_family).trim());
    if (!r.reachable) r.blocker = 'HTTP ' + res.status;
  } catch (err) { r.blocker = String(err.cause?.code || err.name || err.message); }
  out.push(r);
  await sleep(700);
}
fs.writeFileSync('scripts/verify/source-check-results.json', JSON.stringify(out, null, 1));
const c = k => out.filter(k).length;
console.log({ total: out.length, reachable: c(r => r.reachable), family: c(r => r.reachable && r.family_mentioned), brand: c(r => r.reachable && r.brand_mentioned) });
