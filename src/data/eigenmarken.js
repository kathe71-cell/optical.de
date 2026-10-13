/**
 * optical.de - Eigenmarken & Handelsmarken Zuordnungs-Datenbank
 * 
 * Datenstand: 09.09.2026
 * 
 * Transparenz- und Rechtsgrundsätze (§ 5 & § 6 UWG):
 * 1. Keine Behauptung pauschaler Identität ("100% baugleich").
 * 2. Transparente Zuordnung anhand von 4 verbindlichen Konfidenz-Klassen:
 *    - A. VERIFIED IDENTICAL (nur bei vorliegender und dokumentierter OEM-/Herstellerbestätigung)
 *    - B. HIGH-CONFIDENCE MATCH (Material/USAN, Wassergehalt, Dk/t und Geometrie stimmen nach Spezifikation überein)
 *    - C. RELATED / SAME MATERIAL FAMILY (gleiche Materialfamilie oder Linsenklasse, aber Geometrie- oder Fertigungsunterschiede)
 *    - D. UNVERIFIED (unzureichende Datenbasis, keine belastbare Zuordnung)
 * 3. Nachvollziehbare Herleitung der Übereinstimmungsmerkmale mit Primärquellen.
 * 4. Exakte Gegenüberstellung gleicher Bezugsgrößen (Packungsgröße & Stückzahl).
 * 5. Rechtliche Klarstellung zu Filialpreisen: optical.de trifft keine Preisfeststellungen
 *    für stationäre Filialen. Der Nutzer kann im Rechner seinen tatsächlich bezahlten Filialpreis
 *    eingeben, sodass die Ersparnisberechnung eine individuelle Modellrechnung darstellt.
 * 6. Medizinischer Pflicht-Hinweis: Auch bei hoher technischer Übereinstimmung empfiehlt
 *    optical.de keinen eigenmächtigen Wechsel ohne vorherige fachliche Anpassung.
 */

export const EIGENMARKEN_DATABASE = [
  {
    id: 'apollo-iwear-oxygen',
    slug: 'apollo-iwear-oxygen',
    private_label: 'Apollo iWear Oxygen',
    optician_private_label: 'Apollo iWear Oxygen',
    optician_chain: 'Apollo Optik',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    suspected_original_id: 'biofinity',
    matched_brand_product_id: 'biofinity',
    brand_pack_size: '6er Packung (6 Linsen)',
    material: 'Comfilcon A (Silikon-Hydrogel)',
    base_curve: '8.6 mm',
    diameter: '14.0 mm',
    dk_t: 160,
    design: 'Sphärisch (Aquaform® Technologie)',
    replacement_schedule: '30 Tage (Monatslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Übereinstimmender USAN-Materialname (Comfilcon A), Wassergehalt 48 %, identische Sauerstofftransmissibilität (Dk/t 160), Basiskurve 8.6 mm und Durchmesser 14.0 mm. Da keine öffentlich publizierte OEM-Vertragsbestätigung vorliegt, erfolgt die Einordnung vorsichtig als High-Confidence Match.',
    source_1: 'Öffentlich zugängliche Blister- und Verpackungsangaben Apollo Optik',
    source_2: 'CooperVision Inc. Produktspezifikationen Comfilcon A / Biofinity',
    source_type: 'Packungsangaben & Hersteller-Datenblatt',
    source_name: 'Apollo Verpackungsdeklaration & CooperVision Spezifikation',
    mapping_source: 'Parameter-Gegenüberstellung: Comfilcon A, 48 % H2O, Dk/t 160, BC 8.6, DIA 14.0',
    last_verified: '09.09.2026',
    technical_statement: 'Die deklarierten technischen Parameter zeigen eine sehr hohe Übereinstimmung mit CooperVision Biofinity.',
    derivation_evaluation: 'Hohe technische Übereinstimmung bei Material, Wassergehalt und Geometrie. optical.de empfiehlt auch bei Übereinstimmung keinen eigenmächtigen Wechsel ohne augenoptische Anpassung.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Comfilcon A (Silikon-Hydrogel)', brand_value: 'Comfilcon A (Silikon-Hydrogel)', match: true },
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
    private_label: 'Fielmann ActiMed Monatslinse',
    optician_private_label: 'Fielmann ActiMed Monatslinse',
    optician_chain: 'Fielmann',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    suspected_original_id: 'biofinity',
    matched_brand_product_id: 'biofinity',
    brand_pack_size: '6er Packung (6 Linsen)',
    material: 'Comfilcon A (Silikon-Hydrogel)',
    base_curve: '8.6 mm',
    diameter: '14.0 mm',
    dk_t: 160,
    design: 'Sphärisch',
    replacement_schedule: '30 Tage (Monatslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Gleiche Materialkennzeichnung Comfilcon A, identischer Wassergehalt 48 %, identische Geometrie (BC 8.6 mm, DIA 14.0 mm) und Dk/t 160 nach Spezifikation.',
    source_1: 'Fielmann Umverpackungs- und Beipackangaben',
    source_2: 'CooperVision Inc. Produktspezifikationen Comfilcon A',
    source_type: 'Produktverpackung & Herstellerkatalog',
    source_name: 'Fielmann Verpackungsangaben & CooperVision Spezifikation',
    mapping_source: 'Materialbezeichnung Comfilcon A & identische Geometrieangaben',
    last_verified: '09.09.2026',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit CooperVision Biofinity.',
    derivation_evaluation: 'Hohe technische Übereinstimmung. Eine formelle Hersteller-Identität wird nicht behauptet. Ein Wechsel sollte nur nach fachlicher Kontrolle erfolgen.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Comfilcon A (Silikon-Hydrogel)', brand_value: 'Comfilcon A (Silikon-Hydrogel)', match: true },
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
    private_label: 'Fielmann Atmo Monatslinse',
    optician_private_label: 'Fielmann Atmo Monatslinse',
    optician_chain: 'Fielmann',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    suspected_original_id: 'airoptix-hydraglyde',
    matched_brand_product_id: 'airoptix-hydraglyde',
    brand_pack_size: '6er Packung (6 Linsen)',
    material: 'Lotrafilcon B (Silikon-Hydrogel)',
    base_curve: '8.6 mm',
    diameter: '14.2 mm',
    dk_t: 138,
    design: 'Sphärisch',
    replacement_schedule: '30 Tage (Monatslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Materialdeklaration Lotrafilcon B (patentiertes Alcon-Material), Wassergehalt 33 %, Dk/t 138, Basiskurve 8.6 mm und Durchmesser 14.2 mm stimmen überein.',
    source_1: 'Fielmann Umverpackungsdeklaration',
    source_2: 'Alcon Vision Care Datenblatt Lotrafilcon B / Air Optix',
    source_type: 'Produktverpackung & Alcon Spezifikation',
    source_name: 'Fielmann Umverpackung & Alcon Vision Care Datenblatt',
    mapping_source: 'Materialkennzeichnung Lotrafilcon B auf der Verpackung',
    last_verified: '09.09.2026',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Alcon Air Optix Plus HydraGlyde.',
    derivation_evaluation: 'Hohe technische Übereinstimmung bei patentiertem Material Lotrafilcon B. Ein Wechsel sollte nur nach fachlicher Kontrolle erfolgen.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Lotrafilcon B (Silikon-Hydrogel)', brand_value: 'Lotrafilcon B (Silikon-Hydrogel)', match: true },
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
    private_label: 'Mister Spex True Day',
    optician_private_label: 'Mister Spex True Day',
    optician_chain: 'Mister Spex',
    optician_pack_size: '30er Packung (30 Linsen)',
    optician_pack_count: 30,
    suspected_original_id: 'dailies-aquacomfort',
    matched_brand_product_id: 'dailies-aquacomfort',
    brand_pack_size: '30er Packung (30 Linsen)',
    material: 'Nelfilcon A (Hydrogel)',
    base_curve: '8.7 mm',
    diameter: '14.0 mm',
    dk_t: 26,
    design: 'Sphärisch',
    replacement_schedule: '1 Tag (Tageslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Deklariertes Material Nelfilcon A (Alcon PVA-Hydrogel), Wassergehalt 69 %, Dk/t 26, Basiskurve 8.7 mm und Durchmesser 14.0 mm deckungsgleich.',
    source_1: 'Mister Spex Produktdetaildeklaration',
    source_2: 'Alcon Vision Care Datenblatt Dailies AquaComfort Plus',
    source_type: 'Produktdeklaration & Herstellerdatenblatt',
    source_name: 'Mister Spex Produktdetailseite & Alcon Vision Care Datenblatt',
    mapping_source: 'Deklariertes Material Nelfilcon A und optische Parameter',
    last_verified: '09.09.2026',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Alcon Dailies AquaComfort Plus.',
    derivation_evaluation: 'Hohe technische Übereinstimmung bei Hydrogel-Material Nelfilcon A. Ein Wechsel sollte nur nach fachlicher Kontrolle erfolgen.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Tageslinse', brand_value: 'Tageslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Nelfilcon A (Hydrogel)', brand_value: 'Nelfilcon A (Hydrogel)', match: true },
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
    private_label: 'Specsavers Easyvision Opteyes',
    optician_private_label: 'Specsavers Easyvision Opteyes',
    optician_chain: 'Specsavers / Pearle',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    suspected_original_id: 'bausch-ultra',
    matched_brand_product_id: 'bausch-ultra',
    brand_pack_size: '6er Packung (6 Linsen)',
    material: 'Samfilcon A (Silikon-Hydrogel)',
    base_curve: '8.5 mm',
    diameter: '14.2 mm',
    dk_t: 163,
    design: 'Sphärisch',
    replacement_schedule: '30 Tage (Monatslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Materialdeklaration Samfilcon A (Bausch + Lomb MoistureSeal®), Wassergehalt 46 %, Dk/t 163, Basiskurve 8.5 mm und Durchmesser 14.2 mm deckungsgleich.',
    source_1: 'Specsavers Produktangaben / Verpackung',
    source_2: 'Bausch + Lomb Ultra Produktspezifikation',
    source_type: 'Hersteller- und Packungsdeklaration',
    source_name: 'Specsavers Produktangaben & Bausch + Lomb Ultra Spezifikation',
    mapping_source: 'Materialdeklaration Samfilcon A und Dk/t-Wert 163',
    last_verified: '09.09.2026',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit Bausch + Lomb ULTRA.',
    derivation_evaluation: 'Hohe technische Übereinstimmung bei Samfilcon A. Ein Wechsel sollte nur nach fachlicher Kontrolle erfolgen.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Samfilcon A (Silikon-Hydrogel)', brand_value: 'Samfilcon A (Silikon-Hydrogel)', match: true },
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
    private_label: 'Apollo iWear Harmony',
    optician_private_label: 'Apollo iWear Harmony',
    optician_chain: 'Apollo Optik',
    optician_pack_size: '6er Packung (6 Linsen)',
    optician_pack_count: 6,
    suspected_original_id: 'proclear-sphere',
    matched_brand_product_id: 'proclear-sphere',
    brand_pack_size: '6er Packung (6 Linsen)',
    material: 'Omafilcon B (Hydrogel)',
    base_curve: '8.6 mm',
    diameter: '14.2 mm',
    dk_t: 42,
    design: 'Sphärisch (Biokompatibel)',
    replacement_schedule: '30 Tage (Monatslinse)',
    correction_type: 'sphärisch',
    confidence_level: 'HIGH_CONFIDENCE_MATCH',
    confidence_label: 'Technische Übereinstimmung (Technical Match)',
    classification: 'TECHNICAL_MATCH',
    classification_label: 'Technische Übereinstimmung (Technical Match)',
    reasoning: 'Materialdeklaration Omafilcon B (CooperVision PC Technology), biokompatibles Hydrogel mit 62 % Wassergehalt, Dk/t 42, BC 8.6 mm und DIA 14.2 mm deckungsgleich.',
    source_1: 'Apollo Optik Verpackungs- und Filialdeklaration',
    source_2: 'CooperVision Proclear Sphere Produktdatenblatt',
    source_type: 'Filialdeklaration & CooperVision Spezifikation',
    source_name: 'Apollo Verpackungskennzeichnung & CooperVision Katalog',
    mapping_source: 'Materialdeklaration Omafilcon B und biokompatible Zusammensetzung',
    last_verified: '09.09.2026',
    technical_statement: 'Die verfügbaren Produktdaten zeigen eine hohe Übereinstimmung mit CooperVision Proclear Sphere.',
    derivation_evaluation: 'Hohe technische Übereinstimmung bei biokompatiblem Omafilcon B. Ein Wechsel sollte nur nach fachlicher Kontrolle erfolgen.',
    disclaimer: 'Auch bei technischer Übereinstimmung empfiehlt optical.de keinen eigenmächtigen Wechsel ohne fachliche Anpassung.',
    matched_parameters: [
      { parameter: 'Linsentyp', private_label_value: 'Monatslinse', brand_value: 'Monatslinse', match: true },
      { parameter: 'Material (USAN)', private_label_value: 'Omafilcon B (Hydrogel)', brand_value: 'Omafilcon B (Hydrogel)', match: true },
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
      item.slug.toLowerCase().includes(q) ||
      (item.material && item.material.toLowerCase().includes(q))
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
