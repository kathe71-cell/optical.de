/**
 * Zentrale Routendefinition für optical.de
 * Single Source of Truth für:
 * - Client-Routing (App.jsx)
 * - Statisches Prerendering (prerender.js)
 * - XML-Sitemap Generierung (sitemap.xml)
 * - Automatisierte QA-Prüfungen
 */

export const STATIC_ROUTES = [
  {
    path: '/',
    title: 'optical.de – Deine Kontaktlinsen. Einfach wiederfinden.',
    description: 'Finde deine gewohnten Kontaktlinsen, vergleiche Produktinformationen und plane deinen nächsten Nachkauf.',
    priority: '1.0',
    indexable: true,
  },
  {
    path: '/vergleichskatalog',
    title: 'Kontaktlinsen finden & vergleichen | optical.de Katalog',
    description: 'Vergleiche technische Spezifikationen marktgängiger Kontaktlinsen (Biofinity, Dailies Total 1, Acuvue uvm.): Dk/t, Basiskurve, Wassergehalt und Preise.',
    priority: '0.9',
    indexable: true,
  },
  {
    path: '/preisrechner',
    title: 'Kontaktlinsen-Kostenrechner pro Tag & Monat | optical.de',
    description: 'Berechne deine tatsächlichen Kontaktlinsenkosten pro Tragetag, Monat und Jahr. Transparente Modellrechnung für Monats- und Tageslinsen.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/eigenmarken-decoder',
    title: 'Optiker-Eigenmarken-Decoder | optical.de',
    description: 'Finde heraus, welches Markenprodukt hinter deiner Apollo iWear, Fielmann ActiMed oder Mister Spex Linse steckt. Transparenter Parameter-Abgleich.',
    priority: '0.9',
    indexable: true,
  },
  {
    path: '/meine-linsen',
    title: 'Meine gemerkten Kontaktlinsen | optical.de',
    description: 'Ihre lokal gespeicherten Kontaktlinsen für den schnellen und unkomplizierten Nachkauf. Ohne Login, direkt im Browser gespeichert.',
    priority: '0.0',
    indexable: false,
    robots: 'noindex, follow',
  },
  {
    path: '/apollo-iwear-oxygen',
    title: 'iWear oxygen (Apollo-Optik) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von iWear oxygen im Vergleich: Spezifikationsabgleich mit Biofinity (CooperVision). Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/fielmann-actimed',
    title: 'ActiMed (Fielmann) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von ActiMed im Vergleich: Spezifikationsabgleich mit Biofinity (CooperVision). Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/fielmann-atmo',
    title: 'Atmo (Fielmann) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von Atmo im Vergleich: Spezifikationsabgleich mit Air Optix Plus HydraGlyde (Alcon). Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/mister-spex-true-day',
    title: 'True Day (Mister Spex) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von True Day im Vergleich: Spezifikationsabgleich mit Dailies AquaComfort Plus (Alcon). Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/specsavers-easyvision-opteyes',
    title: 'easyvision opteyes (Specsavers) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von easyvision opteyes im Vergleich: Spezifikationsabgleich mit Bausch + Lomb Ultra. Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/apollo-iwear-harmony',
    title: 'iWear harmony (Apollo-Optik) – Technischer Abgleich | optical.de',
    description: 'Technische Daten von iWear harmony im Vergleich: Spezifikationsabgleich mit Proclear Sphere (CooperVision). Verifizierte Parameter & Preisvergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/tageslinsen-vergleich',
    title: 'Tageslinsen im Vergleich | optical.de',
    description: 'Tageslinsen: Maximale Hygiene und Flexibilität ohne Pflegeaufwand. Dk/t, Wassergehalt und Preise vergleichen.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/monatslinsen-vergleich',
    title: 'Monatslinsen im Vergleich | optical.de',
    description: 'Monatslinsen: Die wirtschaftlichste Lösung für regelmäßige Kontaktlinsenträger. Silikon-Hydrogel-Materialien im Vergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/torische-kontaktlinsen',
    title: 'Torische Kontaktlinsen bei Hornhautverkrümmung | optical.de',
    description: 'Torische Linsen bei Astigmatismus: Zylinder, Achse und Stabilisationsdesigns führender Hersteller im Vergleich.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/multifokale-kontaktlinsen',
    title: 'Multifokale Kontaktlinsen bei Alterssichtigkeit | optical.de',
    description: 'Gleitsicht-Kontaktlinsen bei Presbyopie: Nah-, Zwischen- und Fernbereich stufenlos im Blick.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/kontaktlinsen-preisvergleich',
    title: 'Kontaktlinsen Preisvergleich & Marktübersicht | optical.de',
    description: 'Preise, Packungsgrößen und Spezifikationen marktgängiger Kontaktlinsen unabhängig vergleichen.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/biofinity',
    title: 'Biofinity – Spezifikationen & Preisvergleich | optical.de',
    description: 'Biofinity von CooperVision: Verifizierte Spezifikationen (Dk/t 160, Comfilcon A), Packungsgröße 6 Stück und Angebote zum Nachkauf.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/biofinity-vs-air-optix',
    title: 'Biofinity vs. Air Optix HydraGlyde im Vergleich | optical.de',
    description: 'Direkter 1:1 Parametervergleich zwischen CooperVision Biofinity und Alcon Air Optix Plus HydraGlyde: Dk/t, Wassergehalt, Material und Preise.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/vergleich',
    title: 'Kontaktlinsen Direktvergleich | optical.de',
    description: 'Vergleiche Spezifikationen, Preise und Materialien von Kontaktlinsen direkt miteinander.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/ratgeber/kontaktlinsen-anpassen',
    title: 'Kontaktlinsen anpassen: Ablauf & Parameter | optical.de',
    description: 'Warum Brillenwerte nicht für Linsen reichen: Alles zu Basiskurve (BC), Durchmesser (DIA), Dioptrien-Umrechnung und Ablauf beim Optiker.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/ratgeber/astigmatismus-kontaktlinsen',
    title: 'Kontaktlinsen bei Astigmatismus | optical.de',
    description: 'Ratgeber zu torischen Kontaktlinsen: Zylinder, Achse und Stabilisationsdesigns richtig verstehen.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/ratgeber/tageslinsen-vs-monatslinsen-kosten',
    title: 'Tageslinsen vs. Monatslinsen Kostenvergleich | optical.de',
    description: 'Was ist günstiger? Ein detaillierter Kostenvergleich zwischen Tages- und Monatslinsen inkl. Pflegemittel.',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/ratgeber/kontaktlinsen-pflegemittel-vergleich',
    title: 'Kontaktlinsen-Pflegemittel Vergleich | optical.de',
    description: 'Peroxid vs. All-in-One: Welches Pflegemittel ist das beste für Ihre Kontaktlinsen?',
    priority: '0.8',
    indexable: true,
  },
  {
    path: '/transparenz',
    title: 'Transparenzstandard & Datenethik | optical.de',
    description: 'Wie optical.de Daten erfasst, verifiziert und zuordnet. Konfidenz-Klassen, Unabhängigkeit, Ausschluss von Testsiegeln und Schutz vor Fehlinformationen.',
    priority: '0.7',
    indexable: true,
  },
  {
    path: '/impressum',
    title: 'Impressum | optical.de',
    description: 'Impressum und rechtliche Anbieterkennzeichnung von optical.de gemäß § 5 DDG und § 18 MStV.',
    priority: '0.5',
    indexable: true,
  },
  {
    path: '/datenschutz',
    title: 'Datenschutzerklärung | optical.de',
    description: 'Datenschutzerklärung von optical.de: DSGVO-konforme Datenverarbeitung ohne Profiling, ohne externe Google CDN Fonts und mit 100% lokalem Merkzettel.',
    priority: '0.5',
    indexable: true,
  },
  // Nicht indexierbare Utility- & Systemrouten
  {
    path: '/rechner-embed',
    title: 'Kontaktlinsen-Rechner Widget | optical.de',
    description: 'Kostenloses Embed-Widget für den Kontaktlinsen-Kostenrechner.',
    priority: '0.0',
    indexable: false,
    robots: 'noindex, follow',
  },
  {
    path: '/404',
    title: '404 – Seite nicht gefunden | optical.de',
    description: 'Die angeforderte Seite existiert leider nicht auf optical.de. Nutzen Sie unsere Suche oder das Inhaltsverzeichnis.',
    priority: '0.0',
    indexable: false,
    robots: 'noindex, follow',
  },
];

/**
 * Gibt das vollständige Routenverzeichnis zurück, inklusive dynamisch
 * generierter Produktseiten aus dem Produktkatalog.
 * 
 * @param {Array} products - Optionaler Produktkatalog
 * @returns {Object} Map von Pfaden zu Metadaten
 */
export function getAllRoutes(products = []) {
  const routes = {};

  for (const route of STATIC_ROUTES) {
    routes[route.path] = {
      title: route.title,
      description: route.description,
      priority: route.priority,
      indexable: route.indexable,
      robots: route.robots || 'index, follow',
    };
  }

  // Dynamische Produktrouten hinzufügen
  for (const p of products) {
    if (p.id !== 'biofinity') {
      let base = p.product_name
        .replace(' mit HydraLuxe', '')
        .replace(' Daily Disposable', '')
        .replace(' Plus Toric', ' Toric')
        .replace(' for Astigmatism', ' Toric')
        .replace(' mit HydraGlyde', '')
        .replace(' All-in-One', '')
        .replace(' Multi-Purpose Solution', '')
        .replace(' Pflegebehaelter-Set', '')
        .replace(' Augentropfen', '');
      let title = `${base} – Preis & Daten | optical.de`;
      if (title.length > 60) {
        title = `${base} | optical.de`;
      }

      routes[`/produkt/${p.id}`] = {
        title,
        description: `Spezifikationen, Dk/t-Wert und Preisübersicht für ${p.product_name} von ${p.manufacturer}. Unabhängiger Nachkauf-Vergleich.`,
        priority: '0.8',
        indexable: true,
        robots: 'index, follow',
      };
    }
  }

  return routes;
}
