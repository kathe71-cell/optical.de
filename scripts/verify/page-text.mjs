// Ruft eine Seite einmalig ab, speichert Text und gibt Attribut-Fundstellen aus. Usage: node page-text.mjs <name> <url>
import fs from 'node:fs';
const [name, url] = process.argv.slice(2);
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; optical.de-datacheck)', 'Accept-Language': 'de' } });
const html = await res.text();
const txt = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;/g, ' ').replace(/\s+/g, ' ');
fs.writeFileSync(`scripts/verify/cache/${name}.txt`, txt); fs.writeFileSync(`scripts/verify/cache/${name}.html`, html);
console.log('\n=====', name, res.status, res.url, txt.length);
console.log(txt.slice(0, 160));
const m = txt.match(/(Kontaktlinseneigenschaften|Parameter|Technische Daten|Produktdaten)[\s\S]{0,900}/i); if (m) console.log('[SPEC]', m[0]);
console.log('[PDF]', [...html.matchAll(/href="([^"]+\.pdf[^"]*)"/gi)].map(x => x[1]).slice(0, 4));
