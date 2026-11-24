#!/usr/bin/env bash
# exit on errors, unset vars are errors, whole pipe fails even if start or middle fails
set -euo pipefail

# change these based on setup deltas
REPO="$HOME/Documents/GitHub/jsauve.ca/jsauve/"
REMOTE='remilien:/var/www/html'

cd "$REPO"

# block deployment if changes are uncommitted
# i.e. if there is a non-zero git diff with HEAD
if ! git diff --quiet HEAD; then
    echo "Uncommitted changes in $REPO." >&2
    exit 1
fi

git switch main
# prevent unintended rebase
git pull --ff-only
# clean install
npm ci
npm run build

# check to prevent wiping remote if dist/ is empty
if [[ ! -f dist/index.html ]]; then
    echo "dist/index.html is missing. Aborting sync." >&2
    exit 1
fi

rsync -avz --delete dist/ "$REMOTE" 

printf "\nSite synced successfully!!\n\n"
