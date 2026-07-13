#!/usr/bin/env bash
# One-time Cloudflare Pages deploy for the FV Foundation portal site.
# Prereq: run `npx wrangler login` once in this terminal first.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> 1. Verify wrangler login"
npx wrangler whoami >/dev/null 2>&1 || { echo "Not logged in. Run: npx wrangler login  (then re-run this script)"; exit 1; }

echo "==> 2. Create KV namespace PORTAL_KV"
OUT=$(npx wrangler kv namespace create PORTAL_KV 2>&1 || true); echo "$OUT"
KV_ID=$(echo "$OUT" | grep -oE '[0-9a-f]{32}' | head -1)
if [ -n "${KV_ID:-}" ]; then
  perl -0pi -e "s/REPLACE_WITH_KV_NAMESPACE_ID/$KV_ID/" wrangler.toml
  echo "   wrangler.toml now points at KV id: $KV_ID"
else
  echo "   !! Could not detect KV id automatically. Copy it from the output above into wrangler.toml."
fi

echo "==> 3. Create the Pages project (ignore error if it already exists)"
npx wrangler pages project create fvfoundation --production-branch main 2>/dev/null || true

echo "==> 4. Deploy the site"
npx wrangler pages deploy . --project-name fvfoundation --commit-dirty=true

cat <<'NOTE'

==> 5. FINISH IN A FEW COMMANDS (secrets + KV binding)

  # Portal login password Frank will use:
  npx wrangler pages secret put PORTAL_PASSWORD --project-name fvfoundation

  # A long random string to sign login sessions (any 40+ random chars):
  npx wrangler pages secret put SESSION_SECRET --project-name fvfoundation

Then in the Cloudflare dashboard: Pages > fvfoundation > Settings > Functions >
"KV namespace bindings" > add binding  Variable name: PORTAL_KV  ->  the PORTAL_KV namespace.
(Re-deploy once after adding the binding: npx wrangler pages deploy . --project-name fvfoundation)

Portal will be live at:  https://fvfoundation.pages.dev/portal
Point fvfoundationforwce.com at the Pages project under Custom domains.
NOTE
