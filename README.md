# GovHelm Website

The public website for **GovHelm**, the Government-as-a-Service platform from
Muneris: a 19-page static site covering the platform, its architecture, its
documentation and the commercial model behind it.

GovHelm is commercial software under a per-tenant subscription. The site says so
plainly rather than implying openness.

No build step, no dependencies, no framework. Every page is plain HTML served
as-is, sharing one stylesheet and one small progressive-enhancement script.

## Running it

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static host will serve it unchanged, including GitHub Pages (set the source
to this branch and the root directory).

Opening `index.html` straight off disk mostly works, but **the fonts do not load
from `file://`** — font fetches are CORS-scoped, so the page falls back to Arial.
Serve the folder over HTTP to see it as deployed.

## Layout

```
index.html              Home
about.html              About GovHelm and Muneris
features.html           What the platform does
capabilities.html       The Common Core catalogue and the extensions
architecture.html       Common Core, profiles, record, policy, events
jurisdictions.html      The profile model and the eight reference profiles
integrations.html       The governed connector seam
security.html           Minimisation, audit, isolation, sovereignty
accessibility.html      WCAG 2.2 AA commitment and testing
docs.html               Documentation index
api.html                REST routes, open data and the event backbone
deployment.html         One image, one tenancy, GitOps promotion
roadmap.html            What is built and what comes next
comparison.html         How GovHelm compares, with maturity markers
scenarios.html          Illustrative deployment scenarios
editions.html           GovHelm Housing and the edition model
news.html               Build notes and product updates
faq.html                Commercial, technical, governance and risk
contact.html            Demonstrations, evaluation, security, partners

assets/css/site.css     The whole stylesheet, sectioned and commented
assets/js/site.js       Theme toggle, nav dropdowns, mobile menu
assets/brand/           Lockups, icons, favicon, social card, manifest
assets/fonts/           Self-hosted woff2 subsets and their licence
```

## Where the content comes from

Every capability, connector, jurisdiction profile, decision record and API route
described on this site is taken from the **GovHelm platform repository** — the
capability catalogue, the committed jurisdiction profiles, the connector
modules, the architecture decision records and the server routes. The site and
the code are meant to be checkable against each other.

When the platform changes, these pages are the ones to change with it:

| Platform change | Pages to update |
|---|---|
| A capability wired end to end | `capabilities.html`, `comparison.html`, `roadmap.html`, `index.html` |
| A new jurisdiction profile | `jurisdictions.html`, `security.html` |
| A new connector | `integrations.html`, `features.html` |
| A new decision record | `architecture.html`, `docs.html` |
| A new or changed route | `api.html` |

## Brand

GovHelm's own brand, not the Housing edition's. The **GovHelm Housing sub-brand
pack v1.0** states that the edition reuses the GovHelm mark, wordmark and
typefaces and owns only the `Housing` descriptor, Community Green and the
product icon — so the parent artwork here is the edition artwork with the
descriptor removed and the mark's own colours restored.

### Rules the site obeys

- **The lockup is artwork, never live text.** `assets/brand/lockup-horizontal.svg`
  on light, `lockup-horizontal-reversed.svg` on dark — the full-colour artwork
  must never go on a dark surface. Both are in the markup and CSS swaps them by
  theme. The link's accessible name comes from a visually hidden span, so it
  survives either state.
- **Minimum lockup width is 110px.** The header renders it at 134px, dropping to
  114px under 560px wide — never below the minimum. 134&times;40 renders the mark
  at exactly the size the Housing edition renders it, so the two sites' headers
  match optically.
- **Helm Blue `#2457D6` may carry text.** It is 6.16:1 on white and 5.56:1 on
  Paper, so unlike the edition's Community Green it needs no separate text
  colour: one blue is both the mark colour and the word colour.
- **Blue and navy do different jobs.** Helm Blue is *action* — links, buttons,
  focus rings, anything you can operate. Deep Navy is *structure* — the CTA band,
  code surfaces, diagram cores, the skip link. Nothing uses one for the other's
  job.
- **Only the loaded weights are used.** Familjen Grotesk 500/600/700 for display,
  Archivo 400/500 for body, IBM Plex Mono 400/500 for data. `--w-bold`,
  `--w-semi` and `--w-med` exist so no rule can ask for a weight that would be
  synthesised.

### Colour tokens

Six brand tokens are used verbatim at the top of `site.css` (Ink, Paper, White,
Slate, Mist, Helm Blue), plus the reversed blue `#BFD3FF` taken from the
reversed lockup artwork. Everything else is derived and marked as derived.
**The platform palette has no amber**, so the caution treatment uses Deep Navy
rather than an invented colour — worth a decision if you want a true warning hue.

### Still to confirm

- **No GovHelm parent brand pack was available** when this site was built. The
  palette above is reconstructed from the Housing sub-brand pack (which names the
  tokens it inherits) and from the committed lockup artwork. **Deep Navy
  `#0B1733` is derived, not authored.** If a parent pack exists, reconcile the
  `--gh-*` block in `site.css` against it before sign-off.
- **The parent lockup and icon are derived artwork**, generated by removing the
  `Housing` descriptor from the edition lockup and restoring the mark's colours
  (spokes and hub in Helm Blue, hub at r=14 as the edition's own comment
  records). If master GovHelm artwork exists, drop it in under the same
  filenames.
- `registry.example.gov`, the `gaas` image name, `gov.je` as a tenant host and
  the environment variable names quoted on `api.html` and `deployment.html` come
  from the platform repository's reference descriptors. They are placeholders
  there too; confirm them against what you actually register and deploy.

### Typography is self-hosted

Familjen Grotesk, Archivo and IBM Plex Mono are served from `assets/fonts/`
(Latin and Latin Extended, 14 files, ~288&nbsp;KB), so no visitor request leaves
the site to fetch a typeface — which also avoids the third-party-transfer
question a public sector buyer will ask. All three faces are SIL OFL;
`assets/fonts/OFL.txt` carries the licence.

## Editing

- **Content** lives directly in each `.html` file.
- **Design tokens** — colours, spacing, radii, type — are CSS custom properties
  at the top of `assets/css/site.css`. Change them there rather than in
  individual rules; light and dark values are defined in three matching blocks
  (`:root`, the `prefers-color-scheme: dark` block, and `[data-theme="dark"]`).
- **Navigation** is duplicated in the header, the mobile menu and the footer of
  every page. Adding or renaming a page means updating all three in each file.

## Things worth preserving

The site was built to the standard it describes, so a few properties are worth
keeping intact when editing:

- **Accessibility.** All text meets WCAG 2.2 AA contrast in both themes; every
  link and button has an accessible name; the first tab stop is a skip link; the
  nav dropdowns are click-operated with `aria-expanded` and Escape support.
- **Works without JavaScript.** The script only adds the theme toggle and the
  menu behaviour. Every link is present in the markup regardless.
- **No horizontal scroll** at 390px; tables, diagrams and code blocks scroll
  inside their own containers rather than stretching the page. Long identifiers
  (`residential_qualification_control`) break rather than widening a card —
  that is what `overflow-wrap` on `.card-tag` is for.
- **Theme-aware.** Pages follow the operating system theme by default and
  remember an explicit choice in `localStorage`.

## Maturity markers

Capability claims are marked with one of three words, used precisely and defined
on `comparison.html`:

- **Deployed** — running in a live government service, handling real citizens.
- **Built** — code complete and in a version you can run today.
- **Designed** — registered and specified, not yet wired.

GovHelm currently has **no Deployed capabilities**: it is pre-release, running in
reference and evaluation environments only. `comparison.html` says so
prominently, `capabilities.html` marks each capability, and `roadmap.html` works
from the same list. Keep these in step — a capability that moves from Designed to
Built must change in all three.

## Content status

The copy describes GovHelm as a pre-release platform and is a first draft for
review rather than approved communications. Three things need a decision before
this is published:

- **No prices appear anywhere.** The site describes the pricing *shape* —
  per-tenant, banded by population, plus capability modules and a transparent
  implementation quote — and says a figure is given on the first call. Whether to
  publish an actual number is a commercial decision that has not been taken.
- **No contact details appear anywhere.** `contact.html` describes the routes in
  — demonstrations, evaluation, security, accessibility, partners, procurement —
  but carries a note where the addresses and numbers belong.
- **`editions.html` has no link to the GovHelm Housing site**, because that site
  is not published yet. When it is, add the URL in both places the page mentions
  it and remove the note that says it is unpublished.
- **The dates on `news.html` are placeholders.** Each entry describes work that
  is genuinely in the platform repository, but the dates were assigned when the
  page was written and should be reconciled against the actual commit history
  before publication.

The deployment scenarios on `scenarios.html` are explicitly labelled as
illustrative composites built from the committed reference profiles, not
accounts of work delivered for a named government. Replace them with real case
studies as jurisdictions go live.

Commercial claims made on the site that need signing off: the per-tenant
subscription banded by population, capability modules, source code review under
NDA, source code escrow, documented exports and exit terms in the contract, and
statutory changes delivered under the subscription.

`comparison.html` compares GovHelm against four **archetypes** — enterprise
government cloud, systems integrator, open DPI framework, in-house build — not
four named vendors. The platform repository's competitive research names
suppliers, but it flags the confidence of every figure and says to validate
before external use, and a supplier publishing unverified capability claims about
named competitors is both unreliable and legally exposed. If you want named
columns, supply the verified analysis; the table structure takes them without
change.

## Copyright

© 2026 Muneris. GovHelm and GovHelm Housing are trademarks of Muneris.
This website and its content are not licensed for reuse.
