#!/usr/bin/env bash
# Opens a fresh PR from the seed branch. See README.md.
set -euo pipefail

SEED="seed/discount-codes"

if [[ -n "$(git status --porcelain)" ]]; then
	echo "Working tree is dirty. Commit or discard your changes first." >&2
	exit 1
fi

git checkout --quiet main
git fetch --quiet --prune origin

gh pr list --state open --limit 100 --json number,headRefName \
	--jq '.[] | select(.headRefName | startswith("run/")) | .number' |
	while read -r pr; do
		gh pr close "$pr" --delete-branch </dev/null
	done

BRANCH="run/$(date +%Y%m%d-%H%M)"
git checkout --quiet -b "$BRANCH" "origin/$SEED"
git push --quiet -u origin "$BRANCH"
gh pr create --base main --head "$BRANCH" \
	--title "Add discount codes" \
	--body "Adds discount codes: create a code, describe it and redeem it at checkout."
echo "PR #$(gh pr view --json number --jq .number) is open on $BRANCH."
