with open("src/pages/AnpassungGuidePage.jsx", "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace("import Breadcrumbs from '../components/Breadcrumbs';", "")
c = c.replace("<Breadcrumbs items={breadcrumbItems} />", """        {/* Breadcrumb nav */}
        <nav className="text-xs text-slate-500 flex items-center space-x-2">
          <Link to="/" className="hover:underline">Startseite</Link>
          <span>/</span>
          <Link to="/vergleichskatalog" className="hover:underline">Katalog</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Kontaktlinsen anpassen</span>
        </nav>""")

with open("src/pages/AnpassungGuidePage.jsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Fixed Breadcrumbs in AnpassungGuidePage")
