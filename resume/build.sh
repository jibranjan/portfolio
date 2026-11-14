#!/bin/sh
# Renders resume.html to Jibran-Jan-Resume.pdf with headless Chrome.
set -e
cd "$(dirname "$0")"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
  --user-data-dir="$PROFILE" \
  --print-to-pdf="Jibran-Jan-Resume.pdf" \
  "file://$PWD/resume.html"
