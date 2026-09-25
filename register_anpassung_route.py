import re

# Update App.jsx
with open("src/App.jsx", "r", encoding="utf-8") as f:
    app_c = f.read()

if "AnpassungGuidePage" not in app_c:
    import_line = "import AnpassungGuidePage from './pages/AnpassungGuidePage';"
    app_c = import_line + "\n" + app_c
    route_line = '<Route path="/ratgeber/kontaktlinsen-anpassen" element={<AnpassungGuidePage />} />'
    app_c = app_c.replace('<Route path="/impressum"', route_line + '\n        <Route path="/impressum"')
    with open("src/App.jsx", "w", encoding="utf-8") as f:
        f.write(app_c)
    print("Updated src/App.jsx")

# Update prerender.js
with open("prerender.js", "r", encoding="utf-8") as f:
    pre_c = f.read()

if "'/ratgeber/kontaktlinsen-anpassen':" not in pre_c:
    entry = """  '/ratgeber/kontaktlinsen-anpassen': {
    title: 'Kontaktlinsen anpassen: Ablauf, Kosten & Parameter | optical.de',
    description: 'Warum Brillenwerte nicht für Linsen reichen: Alles zu Basiskurve (BC), Durchmesser (DIA), Dioptrien-Umrechnung und Ablauf beim Optiker.',
  },
"""
    pre_c = pre_c.replace("  '/rechner-embed': {", entry + "  '/rechner-embed': {")
    with open("prerender.js", "w", encoding="utf-8") as f:
        f.write(pre_c)
    print("Updated prerender.js")

# Update public/sitemap.xml
with open("public/sitemap.xml", "r", encoding="utf-8") as f:
    sm_c = f.read()

if "/ratgeber/kontaktlinsen-anpassen" not in sm_c:
    sm_entry = """  <url>
    <loc>https://www.optical.de/ratgeber/kontaktlinsen-anpassen</loc>
    <lastmod>2026-09-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
"""
    sm_c = sm_c.replace("</urlset>", sm_entry + "</urlset>")
    with open("public/sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sm_c)
    print("Updated public/sitemap.xml")

