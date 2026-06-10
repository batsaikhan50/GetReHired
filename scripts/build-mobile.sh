#!/usr/bin/env bash
# Build the static web bundle for the Capacitor Android/iOS apps.
#
#   ./scripts/build-mobile.sh                # build + cap sync
#
# API routes can't be statically exported, so they are moved aside during the
# build. The bundled app calls the deployed server instead — set the server URL
# in .env.mobile (NEXT_PUBLIC_API_BASE).
set -euo pipefail
cd "$(dirname "$0")/.."

API_DIR="src/app/api"
API_TMP=".api-routes-tmp"

# Load mobile env (NEXT_PUBLIC_API_BASE)
if [ -f .env.mobile ]; then
  set -a; source .env.mobile; set +a
fi
if [ -z "${NEXT_PUBLIC_API_BASE:-}" ]; then
  echo "ERROR: NEXT_PUBLIC_API_BASE is not set. Add it to .env.mobile" >&2
  echo "       e.g. NEXT_PUBLIC_API_BASE=https://getrehired.vercel.app" >&2
  exit 1
fi
echo "Building mobile bundle against API: $NEXT_PUBLIC_API_BASE"

# Hide API routes for the export; always restore them, even on failure.
restore() {
  if [ -d "$API_TMP" ]; then
    rm -rf "$API_DIR"
    mv "$API_TMP" "$API_DIR"
  fi
}
trap restore EXIT
mv "$API_DIR" "$API_TMP"

rm -rf .next out
BUILD_TARGET=mobile NEXT_PUBLIC_API_BASE="$NEXT_PUBLIC_API_BASE" npx next build

restore
trap - EXIT

# Copy the fresh bundle into the native projects.
if [ -f capacitor.config.ts ]; then
  npx cap sync
fi

echo "Done. Open the apps with: npx cap open android | npx cap open ios"
