# Obour family compound: sales website

Static site for GitHub Pages. No build step needed to host it: upload this folder as the repository root and enable Pages.

- `index.html` detects the visitor's device language. Arabic devices go to `ar/`, everything else to `en/`. The visitor's choice from the language switch is remembered.
- `en/` and `ar/` are the two full pages. `assets/` holds styles, script and images.
- The lead form sends through WhatsApp by default. To receive leads by email as well, create a free form at formspree.io, put its endpoint in `FORM_ENDPOINT` inside `Deliverables/02-Landing-Page/build_site.py`, and rebuild.
- Source of the copy and the site generator: `Deliverables/02-Landing-Page/build_landing.py` and `build_site.py`. Rebuild with `python build_site.py https://USERNAME.github.io/REPO/`.
