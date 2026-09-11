---
name: godmode
description: >-
  Vollautomatisierte, rechtssichere und conversion-starke Projektierung eines Domain-Assets im Godmode.
  Wird ausgelöst, wenn der Nutzer den Godmode startet oder eine Domain projektieren möchte.
---

# Godmode: Domain-Projektierungs-Engine (Anti-AI-Slop & Mobile-First)

Dieser Skill führt die vollständige, qualitätsgesicherte End-to-End-Projektierung einer Domain durch.
Ziel ist der Aufbau einer autoritären Nischen-Website, die bei Google für lukrative Suchbegriffe auf Position 0 rankt, ohne AI-Slop auskommt, optimal auf Smartphones bedienbar ist und höchsten E-E-A-T- sowie Rechtsstandards genügt.

---

## 1. Absolute Grundregeln

1. **KEINE Verkaufs-Badges**:
   - Auf der Website darf absolut KEIN „Zu Verkaufen“-, „Kaufangebot abgeben“- oder „For Sale“-Banner erscheinen. Die Seite muss zu 100 % wie ein führendes, etabliertes Fachportal auftreten.
2. **Anti-AI-Slop-Garantie (Google Helpful Content Konformität)**:
   - Keine generischen Marketing-Phrasen („In der heutigen Welt...“, „Ihr verlässlicher Partner...“).
   - Stattdessen: Faktenbasierte Gesetzesparagraphen (z. B. StVG, FeV, JuSchG, VVG, EU AI Act), DIN/EN-Normen, chemisch/physikalische Formeln, reale Sensorik- oder Halbleiter-Spezifikationen.
   - Jede Seite muss mindestens ein echtes, interaktives JavaScript-Tool mit spürbarem Nutzwert bieten.
3. **Mobile First (WCAG AAA & Core Web Vitals)**:
   - Mindestens 48px Touch-Targets für alle Buttons und Schieberegler.
   - Sticky Mobile Bottom-Bar für sofortige Bedienbarkeit auf Smartphones.
   - Kein horizontales Layout-Breaking.
4. **DSGVO & Rechtssicherheit**:
   - 100 % Zero-CDN für Fonts (nur native System Fonts).
   - Impressum nach § 5 DDG (Jens Kathe, Hansastraße 6, 34119 Kassel).
   - Datenschutz nach DSGVO & MStV.
   - Wenn Affiliate-Links verwendet werden: Transparente Kennzeichnung mit Sternchen (*) und vorgeschriebene Klauseln (z. B. offizielle Amazon PartnerNet-Klausel).

---

## 2. Der verbindliche Workflow (Interaktive Abfrage vor Start)

Sobald der Godmode aufgerufen wird (per Klick in der Leiste oder `/godmode`), führt der Agent VOR Beginn der Codierung folgende interaktive Klärung durch:

### Schritt 1: Domain & Monetarisierungs-Abfrage
Der Agent fragt den Nutzer gezielt:
1. **Domainname**: Welche Domain soll projektiert werden? (falls noch nicht genannt).
2. **Google AdSense**: Soll AdSense auf dieser Domain eingebunden werden?
   - *Option A:* Ja, Standard-Publisher-ID (`pub-7078147966379221`) + validierte `ads.txt`.
   - *Option B:* Nein, werbefrei halten oder erst später aktivieren.
3. **Amazon Affiliate (PartnerNet)**: Sollen Amazon-Partnerlinks eingebunden werden?
   - *Option A:* Ja, mit Produkt-Empfehlungen, PartnerNet-Klausel und Store-ID.
   - *Option B:* Nein.
4. **Andere Affiliate- / Partnerprogramme**: Sollen sonstige Netzwerke oder Direkt-Links eingebunden werden?
   - Z. B. FinanceAds, Awin, Check24, Lead-Generierung oder Kanzlei-/Fach-Vermittlung.

---

## 3. Die 7 Pflicht-Bausteine für jede Domain

Jede projektierte Domain MUSS folgende 7 Elemente enthalten:

1. **Position-0 Definitions-Box (Featured Snippet Optimierung)**:
   - Knackige, zitierfähige 40- bis 60-Wörter-Definition mit Nennung der maßgeblichen Rechtsnorm oder Industriestandards direkt im sichtbaren Bereich.
2. **Interaktive Embed-Rechner-Route (`/rechner-embed`)**:
   - Voll funktionsfähiger Rechner / Konfigurator mit Formeln und Schiebereglern.
   - Standalone lauffähig (ohne Navbar/Footer) mit Iframe-Freigabe (`frame-ancestors *`).
   - Attribution-Backlink zur Hauptdomain für passiven Backlink- und PageRank-Aufbau.
3. **Webmaster Embed-Widget-Box auf der Startseite**:
   - Responsive iFrame-Code zum direkten Kopieren für Blogger, Kanzleien, Fachportale und Presse.
4. **E-E-A-T Redaktions-Trust-Box**:
   - „Fachredaktion [Domain] – Stand: [Aktueller Monat/Jahr] – Geprüft nach [Norm/Gesetz]“.
5. **SEO & Schema.org JSON-LD Markup**:
   - Vollständige Schemas für `WebSite`, `Organization`, `FAQPage`, `BreadcrumbList` und OpenGraph/Twitter Cards.
6. **Rechtssicheres Impressum (§ 5 DDG) & Datenschutz**:
   - Korrekte Kontaktdaten und Pflichtangaben.
7. **Clean Vercel Deploy & 100 % HTTP 200 OK Verification**:
   - Saubere SPA-Rewrites in `vercel.json` unter Ausschluss statischer Dateien (`ads.txt`, `robots.txt`, `sitemap.xml`).
   - Terminal-Check via `curl -sI` auf `/`, `/rechner-embed` und `/ads.txt`.

---

## 4. Technische Ausführung

1. **Projektordner sauber benennen**:
   - Ordnername exakt wie die Domain anlegen: `/Users/MRT/Desktop/base44_projekte/[domainname.de]` (KEINE kryptischen Hash-Endungen).
2. **Frontend & Rechner aufbauen**:
   - Modernes, helles Tailwind-Design (Alabaster, Slate, edle Gold/Emerald-Akzente).
   - Rechner-Logik implementieren und Route `/rechner-embed` freischalten.
3. **Gewählte Monetarisierung integrieren**:
   - Bei AdSense: `ads.txt` in `public/` und `dist/`, AdSense-Tag im `<head>`.
   - Bei Amazon: Amazon-Disclaimer, PartnerNet-Klausel im Impressum/Footer.
   - Bei sonstigen Affiliates: Saubere Werbekennzeichnung mit Sternchen (*).
4. **Prebuilt Vercel Build & Deployment**:
   - `npx vercel build --prod`
   - Falls AdSense aktiv: `cp public/ads.txt .vercel/output/static/ads.txt`
   - `npx vercel deploy --prebuilt --prod --yes`
5. **Automatisierter Funktionstest**:
   - `curl` auf alle Endpunkte. Erst bei ausnahmslos 200 OK ist die Domain fertiggestellt.
