import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const ROUTES = {
  '/': {
    title: 'optical.de – Deine Kontaktlinsen. Einfach wiederfinden.',
    description: 'Finde deine gewohnten Kontaktlinsen, prüfe verfügbare Angebote und merke sie dir für deinen nächsten Kauf. Unabhängig, werbefrei & ohne erfundene Siegel.',
  },
  '/vergleichskatalog': {
    title: 'Kontaktlinsen finden & vergleichen | optical.de Katalog',
    description: 'Vergleiche technische Spezifikationen marktgängiger Kontaktlinsen (Biofinity, Dailies Total 1, Acuvue uvm.): Dk/t, Basiskurve, Wassergehalt und Preise.',
  },
  '/preisrechner': {
    title: 'Kontaktlinsen-Kostenrechner: Was kosten Linsen wirklich? | optical.de',
    description: 'Berechne deine tatsächlichen Kontaktlinsenkosten pro Tragetag, Monat und Jahr. Transparente Modellrechnung für Monats- und Tageslinsen.',
  },
  '/eigenmarken-decoder': {
    title: 'Optiker-Eigenmarken-Decoder | optical.de',
    description: 'Finde heraus, welches Markenprodukt hinter deiner Apollo iWear, Fielmann ActiMed oder Mister Spex Linse steckt. Transparenter Parameter-Abgleich.',
  },
  '/meine-linsen': {
    title: 'Meine gemerkten Kontaktlinsen | optical.de',
    description: 'Ihre lokal gespeicherten Kontaktlinsen für den schnellen und unkomplizierten Nachkauf. Ohne Login, direkt im Browser gespeichert.',
  },
  '/apollo-iwear-oxygen': {
    title: 'iWear oxygen (Apollo-Optik) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter iWear oxygen? Baugleich mit Biofinity (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/fielmann-actimed': {
    title: 'ActiMed (Fielmann) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter ActiMed? Baugleich mit Biomedics 55 Evolution (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/fielmann-atmo': {
    title: 'Atmo (Fielmann) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter Atmo? Baugleich mit Biofinity (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/mister-spex-true-day': {
    title: 'True Day (Mister Spex) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter True Day? Baugleich mit Live Daily disposable (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/specsavers-easyvision-opteyes': {
    title: 'easyvision opteyes (Specsavers) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter easyvision opteyes? Baugleich mit Biofinity (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/apollo-iwear-harmony': {
    title: 'iWear harmony (Apollo-Optik) – Original-Linse | optical.de',
    description: 'Welches Markenprodukt steckt hinter iWear harmony? Baugleich mit MyDay (CooperVision). Verifizierte Parameter & Preisvergleich.',
  },
  '/tageslinsen-vergleich': {
    title: 'Tageslinsen im Vergleich | optical.de',
    description: 'Tageslinsen: Maximale Hygiene und Flexibilität ohne Pflegeaufwand. Dk/t, Wassergehalt und Preise vergleichen.',
  },
  '/monatslinsen-vergleich': {
    title: 'Monatslinsen im Vergleich | optical.de',
    description: 'Monatslinsen: Die wirtschaftlichste Lösung für regelmäßige Kontaktlinsenträger. Silikon-Hydrogel-Materialien im Vergleich.',
  },
  '/torische-kontaktlinsen': {
    title: 'Torische Kontaktlinsen bei Hornhautverkrümmung | optical.de',
    description: 'Torische Linsen bei Astigmatismus: Zylinder, Achse und Stabilisationsdesigns führender Hersteller im Vergleich.',
  },
  '/multifokale-kontaktlinsen': {
    title: 'Multifokale Kontaktlinsen bei Alterssichtigkeit | optical.de',
    description: 'Gleitsicht-Kontaktlinsen bei Presbyopie: Nah-, Zwischen- und Fernbereich stufenlos im Blick.',
  },
  '/kontaktlinsen-preisvergleich': {
    title: 'Kontaktlinsen Preisvergleich & Marktübersicht | optical.de',
    description: 'Preise, Packungsgrößen und Spezifikationen marktgängiger Kontaktlinsen unabhängig vergleichen.',
  },
  '/biofinity': {
    title: 'Biofinity – Spezifikationen & Preisvergleich | optical.de',
    description: 'Biofinity von CooperVision: Verifizierte Spezifikationen (Dk/t 160, Comfilcon A), Packungsgröße 6 Stück und Angebote zum Nachkauf.',
  },
  '/biofinity-vs-air-optix': {
    title: 'Biofinity vs. Air Optix Plus HydraGlyde im Vergleich | optical.de',
    description: 'Direkter 1:1 Parametervergleich zwischen CooperVision Biofinity und Alcon Air Optix Plus HydraGlyde: Dk/t, Wassergehalt, Material und Preise.',
  },
  '/rechner-embed': {
    title: 'Kontaktlinsen-Rechner Widget | optical.de',
    description: 'Kostenloses Embed-Widget für den Kontaktlinsen-Kostenrechner.',
  },
  '/impressum': {
    title: 'Impressum | optical.de',
    description: 'Impressum und rechtliche Anbieterkennzeichnung von optical.de gemäß § 5 DDG und § 18 MStV.',
  },
  '/datenschutz': {
    title: 'Datenschutzerklärung | optical.de',
    description: 'Datenschutzerklärung von optical.de: DSGVO-konforme Datenverarbeitung ohne Profiling, ohne externe Google CDN Fonts und mit 100% lokalem Merkzettel.',
  },
};

console.log(`Starting prerendering of ${Object.keys(ROUTES).length} routes...`);

for (const [url, meta] of Object.entries(ROUTES)) {
  const appHtml = render(url);

  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Update Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.title}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${meta.title}" />`);

  // Update Description
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.description}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  // Update Canonical & OG URL
  const canonicalUrl = `https://www.optical.de${url === '/' ? '/' : url}`;
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  const filePath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`;
  const dir = path.dirname(toAbsolute(filePath));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(toAbsolute(filePath), html);
  console.log(`  ✓ ${url} -> ${filePath} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log('Static Site Prerendering complete!');
