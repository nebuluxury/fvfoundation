# FV Foundation - Rebuild & SEO Strategy Report

**Project:** Rebuild of fvfoundationforwce.com (The Frank Verney Foundation for Wildlife, Conservation & Education)
**From:** GoDaddy Website Builder (single-page, JS-heavy, ~250KB, no real SEO)
**To:** Hand-coded static multi-page site, fast, fully SEO-optimized
**Date:** 2026-07-13

---

## 1. What I carried over from the live site (their content & images)

**Content, verbatim or lightly polished:**
- Name, tagline ("Be their voice today, so wildlife has a future tomorrow")
- Mission, Vision, Story ("founded to inspire people of all ages...")
- Founding year 1997, "10,000+ trees planted", clean-up drives, "environmental scientists, educators, and activists"
- All 6 education programs (descriptions rewritten tighter but faithful):
  Scales & Tails, Wild Neighbors, Primates & Friends, Beneath the Blue, Sky & Shore, Little Creatures Big Change
- Board: Frank Verney (President), Sarah Ann (VP), Patrick Sanders (Treasurer), Callie Sharkey (Secretary); members Kerry Barnes, Traci Reilly-Hutchings
- All 6 events with dates, times, venues
- Business hours (Mon-Fri 9-5, Sat/Sun closed)
- Social links: Facebook, Instagram, X, YouTube
- "Our Partners" and newsletter sign-up

**Images pulled directly from their live site** (in `assets/img/`):
- `logo.jpg` - their circular emblem logo
- `hero-hyena.jpg` - their spotted-hyena hero image
- `pangolin.jpg` - their pangolin photo
- `content-1.jpg`, `getty-*.jpg` - their conservation/education stock imagery
- `partner-ac.png`, `partner-pcrf.png` - their two partner logos

---

## 2. What I improved / added

**Structure & UX**
- Split the one long GoDaddy page into 6 focused, fast-loading pages with clear navigation
- Sticky header, mobile menu, prominent gold **Donate** button on every page
- Impact stats band (1997 / 10,000+ / 6 programs / 100% community-powered)
- Donation tiers ($25 / $50 / $100 / any) with suggested impact
- "Ways to help" (volunteer / spread awareness / partner) - the old site only had "Donate"
- Program anchor links so the homepage and footer deep-link into each program

**Design**
- Forest-green + gold palette pulled straight from their logo (elephant/tree/ribbon)
- Custom nature icon set (leaf, paw, turtle, fish, bird, bug, primate, wave, etc.)
- Consistent, modern, mobile-first responsive layout with subtle scroll-reveal animation

**SEO (the big one - the GoDaddy site had almost none)**
- Unique, keyword-rich `<title>` and meta description on every page
- Canonical URLs, `robots.txt`, `sitemap.xml`
- Open Graph + Twitter Card tags (rich previews when shared on social/messaging)
- **JSON-LD structured data**: `NGO` schema on the homepage (name, founding date, logo,
  social profiles) and `Event` schema for all fundraisers - these can earn rich results
  and event listings in Google
- Semantic HTML, one `<h1>` per page, descriptive `alt` text on every image
- Fast: no framework, no render-blocking JS, ~17KB homepage HTML vs ~250KB before

---

## 3. Open items - things only YOU can provide

These are placeholders in the build. The current live site does **not** publish them, so I
used sensible defaults and flagged them here. Send them over and I'll wire them in (5 min):

1. **Contact email** - I used `info@fvfoundationforwce.com` as a placeholder in every
   mailto link and the contact form. Tell me the real inbox and I'll swap it everywhere.
2. **Phone number & mailing address** - not shown on the live site. If you want them
   displayed (good for trust + local SEO), send them and I'll add them + a Google Map embed
   and `LocalBusiness`/address structured data.
3. **Donation platform** - the site currently routes "Donate" to a form that emails you.
   For real online giving, pick a platform (Donorbox, Givebutter, PayPal Giving, or Stripe)
   and I'll embed the live donate button/widget.
4. **501(c)(3) / EIN status** - if the Foundation is a registered nonprofit, add the EIN and
   a "donations are tax-deductible" line - it materially boosts donor conversion. I left this
   out rather than claim it.
5. **Program photos** - I used their existing site imagery + matching stock. Real photos of
   your programs, animals, and events would make each program page far stronger.
6. **Event registration links** - "Reserve a Seat" currently goes to the contact form. If you
   sell tickets (Eventbrite, etc.), send links and I'll connect each event.

---

## 4. Suggested next steps (ideas from similar wildlife/conservation nonprofits)

- **Impact/annual-report page** with real numbers (animals helped, kids reached, funds raised)
- **News/blog** for conservation stories - great for ongoing SEO and email content
- **Recurring "monthly guardian" giving** option (steady revenue; most wildlife orgs lead with it)
- **Photo gallery** from events and programs
- **Google Business Profile** + Google Ad Grants ($10k/mo free Google Ads for registered nonprofits)
- **Email capture -> newsletter** wired to a real provider (Mailchimp/Klaviyo) instead of mailto

---

## 5. How to go live
Static files - host on Netlify / Cloudflare Pages / GitHub Pages (all free) or the current host.
Point `fvfoundationforwce.com` at it. Then submit `sitemap.xml` in Google Search Console.
