/**
 * optical.de - Eigenmarken & Handelsmarken Zuordnungs-Datenbank
 * 
 * Datenstand: 09.09.2026
 * 
 * Transparenz- und Rechtsgrundsätze (§ 5 & § 6 UWG):
 * 1. Keine Behauptung pauschaler Identität ("100% baugleich").
 * 2. Transparente Zuordnung anhand von 5 Konfidenz-Klassen:
 *    - Bestätigte Zuordnung (nur bei vorliegender Hersteller-/OEM-Bestätigung)
 *    - Hohe Übereinstimmung (alle Kernparameter stimmen nach Datenblatt überein)
 *    - Wahrscheinliche Übereinstimmung (Kernmerkmale stimmen überein)
 *    - Mögliche Übereinstimmung (teilweise Übereinstimmung)
 *    - Keine ausreichende Datengrundlage
 * 3. Nachvollziehbare Herleitung der Übereinstimmungsmerkmale.
 * 4. Exakte Gegenüberstellung gleicher Bezugsgrößen (Packungsgröße & Stückzahl).
 * 5. Rechtliche Klarstellung zu Filialpreisen: optical.de trifft keine Preisfeststellungen
 *    für stationäre Filialen. Der Nutzer kann im Rechner seinen tatsächlich bezahlten Filialpreis
 *    eingeben, sodass die Ersparnisberechnung eine individuelle Modellrechnung darstellt.
 */

export const EIGENMARKEN_DATABASE = [
  {
    id: 'apollo-iwear-oxygen',
    slug: 'apollo-iwear-oxygen',
    optician_private_label: 'Apollo iWear Oxygen',
    optician_chain: 'Apollo Optik',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    matched_brand_product_id: 'biofinity',
    brand_pack_size: '6er Packung (6 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Öffentlich zugängliche Packungsangaben & Herstellerkatalog',
    source_name: 'Apollo Filialangaben & CooperVision Spezifikation',
    mapping_source: 'Vergleich der deklarierten Materialbezeichnung (Comfilcon A), Wassergehalt und Geometrie',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit CooperVision Biofinity.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material', private_label_value: 'Comfilcon A (Silikon-Hydrogel)', brand_value: 'Comfilcon A (Silikon-Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '48 %', brand_value: '48 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '160', brand_value: '160', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.6 mm', brand_value: '8.6 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.0 mm', brand_value: '14.0 mm', match: true },
      { parameter: 'Lieferbereich (SPH)', private_label_value: '+8.00 bis -12.00 dpt', brand_value: '+8.00 bis -12.00 dpt', match: true }
    ],
    notes: 'Beide Produkte weisen denselben USAN-Materialnamen (Comfilcon A) und identische Basiskurven- und Durchmesserwerte auf.'
  },
  {
    id: 'fielmann-actimed',
    slug: 'fielmann-actimed',
    optician_private_label: 'Fielmann ActiMed Monatslinse',
    optician_chain: 'Fielmann',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    matched_brand_product_id: 'biofinity',
    brand_pack_size: '6er Packung (6 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Produktverpackung & Herstellerkatalog',
    source_name: 'Fielmann Verpackungsangaben & CooperVision Spezifikation',
    mapping_source: 'Materialbezeichnung Comfilcon A & identische Geometrieangaben',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit CooperVision Biofinity.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material', private_label_value: 'Comfilcon A (Silikon-Hydrogel)', brand_value: 'Comfilcon A (Silikon-Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '48 %', brand_value: '48 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '160', brand_value: '160', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.6 mm', brand_value: '8.6 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.0 mm', brand_value: '14.0 mm', match: true }
    ],
    notes: 'Übereinstimmung bei Linsenmaterial Comfilcon A, Dk/t 160 und Geometriedaten.'
  },
  {
    id: 'fielmann-atmo',
    slug: 'fielmann-atmo',
    optician_private_label: 'Fielmann Atmo Monatslinse',
    optician_chain: 'Fielmann',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    matched_brand_product_id: 'airoptix-hydraglyde',
    brand_pack_size: '6er Packung (6 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Produktverpackung & Alcon Spezifikation',
    source_name: 'Fielmann Umverpackung & Alcon Vision Care Datenblatt',
    mapping_source: 'Materialkennzeichnung Lotrafilcon B auf der Verpackung',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Alcon Air Optix Plus HydraGlyde.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material', private_label_value: 'Lotrafilcon B (Silikon-Hydrogel)', brand_value: 'Lotrafilcon B (Silikon-Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '33 %', brand_value: '33 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '138', brand_value: '138', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.6 mm', brand_value: '8.6 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.2 mm', brand_value: '14.2 mm', match: true }
    ],
    notes: 'Lotrafilcon B ist ein patentiertes Silikon-Hydrogel-Material von Alcon.'
  },
  {
    id: 'mister-spex-true-day',
    slug: 'mister-spex-true-day',
    optician_private_label: 'Mister Spex True Day',
    optician_chain: 'Mister Spex',
    optician_pack_size: '30er Packung (30 Linsen)',
    optician_pack_count: 30,
    matched_brand_product_id: 'dailies-aquacomfort',
    brand_pack_size: '30er Packung (30 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Produktdeklaration & Herstellerdatenblatt',
    source_name: 'Mister Spex Produktdetailseite & Alcon Vision Care Datenblatt',
    mapping_source: 'Deklariertes Material Nelfilcon A und optische Parameter',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Alcon Dailies AquaComfort Plus.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Tageslinse', brand_value: 'Tageslinse', match: true },
      { parameter: 'Material', private_label_value: 'Nelfilcon A (Hydrogel)', brand_value: 'Nelfilcon A (Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '69 %', brand_value: '69 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '26', brand_value: '26', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.7 mm', brand_value: '8.7 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.0 mm', brand_value: '14.0 mm', match: true }
    ],
    notes: 'Nelfilcon A ist das typische Material der Dailies AquaComfort Plus Reihe von Alcon.'
  },
  {
    id: 'specsavers-easyvision-opteyes',
    slug: 'specsavers-easyvision-opteyes',
    optician_private_label: 'Specsavers Easyvision Opteyes',
    optician_chain: 'Specsavers / Pearle',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    matched_brand_product_id: 'bausch-ultra',
    brand_pack_size: '6er Packung (6 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Hersteller- und Packungsdeklaration',
    source_name: 'Specsavers Produktangaben & Bausch + Lomb Ultra Spezifikation',
    mapping_source: 'Materialdeklaration Samfilcon A und Dk/t-Wert 163',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Bausch + Lomb ULTRA.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material', private_label_value: 'Samfilcon A (Silikon-Hydrogel)', brand_value: 'Samfilcon A (Silikon-Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '46 %', brand_value: '46 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '163', brand_value: '163', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.5 mm', brand_value: '8.5 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.2 mm', brand_value: '14.2 mm', match: true }
    ],
    notes: 'Samfilcon A mit MoistureSeal® Technologie wird von Bausch + Lomb produziert.'
  },
  {
    id: 'apollo-iwear-harmony',
    slug: 'apollo-iwear-harmony',
    optician_private_label: 'Apollo iWear Harmony',
    optician_chain: 'Apollo Optik',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    matched_brand_product_id: 'proclear-sphere',
    brand_pack_size: '6er Packung (6 Linsen)',
    classification: 'hohe_uebereinstimmung',
    classification_label: 'Hohe Übereinstimmung',
    last_verified: '09.09.2026',
    source_type: 'Filialdeklaration & CooperVision Spezifikation',
    source_name: 'Apollo Verpackungskennzeichnung & CooperVision Katalog',
    mapping_source: 'Materialdeklaration Omafilcon B und biokompatible Zusammensetzung',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit CooperVision Proclear Sphere.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine eindeutige Hersteller-/OEM-Identität kann anhand dieser Angaben allein jedoch nicht garantiert werden.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material', private_label_value: 'Omafilcon B (Hydrogel)', brand_value: 'Omafilcon B (Hydrogel)', match: true },
      { parameter: 'Wassergehalt', private_label_value: '62 %', brand_value: '62 %', match: true },
      { parameter: 'Sauerstofftransmissibilität (Dk/t)', private_label_value: '42', brand_value: '42', match: true },
      { parameter: 'Basiskurve (BC)', private_label_value: '8.6 mm', brand_value: '8.6 mm', match: true },
      { parameter: 'Durchmesser (DIA)', private_label_value: '14.2 mm', brand_value: '14.2 mm', match: true }
    ],
    notes: 'Omafilcon B ist ein biokompatibles Hydrogel-Material von CooperVision.'
  }
];

export const searchEigenmarken = (query) => {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();
  return EIGENMARKEN_DATABASE.filter((item) => {
    return (
      item.optician_private_label.toLowerCase().includes(q) ||
      item.optician_chain.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q)
    );
  });
};

export const getEigenmarkeBySlug = (slug) => {
  return EIGENMARKEN_DATABASE.find((item) => item.slug === slug);
};

/**
 * Dynamische Berechnung der Einzellinsen- und Tageskosten auf Basis des vom Nutzer eingegebenen Filialpreises.
 * Wird kein gültiger Preis übergeben, gibt die Funktion strikt null zurück (100 % nutzerbasierte Kalkulation).
 */
export const calculateOpticianCosts = (entry, customPrice = null) => {
  if (!entry) return null;
  const parsed = parseFloat(String(customPrice).replace(',', '.'));
  if (isNaN(parsed) || parsed <= 0) {
    return null;
  }

  const numPrice = parsed;
  const isMonthly = entry.matched_parameters.some(p => p.parameter === 'Linsentyp' && p.private_label_value.toLowerCase().includes('monat'));
  const isDaily = entry.matched_parameters.some(p => p.parameter === 'Linsentyp' && p.private_label_value.toLowerCase().includes('tag'));
  const packCount = entry.optician_pack_count || 6;
  const pricePerLensNum = numPrice / packCount;

  if (isMonthly) {
    const costPerMonthNum = numPrice / (packCount / 2);
    const costPerDayNum = costPerMonthNum / 30;
    return {
      price: numPrice,
      price_per_lens: `${pricePerLensNum.toFixed(2).replace('.', ',')} €`,
      cost_per_month: `${costPerMonthNum.toFixed(2).replace('.', ',')} €`,
      cost_per_day: `${costPerDayNum.toFixed(2).replace('.', ',')} €`,
      is_custom: true
    };
  }

  if (isDaily) {
    const costPerDayNum = (numPrice / packCount) * 2;
    const costPerMonthNum = costPerDayNum * 30;
    return {
      price: numPrice,
      price_per_lens: `${pricePerLensNum.toFixed(2).replace('.', ',')} €`,
      cost_per_month: `${costPerMonthNum.toFixed(2).replace('.', ',')} €`,
      cost_per_day: `${costPerDayNum.toFixed(2).replace('.', ',')} €`,
      is_custom: true
    };
  }

  return {
    price: numPrice,
    price_per_lens: `${pricePerLensNum.toFixed(2).replace('.', ',')} €`,
    cost_per_month: '–',
    cost_per_day: '–',
    is_custom: true
  };
};
