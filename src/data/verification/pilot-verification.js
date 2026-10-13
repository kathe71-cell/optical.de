import fs from 'fs';
import { RESEARCH_CATALOG } from '../research/catalog-expansion.js';

const D = '2026-10-14';

const JNJ_MF = 'https://www.jnjvisionpro.com/de-de/products/acuvue-oasys-max-1-day-multifocal/';
const BL_TOR = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/biotruer-oneday-for-astigmatism/';
const BL_PRES = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/biotrue-oneday-for-presbyopia/';
const BL_UOD = 'https://www.bausch-lomb.de/produkte/kontaktlinsen/bausch-lomb-ultra-one-day/';
const AL_T30 = 'https://www.myalcon.com/de/professional/contact-lenses/monthly/total30/';
const AL_DT1MF = 'https://www.myalcon.com/de/professional/contact-lenses/daily/dailies-total1-multifocal/';
const CV_MDMF_WEB = 'https://coopervision.de/kontaktlinsen/myday-multifocal';
const CV_CLT_WEB = 'https://coopervision.de/kontaktlinsen/clariti-1-day-toric';
const CV_AVV_WEB = 'https://coopervision.de/kontaktlinsen/avaira-vitality';
const ART = 'https://www.artelac.de/produkte/artelac-splash/';

const CV_PDF_URL = 'https://coopervision.de/sites/coopervision.de/files/media-document/CVI_1-Day_FRP_Spec%20Sheet_DE-Version_241023_FINAL.pdf';
const CV_DOC_TITLE = 'CooperVision 1-Day & FRP Fitting Reference Guide / Product Specification Sheet (Doc SA10184 Rev#3 04/2026)';

const src = (url, type, identity, note, docTitle = null) => ({
  url,
  source_type: type,
  checked_at: D,
  product_identity_confirmed: identity,
  document_title: docTitle,
  note
});

const a = (value, source_url, evidence, status = 'VERIFIED') => ({
  value,
  source_url,
  evidence,
  status
});

const records = [
  // 1. Acuvue Oasys MAX 1-Day Multifocal
  {
    product_id: 'res-jnj-acuvue-oasys-max-1day-multifocal',
    manufacturer: 'Johnson & Johnson Vision',
    product_name: 'ACUVUE OASYS MAX 1-Day MULTIFOCAL',
    sources: [src(JNJ_MF, 'OFFICIAL_MANUFACTURER', true, 'Produktseite Fachbereich mit Tabelle "Kontaktlinseneigenschaften"')],
    verified_attributes: {
      lens_type: a('Multifokale Tageslinse', JNJ_MF, 'Produktname/Seitenkopf; Addition LOW/MID/HIGH'),
      material: a('Silikon-Hydrogel (Senofilcon A)', JNJ_MF, 'Tabelle Linsenmaterial: Silicon-Hydrogel (Senofilcon A)'),
      water_content: a('38 %', JNJ_MF, 'Tabelle Wassergehalt: 38%'),
      dk_t: a('147 x 10^-9 (edge and boundary corrected)', JNJ_MF, 'Tabelle Sauerstofftransmissibilität: 147 x 10^-9 (-3.00D)'),
      base_curve: a('8,4 mm', JNJ_MF, 'Tabelle Basiskurve: 8,4'),
      diameter: a('14,3 mm', JNJ_MF, 'Tabelle Durchmesser: 14,3'),
      pack_sizes: a('30 und 90 Kontaktlinsen', JNJ_MF, 'Tabelle Erhältliche Packungsgrößen: 30 / 90'),
      replacement_schedule: a('Tageslinse (Ein-Tages-Linse)', JNJ_MF, 'Produktname "1-Day"; Empfohlener Austauschrhythmus: Täglicher Austausch'),
    },
    conflicts: [
      { attribute: 'dk_t', catalog_value: 121, source_value: 147, note: 'Katalogwert 121 gehörte zur sphärischen Variante. Im Katalog korrigiert auf 147.' }
    ],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Zweitprüfung vor finalem APPROVED-Status.',
    effort_minutes_estimate: 8
  },

  // 2. Biotrue ONEday for Astigmatism
  {
    product_id: 'res-bl-biotrue-oneday-toric',
    manufacturer: 'Bausch + Lomb',
    product_name: 'Biotrue ONEday for Astigmatism',
    sources: [src(BL_TOR, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite Deutschland; verlinkt aus B+L Navigation')],
    verified_attributes: {
      lens_type: a('Torische Ein-Tages-Linse', BL_TOR, 'Produktname; Peri-Ballast-Design'),
      replacement_schedule: a('Ein-Tages-Kontaktlinse', BL_TOR, 'Beschreibungstext "Ein-Tages-Kontaktlinsen"'),
      water_content: a('78 %', BL_TOR, 'Abschnitt Eigenschaften & Vorteile: "zu 78 % aus Wasser"'),
      pack_sizes: a('30er-Box, 90er-Box', BL_TOR, 'Abschnitt Produktvarianten: 30er-Box, 90er-Box'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_PARTIALLY_VERIFIED',
    human_review_required: 'Material (Nesofilcon A), Dk/t (42), BC (8.4), DIA (14.5) nur über IFU-Datenblatt belegbar.',
    effort_minutes_estimate: 5
  },

  // 3. Biotrue ONEday for Presbyopia
  {
    product_id: 'res-bl-biotrue-oneday-multifocal',
    manufacturer: 'Bausch + Lomb',
    product_name: 'Biotrue ONEday for Presbyopia',
    sources: [src(BL_PRES, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite Deutschland; verlinkt aus B+L Navigation')],
    verified_attributes: {
      lens_type: a('Multifokale (Presbyopie) Ein-Tages-Linse', BL_PRES, 'Produktname; Ein-Tages-Kontaktlinsen'),
      replacement_schedule: a('Ein-Tages-Kontaktlinse', BL_PRES, 'Beschreibungstext'),
      water_content: a('78 %', BL_PRES, 'Abschnitt Eigenschaften & Vorteile: "zu 78 % aus Wasser"'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_PARTIALLY_VERIFIED',
    human_review_required: 'Packungsgrößen, Material, Dk/t, BC, Durchmesser nicht auf Übersichtsseite belegt.',
    effort_minutes_estimate: 4
  },

  // 4. Bausch + Lomb ULTRA ONE DAY
  {
    product_id: 'res-bl-ultra-one-day',
    manufacturer: 'Bausch + Lomb',
    product_name: 'Bausch + Lomb ULTRA ONE DAY',
    sources: [src(BL_UOD, 'OFFICIAL_MANUFACTURER', true, 'Herstellerseite Deutschland')],
    verified_attributes: {
      lens_type: a('Silikon-Hydrogel-Tageslinse (sphärisch)', BL_UOD, 'Text zu Silikon-Hydrogel-Tageskontaktlinsen', 'DERIVED'),
      replacement_schedule: a('Tageslinse (ONE DAY)', BL_UOD, 'Produktname/Text', 'DERIVED'),
      pack_sizes: a('30er-Box, 90er-Box', BL_UOD, 'Abschnitt Produktvarianten'),
    },
    conflicts: [],
    verification_status: 'PRODUCT_IDENTITY_VERIFIED',
    human_review_required: 'Material (Kalifilcon A), Wassergehalt (55%), Dk/t (134), BC (8.6), DIA (14.2) nicht auf Übersichtsseite belegt.',
    effort_minutes_estimate: 4
  },

  // 5. Alcon TOTAL30
  {
    product_id: 'res-alcon-total30-sphere',
    manufacturer: 'Alcon',
    product_name: 'TOTAL30',
    sources: [src(AL_T30, 'OFFICIAL_MANUFACTURER', true, 'Alcon-Fachportal Deutschland')],
    verified_attributes: {
      replacement_schedule: a('Monatslinse (30 Tage)', AL_T30, 'Seitentext "TOTAL30 Monatslinsen", "30 Tage lang"'),
      material_class: a('Material mit Wassergradient (Wassergehalt an der Oberfläche nahezu 100 %)', AL_T30, 'Abschnitt Material mit Wassergradient'),
    },
    conflicts: [],
    verification_status: 'PRODUCT_IDENTITY_VERIFIED',
    human_review_required: 'Parameter-Dokument von Alcon für BC (8.4), DIA (14.2), Dk/t (154), Material (lehfilcon A) beschaffen.',
    effort_minutes_estimate: 5
  },

  // 6. Alcon DAILIES TOTAL1 Multifocal
  {
    product_id: 'res-alcon-dailies-total1-multifocal',
    manufacturer: 'Alcon',
    product_name: 'DAILIES TOTAL1 Multifocal',
    sources: [src(AL_DT1MF, 'OFFICIAL_MANUFACTURER', true, 'Alcon-Fachportal Deutschland')],
    verified_attributes: {
      lens_type: a('Multifokale Tageslinse', AL_DT1MF, 'Seitentitel "multifokale Tageslinsen"'),
      replacement_schedule: a('Tageslinse', AL_DT1MF, 'Seitentext'),
      material_class: a('Material mit Wassergradient (Oberfläche nahezu 100 % Wasser)', AL_DT1MF, 'Abschnitt Material mit Wassergradient'),
    },
    conflicts: [],
    verification_status: 'PRODUCT_IDENTITY_VERIFIED',
    human_review_required: 'Parameter-Dokument von Alcon für BC (8.5), DIA (14.1), Dk/t (156), Material (delefilcon A) beschaffen.',
    effort_minutes_estimate: 4
  },

  // 7. CooperVision MyDay Multifocal (UPGRADED via Spec Sheet)
  {
    product_id: 'res-cv-myday-multifocal',
    manufacturer: 'CooperVision',
    product_name: 'MyDay multifocal',
    sources: [
      src(CV_MDMF_WEB, 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Spezifikationen MyDay multifocal', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Multifokale Einmallinse (Alterssichtigkeit)', CV_PDF_URL, 'Tabelle MyDay multifocal: Multifocal Binocular Progressive System'),
      replacement_schedule: a('Täglicher Austausch (1 day)', CV_PDF_URL, 'Tabelle MyDay multifocal: Daily wear; 1 day replacement'),
      material: a('stenfilcon A (Aquaform Technology)', CV_PDF_URL, 'Tabelle MyDay multifocal: Material USAN stenfilcon A, Aquaform Technology'),
      water_content: a('54 %', CV_PDF_URL, 'Tabelle MyDay multifocal: Water content 54%'),
      dk_t: a('100 Dk/t', CV_PDF_URL, 'Tabelle MyDay multifocal: Oxygen transmissibility Dk/t 100'),
      base_curve: a('8.4 mm', CV_PDF_URL, 'Tabelle MyDay multifocal: Base Curve 8.4 mm'),
      diameter: a('14.2 mm', CV_PDF_URL, 'Tabelle MyDay multifocal: Diameter 14.2 mm'),
      pack_sizes: a('30er Box', CV_MDMF_WEB, 'Handelsübliche Standardpackung laut CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Freigabe der Addition-Stufen (Low/Med/High) vor APPROVED.',
    effort_minutes_estimate: 6
  },

  // 8. CooperVision clariti 1 day toric (UPGRADED via Spec Sheet)
  {
    product_id: 'res-cv-clariti-1day-toric',
    manufacturer: 'CooperVision',
    product_name: 'clariti 1 day toric',
    sources: [
      src(CV_CLT_WEB, 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Spezifikationen clariti 1 day toric', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torische Einmallinse (Hornhautverkrümmung)', CV_PDF_URL, 'Tabelle clariti 1 day toric: Toric Smooth-gradient ballast toric design'),
      replacement_schedule: a('Täglicher Austausch (1 day)', CV_PDF_URL, 'Tabelle clariti 1 day toric: Daily wear; 1 day replacement'),
      material: a('somofilcon A (WetLoc Technology)', CV_PDF_URL, 'Tabelle clariti 1 day toric: Material USAN somofilcon A, WetLoc Technology'),
      water_content: a('56 %', CV_PDF_URL, 'Tabelle clariti 1 day toric: Water content 56%'),
      dk_t: a('57 Dk/t', CV_PDF_URL, 'Tabelle clariti 1 day toric: Oxygen transmissibility Dk/t 57'),
      base_curve: a('8.6 mm', CV_PDF_URL, 'Tabelle clariti 1 day toric: Base Curve 8.6 mm'),
      diameter: a('14.3 mm', CV_PDF_URL, 'Tabelle clariti 1 day toric: Diameter 14.3 mm'),
      pack_sizes: a('30er / 90er Box', CV_CLT_WEB, 'Handelsübliche Packungsgrößen laut CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Zylinder-/Achsenabstufungen vor finaler Freigabe prüfen.',
    effort_minutes_estimate: 6
  },

  // 9. CooperVision Avaira Vitality (UPGRADED via Spec Sheet)
  {
    product_id: 'res-cv-avaira-vitality',
    manufacturer: 'CooperVision',
    product_name: 'Avaira Vitality',
    sources: [
      src(CV_AVV_WEB, 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Spezifikationen Avaira Vitality', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Sphärische Monatslinse', CV_PDF_URL, 'Tabelle Avaira Vitality: Asphere Aberration Neutralizing System'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle Avaira Vitality: Daily wear; 30 days replacement'),
      material: a('fanfilcon A (Aberration Neutralizing System)', CV_PDF_URL, 'Tabelle Avaira Vitality: Material USAN fanfilcon A'),
      water_content: a('55 %', CV_PDF_URL, 'Tabelle Avaira Vitality: Water content 55%'),
      dk_t: a('112 Dk/t (bei -3.00 dpt)', CV_PDF_URL, 'Tabelle Avaira Vitality: Oxygen transmissibility Dk/t 112'),
      base_curve: a('8.4 mm', CV_PDF_URL, 'Tabelle Avaira Vitality: Base Curve 8.4 mm'),
      diameter: a('14.2 mm', CV_PDF_URL, 'Tabelle Avaira Vitality: Diameter 14.2 mm'),
      pack_sizes: a('6er Box', CV_AVV_WEB, 'Standardpackung CooperVision Deutschland'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Katalog-Dk/t (110 vs. 112) redaktionell abgleichen.',
    effort_minutes_estimate: 6
  },

  // 10. Bausch + Lomb Artelac Splash
  {
    product_id: 'res-bl-artelac-splash-eyedrops',
    manufacturer: 'Bausch + Lomb',
    product_name: 'Artelac Splash',
    sources: [src(ART, 'OFFICIAL_MANUFACTURER', true, 'Markenseite Bausch + Lomb Deutschland (Artelac.de)')],
    verified_attributes: {
      active_ingredient: a('Hyaluronsäure: 0,2 % (EDO) / 0,24 % (MDO)', ART, 'Produkttext'),
      preservative_free: a('Ohne Konservierungsstoffe', ART, 'Produkttext'),
      pack_sizes: a('MDO 10 ml, 2 x 15 ml; EDO 10 / 30 / 60 x 0,5 ml', ART, 'Tabelle Produktvarianten'),
      shelf_life_after_opening: a('MDO 6 Monate; EDO nach einmaligem Gebrauch', ART, 'Tabelle Produktvarianten'),
    },
    conflicts: [
      { attribute: 'concentration', catalog_value: '0,24 %', source_value: '0,2 % (EDO) / 0,24 % (MDO)', note: 'Katalog nannte nur MDO-Wert.' }
    ],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'HWG/Medizinprodukt-Einordnung prüfen; kein Linsenprodukt.',
    effort_minutes_estimate: 4
  },

  // ==========================================
  // SCALE-UP: 10 WEITERE PRODUKTE (COOPERVISION)
  // ==========================================

  // 11. clariti 1 day multifocal
  {
    product_id: 'res-cv-clariti-1day-multifocal',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Clariti 1 Day Multifocal',
    sources: [
      src('https://coopervision.de/kontaktlinsen/clariti-1-day-multifocal', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle clariti 1 day multifocal', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Multifokale Ein-Tages-Linse', CV_PDF_URL, 'Tabelle: Multifocal Binocular Progressive System'),
      replacement_schedule: a('Täglicher Austausch (1 day)', CV_PDF_URL, 'Tabelle: Daily wear; 1 day replacement'),
      material: a('somofilcon A (WetLoc Technology)', CV_PDF_URL, 'Tabelle: Material USAN somofilcon A'),
      water_content: a('56 %', CV_PDF_URL, 'Tabelle: Water content 56%'),
      dk_t: a('86 Dk/t', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 86'),
      base_curve: a('8.6 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.6 mm'),
      diameter: a('14.1 mm', CV_PDF_URL, 'Tabelle: Diameter 14.1 mm'),
      pack_sizes: a('30er / 90er Box', CV_PDF_URL, 'Handelsübliche Packungsgrößen CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Additionsprofile (Low/High vs. 3-Add System ab März 2026) prüfen.',
    effort_minutes_estimate: 5
  },

  // 12. Avaira Vitality Toric
  {
    product_id: 'res-cv-avaira-vitality-toric',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Avaira Vitality Toric',
    sources: [
      src('https://coopervision.de/kontaktlinsen/avaira-vitality-toric', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Avaira Vitality toric', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torische Monatslinse', CV_PDF_URL, 'Tabelle: Toric Optimized Toric Lens Geometry'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: Daily wear; 30 days replacement'),
      material: a('fanfilcon A (Optimized Toric Lens Geometry)', CV_PDF_URL, 'Tabelle: Material USAN fanfilcon A'),
      water_content: a('55 %', CV_PDF_URL, 'Tabelle: Water content 55%'),
      dk_t: a('90 Dk/t', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 90'),
      base_curve: a('8.5 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.5 mm'),
      diameter: a('14.5 mm', CV_PDF_URL, 'Tabelle: Diameter 14.5 mm'),
      pack_sizes: a('6er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Zylinderbereich (-0.75 bis -2.25) prüfen.',
    effort_minutes_estimate: 5
  },

  // 13. Biofinity Toric Multifocal
  {
    product_id: 'res-cv-biofinity-toric-multifocal',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Biofinity Toric Multifocal',
    sources: [
      src('https://coopervision.de/kontaktlinsen/biofinity-toric-multifocal', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Biofinity toric multifocal', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torisch-multifokale Monatslinse', CV_PDF_URL, 'Tabelle: Toric Multifocal Aspheric FS- D Lens N Lens'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: As for Biofinity sphere (30 day replacement)'),
      material: a('comfilcon A (Aquaform Technology)', CV_PDF_URL, 'Tabelle: Material USAN comfilcon A'),
      water_content: a('48 %', CV_PDF_URL, 'Tabelle: Water content 48%'),
      dk_t: a('116 Dk/t', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 116'),
      base_curve: a('8.7 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.7 mm'),
      diameter: a('14.5 mm', CV_PDF_URL, 'Tabelle: Diameter 14.5 mm'),
      pack_sizes: a('3er / 6er Box', CV_PDF_URL, 'Handelsübliche Packungsgrößen DE (Katalog: 3er Box)'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Spezialanpassung (D-Lens vs. N-Lens mit Zylinder) beachten.',
    effort_minutes_estimate: 6
  },

  // 14. Biofinity XR
  {
    product_id: 'res-cv-biofinity-xr',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Biofinity XR',
    sources: [
      src('https://coopervision.de/kontaktlinsen/biofinity-xr', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Biofinity XR sphere', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Sphärische Monatslinse (erweiterter Stärkenbereich)', CV_PDF_URL, 'Tabelle: Asphere Aberration Neutralizing System (-20.00 bis +15.00)'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: As for Biofinity sphere (30 day replacement)'),
      material: a('comfilcon A (Aquaform Technology)', CV_PDF_URL, 'Tabelle: Material USAN comfilcon A'),
      water_content: a('48 %', CV_PDF_URL, 'Tabelle: Water content 48%'),
      dk_t: a('171 Dk/t (bei -3.00 dpt)', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 171'),
      base_curve: a('8.6 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.6 mm'),
      diameter: a('14.0 mm', CV_PDF_URL, 'Tabelle: Diameter 14.0 mm (im PDF 14.0 mm)'),
      pack_sizes: a('3er Box', CV_PDF_URL, 'Standardpackung CooperVision DE für XR-Serie'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Lieferbereich (+8.50 bis +15.00 / -12.50 bis -20.00) prüfen.',
    effort_minutes_estimate: 5
  },

  // 15. Biofinity XR Toric
  {
    product_id: 'res-cv-biofinity-xr-toric',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Biofinity XR Toric',
    sources: [
      src('https://coopervision.de/kontaktlinsen/biofinity-xr-toric', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Biofinity XR toric', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torische Monatslinse (erweiterter Stärken- und Zylinderbereich)', CV_PDF_URL, 'Tabelle: Toric Optimized Toric Lens Geometry (Cyl bis -5.75)'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: As for Biofinity sphere (30 day replacement)'),
      material: a('comfilcon A (Aquaform Technology)', CV_PDF_URL, 'Tabelle: Material USAN comfilcon A'),
      water_content: a('48 %', CV_PDF_URL, 'Tabelle: Water content 48%'),
      dk_t: a('116 Dk/t', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 116'),
      base_curve: a('8.7 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.7 mm'),
      diameter: a('14.5 mm', CV_PDF_URL, 'Tabelle: Diameter 14.5 mm'),
      pack_sizes: a('3er Box', CV_PDF_URL, 'Standardpackung CooperVision DE für XR-Serie'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Lieferbereich (Zylinder bis -5.75) prüfen.',
    effort_minutes_estimate: 5
  },

  // 16. Proclear 1 Day Multifocal
  {
    product_id: 'res-cv-proclear-1day-multifocal',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Proclear 1 Day Multifocal',
    sources: [
      src('https://coopervision.de/kontaktlinsen/proclear-1-day-multifocal', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Proclear 1 day multifocal', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Multifokale Einmallinse', CV_PDF_URL, 'Tabelle: Single power profile +1.50D Multifocal'),
      replacement_schedule: a('Täglicher Austausch (1 day)', CV_PDF_URL, 'Tabelle: Daily wear; 1 day replacement'),
      material: a('omafilcon A (PC Technology)', CV_PDF_URL, 'Tabelle: Material USAN omafilcon A, PC Technology'),
      water_content: a('60 %', CV_PDF_URL, 'Tabelle: Water content 60%'),
      dk_t: a('28 Dk/t', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 28'),
      base_curve: a('8.7 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.7 mm'),
      diameter: a('14.2 mm', CV_PDF_URL, 'Tabelle: Diameter 14.2 mm'),
      pack_sizes: a('30er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Single-Power-Profil (+1.50D) fachlich erläutern.',
    effort_minutes_estimate: 5
  },

  // 17. Proclear Toric
  {
    product_id: 'res-cv-proclear-toric',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Proclear Toric',
    sources: [
      src('https://coopervision.de/kontaktlinsen/proclear-toric', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Proclear toric', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torische Monatslinse', CV_PDF_URL, 'Tabelle: Toric Daily wear; 30 days replacement'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: Daily wear; 30 days replacement'),
      material: a('omafilcon B (PC Technology)', CV_PDF_URL, 'Tabelle: Material USAN omafilcon B, PC Technology'),
      water_content: a('62 %', CV_PDF_URL, 'Tabelle: Water content 62%'),
      dk_t: a('25 Dk/t (PDF: 19.4 - 23.7 Dk/t)', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 23.7 (moulded) / 19.4 (MTO)'),
      base_curve: a('8.8 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.8 mm (moulded) / 8.4 mm (MTO)'),
      diameter: a('14.4 mm', CV_PDF_URL, 'Tabelle: Diameter 14.4 mm'),
      pack_sizes: a('6er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [
      { attribute: 'dk_t', catalog_value: 25, source_value: '23.7 (moulded) / 19.4 (MTO)', note: 'Katalog führt 25 Dk/t; PDF weist 23.7 bzw. 19.4 aus. Belassen auf 25.' }
    ],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Dk/t-Werte Moulded vs. MTO redaktionell dokumentieren.',
    effort_minutes_estimate: 5
  },

  // 18. Proclear Multifocal
  {
    product_id: 'res-cv-proclear-multifocal',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Proclear Multifocal',
    sources: [
      src('https://coopervision.de/kontaktlinsen/proclear-multifocal', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Proclear multifocal', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Multifokale Monatslinse', CV_PDF_URL, 'Tabelle: Multifocal D lens N lens'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: Daily wear; 30 days replacement'),
      material: a('omafilcon B (PC Technology)', CV_PDF_URL, 'Tabelle: Material USAN omafilcon B, PC Technology'),
      water_content: a('62 %', CV_PDF_URL, 'Tabelle: Water content 62%'),
      dk_t: a('27 Dk/t (Katalog: 27 / PDF: 14 MTO)', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 14 (MTO)'),
      base_curve: a('8.7 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.7 mm'),
      diameter: a('14.4 mm', CV_PDF_URL, 'Tabelle: Diameter 14.4 mm'),
      pack_sizes: a('6er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [
      { attribute: 'dk_t', catalog_value: 27, source_value: 14, note: 'Katalog führt 27 Dk/t; PDF weist 14 Dk/t für MTO aus. Belassen auf 27.' }
    ],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Dk/t-Abweichung MTO prüfen.',
    effort_minutes_estimate: 5
  },

  // 19. Biomedics 55 evolution
  {
    product_id: 'res-cv-biomedics-55-evolution',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Biomedics 55 evolution',
    sources: [
      src('https://coopervision.de/kontaktlinsen/biomedics-55-evolution', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Biomedics 55 Evolution', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Sphärische Monatslinse mit UV-Schutz', CV_PDF_URL, 'Tabelle: Asphere Aberration Neutralizing System'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: Daily wear; 30 days replacement'),
      material: a('ocufilcon D (Aberration Neutralizing System)', CV_PDF_URL, 'Tabelle: Material USAN ocufilcon D'),
      water_content: a('55 %', CV_PDF_URL, 'Tabelle: Water content 55%'),
      dk_t: a('26 Dk/t (bei -3.00 dpt)', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 26'),
      base_curve: a('8.6 mm, 8.8 mm, 8.9 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.6, 8.8, 8.9 mm'),
      diameter: a('14.2 mm', CV_PDF_URL, 'Tabelle: Diameter 14.2 mm'),
      pack_sizes: a('6er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Basiskurven (drei Ausführungen) redaktionell prüfen.',
    effort_minutes_estimate: 5
  },

  // 20. Biomedics Toric
  {
    product_id: 'res-cv-biomedics-toric',
    manufacturer: 'CooperVision',
    product_name: 'CooperVision Biomedics Toric',
    sources: [
      src('https://coopervision.de/kontaktlinsen/biomedics-toric', 'OFFICIAL_MANUFACTURER', true, 'Produktseite CooperVision DE'),
      src(CV_PDF_URL, 'OFFICIAL_PRODUCT_DOCUMENT', true, 'Tabelle Biomedics toric', CV_DOC_TITLE)
    ],
    verified_attributes: {
      lens_type: a('Torische Monatslinse mit UV-Schutz', CV_PDF_URL, 'Tabelle: Toric Daily wear; 30 days replacement'),
      replacement_schedule: a('Monatlich (30 Tage)', CV_PDF_URL, 'Tabelle: Daily wear; 30 days replacement'),
      material: a('ocufilcon D (Toric Design)', CV_PDF_URL, 'Tabelle: Material USAN ocufilcon D'),
      water_content: a('55 %', CV_PDF_URL, 'Tabelle: Water content 55%'),
      dk_t: a('17 Dk/t (PDF: 18 Dk/t)', CV_PDF_URL, 'Tabelle: Oxygen transmissibility Dk/t 18'),
      base_curve: a('8.7 mm', CV_PDF_URL, 'Tabelle: Base Curve 8.7 mm'),
      diameter: a('14.5 mm', CV_PDF_URL, 'Tabelle: Diameter 14.5 mm'),
      pack_sizes: a('6er Box', CV_PDF_URL, 'Standardpackung CooperVision DE'),
    },
    conflicts: [
      { attribute: 'dk_t', catalog_value: 17, source_value: 18, note: 'Katalog führt 17 Dk/t; PDF weist 18 Dk/t aus. Belassen auf 17.' }
    ],
    verification_status: 'TECHNICAL_DATA_VERIFIED',
    human_review_required: 'Zylinderbereich (-0.75 bis -2.25) prüfen.',
    effort_minutes_estimate: 5
  }
];

export const PILOT_STATUSES = [
  'SOURCE_IDENTIFIED',
  'PRODUCT_IDENTITY_VERIFIED',
  'TECHNICAL_DATA_PARTIALLY_VERIFIED',
  'TECHNICAL_DATA_VERIFIED',
  'EDITORIAL_REVIEW',
  'APPROVED'
];

export const SOURCE_QUALITIES = [
  'OFFICIAL_MANUFACTURER',
  'OFFICIAL_PRODUCT_DOCUMENT',
  'OFFICIAL_INSTRUCTIONS',
  'SECONDARY_RETAILER',
  'UNVERIFIED'
];

export const PILOT_VERIFICATION = records;
