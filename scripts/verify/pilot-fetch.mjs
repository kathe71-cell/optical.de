import { RESEARCH_CATALOG } from '../../src/data/research/catalog-expansion.js';
import fs from 'node:fs';
const ids = process.argv.slice(2);
for (const id of ids) {
  const e = RESEARCH_CATALOG.find(x => x.id === id); if (!e) { console.log('??', id); continue; }
  const res = await fetch(e.source_url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; optical.de-datacheck)', 'Accept-Language': 'de' } });
  const html = await res.text();
  const txt = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  fs.writeFileSync(`scripts/verify/cache/${id}.txt`, txt);
  console.log('\n=====', id, res.status, res.url, txt.length, '| katalog:', e.material, '|', e.dk_t, '|', e.water_content, '|', e.base_curve, '|', e.diameter);
  console.log(txt.slice(0, 500));
  for (const k of ['Dk/t', 'Wassergehalt', 'Material', 'Basiskurve', 'Durchmesser', 'Austausch', 'filcon']) {
    const i = txt.toLowerCase().indexOf(k.toLowerCase()); if (i >= 0) console.log(`[${k}]`, txt.slice(Math.max(0, i - 80), i + 160));
  }
}
