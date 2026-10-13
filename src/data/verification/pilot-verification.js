/**
 * Phase 9.5 – Evidenzbasierter Verifikationspilot (10 Produkte aus dem Recherchebestand).
 * Alle Quellen wurden am 2026-10-14 tatsächlich abgerufen und gelesen (Seitentext lokal geprüft).
 * Fundstellen sind kurze Verweise (keine längeren Zitate). Nicht belegte Werte stehen NICHT hier (= unbekannt).
 * Status wird manuell vergeben, NIE automatisch aus Texttreffern.
 *
 * attribute status: VERIFIED (explizit auf offizieller Quelle) | DERIVED (nur aus Produktname/Kontext) | CONFLICT
 */
const D = '2026-10-14';
const src = (url, type, identity, note) => ({ url, source_type: type, checked_at: D, product_identity_confirmed: identity, note });
const a = (value, source_url, evidence, status = 'VERIFIED') => ({ value, source_url, evidence, status });

const JNJ_MF = 'https://www.jnjvisionpro.com/de-de/products/acuvue-oasys-max-1-day-multifocal/';
const BL_TOR = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/biotruer-oneday-for-astigmatism/';
const BL_PRES = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/biotrue-oneday-for-presbyopia/';
const BL_UOD = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/bausch-lomb-ultra-one-day/';
const AL_T30 = 'https://www.myalcon.com/de/professional/contact-lenses/monthly/total30/';
const AL_DT1MF = 'https://www.myalcon.com/de/professional/contact-lenses/daily/dailies-total1-multifocal/';
const CV_MDMF = 'https://coopervision.de/kontaktlinsen/myday-multifocal';
const CV_CLT = 'https://coopervision.de/kontaktlinsen/clariti-1-day-toric';
const CV_AVV = 'https://coopervision.de/kontaktlinsen/avaira-vitality';
const ART = 'https://www.artelac.de/produkte/artelac-splash/';

export const PILOT_STATUSES = ['SOURCE_IDENTIFIED', 'PRODUCT_IDENTITY_VERIFIED', 'TECHNICAL_DATA_PARTIALLY_VERIFIED', 'TECHNICAL_DATA_VERIFIED', 'EDITORIAL_REVIEW', 'APPROVED'];
export const SOURCE_QUALITIES = ['OFFICIAL_MANUFACTURER', 'OFFICIAL_PRODUCT_DOCUMENT', 'OFFICIAL_INSTRUCTIONS', 'SECONDARY_RETAILER', 'UNVERIFIED'];

export const PILOT_VERIFICATION = [
  {
    product_id: 'res-jnj-acuvue-oasys-max-1day-multifocal', manufacturer: 'Johnson & Johnson Vision', product_name: 'ACUVUE OASYS MAX 1-Day MULTIFOCAL',
    sources: [src(JNJ_MF, 'OFFICIAL_MANUFACTURER', true, 'Produktseite Fachbereich mit Tabelle "Kontaktlinseneigenschaften"; URL aus Link der J&J-Seite zu ACUVUE OASYS MAX 1-Day entnommen')],
    verified_attributes: {
      lens_type: a('Multifokale Tageslinse', JNJ_MF, 'Produktname/Seitenkopf; Addition LOW/MID/HIGH'),
      material: a('Silikon-Hydrogel (Senofilcon A)', JNJ_MF, 'Tabelle Linsenmaterial'),
      water_content: a('38 %', JNJ_MF, 'Tabelle Wassergehalt'),
      dk_t: a('147 x 10^-9 (edge and boundary corrected)', JNJ_MF, 'Tabelle Sauerstofftransmissibilität; Messbedingung beachten'),
      base_curve: a('8,4', JNJ_MF, 'Tabelle Basiskurve'),
      diameter: a('14,3', JNJ_MF, 'Tabelle Durchmesser'),
      pack_sizes: a('30 und 90 Kontaktlinsen', JNJ_MF, 'Tabelle Erhältliche Packungsgrößen'),
      replacement_schedule: a('Tageslinse (Ein-Tages-Linse)', JNJ_MF, 'Produktname "1-Day"; Seitenvergleich mit Ein-Tages-Kontaktlinsen; kein eigenes Tabellenfeld', 'DERIVED'),
    },
    conflicts: [{ attribute: 'dk_t', catalog_value: 121, source_value: 147, note: 'Katalogwert 121 gehört zur sphärischen OASYS MAX 1-Day (Variantenvermischung). Katalog korrigiert.' }, { attribute: 'base_curve', catalog_value: '8.4 mm, 8.5 mm', source_value: '8,4', note: '8,5 gilt für die sphärische Variante. Katalog korrigiert.' }, { attribute: 'standard_pack_size', catalog_value: '30er Box', source_value: '30 und 90', note: 'Katalog ergänzt.' }],
    verification_status: 'TECHNICAL_DATA_VERIFIED', human_review_required: 'Zweitprüfung durch Person vor APPROVED; Intervall nur abgeleitet.', effort_minutes_estimate: 8,
  },
  {
    product_id: 'res-bl-biotrue-oneday-toric', manufacturer: 'Bausch + Lomb', product_name: 'Biotrue ONEday for Astigmatism',
    sources: [src(BL_TOR, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite Deutschland; verlinkt aus der B+L-Kontaktlinsen-Navigation. Keine Parametertabelle; Gebrauchsanweisung extern (bausch.com/ifu) nicht ausgewertet')],
    verified_attributes: {
      lens_type: a('Torische Ein-Tages-Linse', BL_TOR, 'Produktname; Peri-Ballast-Design; Ein-Tages-Kontaktlinsen'),
      replacement_schedule: a('Ein-Tages-Kontaktlinse', BL_TOR, 'Beschreibungstext "Ein-Tages-Kontaktlinsen"'),
      water_content: a('78 %', BL_TOR, 'Abschnitt Eigenschaften & Vorteile'),
      pack_sizes: a('30er-Box, 90er-Box', BL_TOR, 'Abschnitt Produktvarianten'),
    },
    conflicts: [], verification_status: 'TECHNICAL_DATA_PARTIALLY_VERIFIED', human_review_required: 'Material, Dk/t, BC, Durchmesser nur über Gebrauchsanweisung/Datenblatt belegbar (nicht abgerufen).', effort_minutes_estimate: 5,
  },
  {
    product_id: 'res-bl-biotrue-oneday-multifocal', manufacturer: 'Bausch + Lomb', product_name: 'Biotrue ONEday for Presbyopia',
    sources: [src(BL_PRES, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite; keine Parametertabelle')],
    verified_attributes: {
      lens_type: a('Multifokale (Presbyopie) Ein-Tages-Linse', BL_PRES, 'Produktname; Ein-Tages-Kontaktlinsen'),
      replacement_schedule: a('Ein-Tages-Kontaktlinse', BL_PRES, 'Beschreibungstext'),
      water_content: a('78 %', BL_PRES, 'Abschnitt Eigenschaften & Vorteile'),
    },
    conflicts: [], verification_status: 'TECHNICAL_DATA_PARTIALLY_VERIFIED', human_review_required: 'Packungsgrößen, Material, Dk/t, BC, Durchmesser nicht belegt.', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-bl-ultra-one-day', manufacturer: 'Bausch + Lomb', product_name: 'Bausch + Lomb ULTRA ONE DAY',
    sources: [src(BL_UOD, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite; keine Parametertabelle')],
    verified_attributes: {
      lens_type: a('Silikon-Hydrogel-Tageslinse (sphärisch)', BL_UOD, 'Text zu Silikon-Hydrogel-Tageskontaktlinsen; Produktname', 'DERIVED'),
      replacement_schedule: a('Tageslinse (ONE DAY)', BL_UOD, 'Produktname/Text', 'DERIVED'),
      pack_sizes: a('30er-Box, 90er-Box', BL_UOD, 'Abschnitt Produktvarianten'),
    },
    conflicts: [], verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Material (Kalifilcon A im Katalog), Wassergehalt, Dk/t, BC, Durchmesser nicht belegt.', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-alcon-total30-sphere', manufacturer: 'Alcon', product_name: 'TOTAL30',
    sources: [src(AL_T30, 'OFFICIAL_MANUFACTURER', true, 'Alcon-Fachportal; Seite verweist auf "TOTAL30-Parameter" als separaten Link/Dokument, nicht abgerufen')],
    verified_attributes: {
      replacement_schedule: a('Monatslinse (30 Tage)', AL_T30, 'Seitentext "TOTAL30 Monatslinsen", "30 Tage lang"'),
      material_class: a('Material mit Wassergradient (Wassergehalt an der Oberfläche nahezu 100 %)', AL_T30, 'Abschnitt Material mit Wassergradient'),
    },
    conflicts: [], verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Parameter-Dokument von Alcon (BC, Durchmesser, Dk/t, Kernwassergehalt) beschaffen; Katalogwerte ungeprüft.', effort_minutes_estimate: 5,
  },
  {
    product_id: 'res-alcon-dailies-total1-multifocal', manufacturer: 'Alcon', product_name: 'DAILIES TOTAL1 Multifocal',
    sources: [src(AL_DT1MF, 'OFFICIAL_MANUFACTURER', true, 'Alcon-Fachportal; Parameter-Dokument separat, nicht abgerufen')],
    verified_attributes: {
      lens_type: a('Multifokale Tageslinse', AL_DT1MF, 'Seitentitel "multifokale Tageslinsen"'),
      replacement_schedule: a('Tageslinse', AL_DT1MF, 'Seitentext'),
      material_class: a('Material mit Wassergradient (Oberfläche nahezu 100 % Wasser)', AL_DT1MF, 'Abschnitt Material mit Wassergradient'),
    },
    conflicts: [], verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Parameter-Dokument beschaffen; Katalogwerte ungeprüft.', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-cv-myday-multifocal', manufacturer: 'CooperVision', product_name: 'MyDay multifocal',
    sources: [src(CV_MDMF, 'OFFICIAL_MANUFACTURER', true, 'CooperVision Deutschland; "Produktspezifikationen" nur als Verweis/Download, nicht abgerufen')],
    verified_attributes: {
      lens_type: a('Multifokale Einmallinse (Alterssichtigkeit)', CV_MDMF, 'Seitenkopf: Korrektion Alterssichtigkeit'),
      replacement_schedule: a('Täglicher Austausch', CV_MDMF, 'Feld Austauschrhythmus'),
      material_class: a('Silikonhydrogel', CV_MDMF, 'Seitenkopf "Silikonhydrogel-Einmalkontaktlinsen"'),
    },
    conflicts: [], verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Spezifikationsblatt beschaffen (Material-USAN, Dk/t, BC, Durchmesser).', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-cv-clariti-1day-toric', manufacturer: 'CooperVision', product_name: 'clariti 1 day toric',
    sources: [src(CV_CLT, 'OFFICIAL_MANUFACTURER', true, 'CooperVision Deutschland; Spezifikation nur als Verweis')],
    verified_attributes: {
      lens_type: a('Torische Einmallinse (Hornhautverkrümmung)', CV_CLT, 'Seitenkopf'),
      replacement_schedule: a('Täglicher Austausch', CV_CLT, 'Feld Austauschrhythmus'),
      material_class: a('Silikonhydrogel', CV_CLT, 'Seitenkopf'),
    },
    conflicts: [{ attribute: 'material', catalog_value: 'Somofilcon A', source_value: 'nicht als Materialangabe dieser Linse belegt', note: '"somofilcon A" erscheint nur in einer Fußnote zu einer Umfrage; keine Materialzuordnung. Katalogwert bleibt ungeprüft.' }],
    verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Spezifikationsblatt beschaffen.', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-cv-avaira-vitality', manufacturer: 'CooperVision', product_name: 'Avaira Vitality',
    sources: [src(CV_AVV, 'OFFICIAL_MANUFACTURER', true, 'CooperVision Deutschland; Spezifikation nur als Verweis')],
    verified_attributes: {
      lens_type: a('Sphärische Monatslinse (Kurz-/Weitsichtigkeit)', CV_AVV, 'Seitenkopf'),
      replacement_schedule: a('Monatlich', CV_AVV, 'Feld Austauschrhythmus'),
      material_class: a('Silikonhydrogel', CV_AVV, 'Seitenkopf'),
    },
    conflicts: [], verification_status: 'PRODUCT_IDENTITY_VERIFIED', human_review_required: 'Spezifikationsblatt beschaffen; Marktverfügbarkeit in DE prüfen.', effort_minutes_estimate: 4,
  },
  {
    product_id: 'res-bl-artelac-splash-eyedrops', manufacturer: 'Bausch + Lomb', product_name: 'Artelac Splash',
    sources: [src(ART, 'OFFICIAL_MANUFACTURER', true, 'Markenseite von Bausch + Lomb (Impressum/Fußzeile Bausch + Lomb, Berlin); Gebrauchsanweisung nicht abgerufen')],
    verified_attributes: {
      active_ingredient: a('Hyaluronsäure: 0,2 % (EDO) / 0,24 % (MDO)', ART, 'Produkttext'),
      preservative_free: a('Ohne Konservierungsstoffe', ART, 'Produkttext'),
      pack_sizes: a('MDO 10 ml, 2 x 15 ml; EDO 10 / 30 / 60 x 0,5 ml', ART, 'Tabelle Produktvarianten'),
      shelf_life_after_opening: a('MDO 6 Monate; EDO nach einmaligem Gebrauch', ART, 'Tabelle Produktvarianten'),
    },
    conflicts: [{ attribute: 'concentration', catalog_value: '0,24 %', source_value: '0,2 % (EDO) / 0,24 % (MDO)', note: 'Katalog nannte nur MDO-Wert.' }],
    verification_status: 'TECHNICAL_DATA_VERIFIED', human_review_required: 'Arzneimittel-/Medizinprodukt-Einordnung und Werbeaussagen rechtlich prüfen (HWG); kein Linsenprodukt.', effort_minutes_estimate: 4,
  },
];
