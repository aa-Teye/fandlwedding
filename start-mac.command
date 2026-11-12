#!/bin/bash
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then double-click this file again."
  read -r -p "Press Enter to close"
  exit 1
fi
if [ ! -d node_modules ]; then
  echo "Installing the site. This takes a minute or two the first time..."
  npm install
fi
echo
echo "Starting the wedding site. Your browser will open http://localhost:1912 in a few seconds."
echo "Keep this window open while you look at the site. Close it to stop."
echo
(sleep 10; open "http://localhost:1912") &
npm run dev
