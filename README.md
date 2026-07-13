# The Frank Verney Foundation for Wildlife, Conservation & Education

Rebuilt marketing site for **fvfoundationforwce.com** - a hand-coded, fast, SEO-optimized
static site replacing the GoDaddy Website Builder version.

## Stack
Plain HTML + CSS + a little vanilla JS. No build step, no dependencies. Hostable anywhere
(Netlify, Cloudflare Pages, GitHub Pages, S3, or the existing host).

## Pages
- `index.html` - Home (hero, mission/vision, story, programs, events, partners, newsletter)
- `about.html` - Mission, vision, story, expertise, board of directors
- `programs.html` - The 6 education programs (each with an anchor id)
- `events.html` - 2026 events & fundraisers (with Event structured data)
- `get-involved.html` - Donate tiers, donation form, volunteer, partner
- `contact.html` - Contact form + hours + socials

## Assets
- `assets/styles.css` - design system (forest-green / gold nature palette)
- `assets/icons.svg` - inline SVG icon sprite (loaded once by app.js)
- `assets/app.js` - mobile nav, mailto forms, scroll reveal, active-nav
- `assets/img/` - real images pulled from the live site (logo, hyena hero, pangolin,
  conservation stock, partner logos)

## Preview locally
Because `app.js` fetches the icon sprite, open it via a server (not file://):

```
cd fvfoundation
python3 -m http.server 8848
# then open http://localhost:8848/
```

## SEO built in
Unique title + meta description per page, canonical URLs, Open Graph + Twitter cards,
JSON-LD (NGO + Events), semantic headings, descriptive alt text, `sitemap.xml`, `robots.txt`.

See `STRATEGY-REPORT.md` for the full rundown and the short list of items only you can fill in.
