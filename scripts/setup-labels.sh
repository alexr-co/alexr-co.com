#!/usr/bin/env bash
# One-time setup: create the standard label set on this GitHub repo via gh CLI.
# Requires: gh CLI installed and authenticated (run `gh auth login` first).
# Idempotent: safe to re-run — existing labels are skipped.

set -euo pipefail

if ! command -v gh &>/dev/null; then
    echo "Error: gh CLI not installed."
    echo "Install with: brew install gh"
    echo "Then run: gh auth login"
    exit 1
fi

# Format: name|color|description
LABELS=(
    "bug|d73a4a|Something is broken or behaving unexpectedly"
    "enhancement|a2eeef|Improvement to an existing feature"
    "feature|0e8a16|A new feature"
    "infra|6f42c1|Infrastructure, CI/CD, or deployment work"
    "content|fbca04|Writing, journal, or copy changes"
    "docs|0075ca|Documentation updates"
    "question|d876e3|Open question or discussion needed"
    "wontfix|ffffff|Decided not to work on this"
    "duplicate|cfd3d7|Duplicate of another issue"
)

for entry in "${LABELS[@]}"; do
    IFS='|' read -r name color description <<<"$entry"
    if gh label create "$name" --color "$color" --description "$description" 2>/dev/null; then
        echo "Created: $name"
    else
        echo "Exists (skipped): $name"
    fi
done

echo ""
echo "Labels configured."
