# Deploying the FV Foundation portal site (Cloudflare Pages)

The public site is static, but the **editable portal** (where Frank edits text and swaps
photos) needs Cloudflare Pages Functions + a KV store. GitHub Pages can't run those, so the
live site moves to Cloudflare - the same free setup Frank's Pet Service uses.

## Fastest path (one script)

```bash
cd ~/Documents/git/fvfoundation
npx wrangler login          # opens a browser once
./deploy-cloudflare.sh      # creates KV, project, and deploys
```

Then set the two secrets and the KV binding the script prints at the end:

```bash
npx wrangler pages secret put PORTAL_PASSWORD --project-name fvfoundation   # Frank's login password
npx wrangler pages secret put SESSION_SECRET  --project-name fvfoundation   # any long random string
```

Finally, in the Cloudflare dashboard: **Pages → fvfoundation → Settings → Functions → KV namespace
bindings** → add `PORTAL_KV` → the namespace the script created, then redeploy once.

## What Frank gets

- Public site: `https://fvfoundation.pages.dev` (then point `fvfoundationforwce.com` to it)
- Portal: `https://fvfoundationforwce.com/portal` - he logs in with the PORTAL_PASSWORD,
  picks a page, clicks any text to edit or any photo to swap, and hits **Save**. Edits are
  applied server-side (so Google sees them too) and can be rolled back with **Reset all**.
- Dashboard: visitor traffic (once Cloudflare Web Analytics is added) + every contact-form inquiry.

## Notes
- Secrets (`PORTAL_PASSWORD`, `SESSION_SECRET`) live only in Cloudflare - never in the repo.
- Optional analytics: add `CF_ANALYTICS_TOKEN`, `CF_ACCOUNT_ID`, `WEB_ANALYTICS_SITE_TAG`
  secrets to light up the traffic charts (dashboard shows "tracking being switched on" until then).
- The GitHub repo still serves a static preview at the old Pages URL, minus the portal.
