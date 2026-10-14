import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCTS } from './src/data/products.js';
import { EIGENMARKEN_DATABASE } from './src/data/eigenmarken.js';
import { getAllRoutes } from './src/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const ROUTES = getAllRoutes(PRODUCTS);

function getRouteBreadcrumbSchema(url) {
  if (url === '/' || url === '/404' || url === '/rechner-embed') return null;

  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": "https://www.optical.de/"
    }
  ];

  if (url === '/vergleichskatalog') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Katalog",
      "item": "https://www.optical.de/vergleichskatalog"
    });
  } else if (url.startsWith('/produkt/')) {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Katalog",
      "item": "https://www.optical.de/vergleichskatalog"
    });
    const id = url.replace('/produkt/', '');
    const prod = PRODUCTS.find(p => p.id === id);
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": prod ? prod.product_name : id,
      "item": `https://www.optical.de${url}`
    });
  } else if (url === '/biofinity') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Katalog",
      "item": "https://www.optical.de/vergleichskatalog"
    });
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": "CooperVision Biofinity",
      "item": "https://www.optical.de/biofinity"
    });
  } else if (url.startsWith('/ratgeber/')) {
    const guideTitles = {
      '/ratgeber/kontaktlinsen-anpassen': 'Kontaktlinsen anpassen',
      '/ratgeber/astigmatismus-kontaktlinsen': 'Astigmatismus & torische Linsen',
      '/ratgeber/tageslinsen-vs-monatslinsen-kosten': 'Tageslinsen vs. Monatslinsen Kosten',
      '/ratgeber/kontaktlinsen-pflegemittel-vergleich': 'Kontaktlinsen-Pflegemittel'
    };
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": guideTitles[url] || 'Ratgeber',
      "item": `https://www.optical.de${url}`
    });
  } else if (url === '/eigenmarken-decoder') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Eigenmarken-Decoder",
      "item": "https://www.optical.de/eigenmarken-decoder"
    });
  } else if (['/apollo-iwear-oxygen', '/fielmann-actimed', '/fielmann-atmo', '/mister-spex-true-day', '/specsavers-easyvision-opteyes', '/apollo-iwear-harmony'].includes(url)) {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Eigenmarken-Decoder",
      "item": "https://www.optical.de/eigenmarken-decoder"
    });
    const em = EIGENMARKEN_DATABASE.find(e => '/' + e.slug === url);
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": em ? em.optician_private_label : url.replace('/', ''),
      "item": `https://www.optical.de${url}`
    });
  } else if (url === '/preisrechner') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Kostenrechner",
      "item": "https://www.optical.de/preisrechner"
    });
  } else if (url === '/meine-linsen') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Meine Linsen",
      "item": "https://www.optical.de/meine-linsen"
    });
  } else if (url === '/vergleich' || url === '/biofinity-vs-air-optix') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Katalog",
      "item": "https://www.optical.de/vergleichskatalog"
    });
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": url === '/biofinity-vs-air-optix' ? 'Biofinity vs. Air Optix' : 'Produktvergleich',
      "item": `https://www.optical.de${url}`
    });
  } else if (url === '/transparenz') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Transparenz-Standard",
      "item": "https://www.optical.de/transparenz"
    });
  } else if (url === '/impressum') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Impressum",
      "item": "https://www.optical.de/impressum"
    });
  } else if (url === '/datenschutz') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Datenschutz",
      "item": "https://www.optical.de/datenschutz"
    });
  } else if (['/tageslinsen-vergleich', '/monatslinsen-vergleich', '/torische-kontaktlinsen', '/multifokale-kontaktlinsen', '/kontaktlinsen-preisvergleich'].includes(url)) {
    const catTitles = {
      '/tageslinsen-vergleich': 'Tageslinsen im Vergleich',
      '/monatslinsen-vergleich': 'Monatslinsen im Vergleich',
      '/torische-kontaktlinsen': 'Torische Kontaktlinsen',
      '/multifokale-kontaktlinsen': 'Multifokale Kontaktlinsen',
      '/kontaktlinsen-preisvergleich': 'Kontaktlinsen Preisvergleich'
    };
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": catTitles[url] || 'Kategorie',
      "item": `https://www.optical.de${url}`
    });
  } else {
    return null;
  }

  return `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://www.optical.de${url}#breadcrumb",
      "itemListElement": ${JSON.stringify(items, null, 8).trim()}
    }
    </script>
`;
}

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

  // Update Robots
  const robotsValue = meta.robots || 'index, follow';
  html = html.replace(/<meta name="robots" content=".*?" \/>/, `<meta name="robots" content="${robotsValue}" />`);

  // Update Canonical & OG URL (stets kanonisch https://www.optical.de)
  const canonicalUrl = `https://www.optical.de${url === '/' ? '/' : url}`;
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);

  // F12: Route-spezifisches BreadcrumbList-Markup injizieren
  const breadcrumbSchema = getRouteBreadcrumbSchema(url);
  if (breadcrumbSchema) {
    html = html.replace('</head>', `${breadcrumbSchema}\n  </head>`);
  }

  // Route-spezifische strukturierte FAQ-Daten (ausschließlich auf Routen mit sichtbaren FAQs)
  if (url === '/ratgeber/kontaktlinsen-pflegemittel-vergleich') {
    const pflegeFaqSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://www.optical.de/ratgeber/kontaktlinsen-pflegemittel-vergleich#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Kann ich Leitungswasser zum Spülen verwenden?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nein, niemals. Leitungswasser enthält Keime wie Acanthamoeba, die zu schweren Hornhautinfektionen führen können. Immer sterile Kochsalzlösung oder die empfohlene Pflegeflüssigkeit verwenden."
          }
        },
        {
          "@type": "Question",
          "name": "Wie oft muss ich den Linsenbehälter wechseln?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Den Behälter spätestens alle 3 Monate wechseln. Nach dem Ablegen der Linsen den Behälter mit frischer Lösung spülen, nie mit Wasser, und offen trocknen lassen."
          }
        },
        {
          "@type": "Question",
          "name": "Was tun wenn die Linsen im Pflegemittel brennen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ein Brennen kann auf eine Unverträglichkeit mit dem Pflegemittel hinweisen. Probiere ein Produkt ohne Konservierungsstoffe oder wechsle zu einem H2O2-System. Bei anhaltendem Brennen Augenarzt aufsuchen."
          }
        }
      ]
    }
    </script>
`;
    html = html.replace('</head>', `${pflegeFaqSchema}\n  </head>`);
  }

  const filePath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`;
  const dir = path.dirname(toAbsolute(filePath));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(toAbsolute(filePath), html);
  if (url === '/404') {
    fs.writeFileSync(toAbsolute('dist/404.html'), html);
  }
  console.log(`  ✓ ${url} -> ${filePath} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log('Generating sitemap.xml...');
const today = new Date().toISOString().split('T')[0];
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

for (const [url, meta] of Object.entries(ROUTES)) {
  // Nicht indexierbare Routen (z. B. 404, Rechner-Embed) ausschließen
  if (meta.indexable === false) continue;
  if (meta.robots && meta.robots.includes('noindex')) continue;
  
  const fullUrl = `https://www.optical.de${url === '/' ? '/' : url}`;
  const priority = meta.priority || '0.8';
  
  sitemapXml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

sitemapXml += `
</urlset>`;
fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemapXml);
fs.writeFileSync(toAbsolute('public/sitemap.xml'), sitemapXml);
console.log('sitemap.xml generated.');

console.log('Static Site Prerendering complete!');
