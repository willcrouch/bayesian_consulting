# Bayesian Consulting — Website

Static one-page site for Bayesian Consulting LLC. Plain HTML / CSS / JS — no build step.

## Files

```
index.html     # page structure & content
styles.css     # all styles
script.js      # hex grid, mobile nav, scroll reveal
README.md      # this file
```

## Run locally

Open `index.html` in a browser. That's it.

If you want a local server (recommended so relative paths behave like production):

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000.

## Deploy with GitHub Pages

1. Create a repo (e.g. `bayesian-consulting-site`) and push these four files to `main`.
2. In the repo → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Pick branch `main`, folder `/ (root)`. Save.
5. After a minute, your site is at `https://<your-username>.github.io/<repo-name>/`.

### Using your custom domain (bayesian.consulting)

1. In **Settings → Pages → Custom domain**, enter `bayesian.consulting` (or `www.bayesian.consulting`).
2. At your DNS provider, add either:
   - **Apex** (`bayesian.consulting`): four A records pointing to GitHub's IPs
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **Subdomain** (`www.bayesian.consulting`): a CNAME pointing to `<your-username>.github.io`
3. Wait for DNS to propagate, then enable **Enforce HTTPS** in the same Pages settings panel.

GitHub will create a `CNAME` file in the repo automatically when you save the custom domain — don't delete it.

## Editing content

Almost everything you'll want to change is in `index.html`:

- **Service cards**: search for `<article class="card"` — there are four.
- **About blurb**: the `<section id="about">` block.
- **Contact email** appears in three places: the email link, the footer link, and the email's `mailto:` href. Find/replace if it ever changes.

The color palette and type sizes live at the top of `styles.css` under `:root` — change values there to retheme the whole site.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The hexagon grid relies on `IntersectionObserver` and SVG, both ubiquitous since ~2018.
