#!/usr/bin/env bash
# One-time setup: symlink versioned git hooks from scripts/git-hooks/ into .git/hooks/.
# Run after cloning the repo.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_SRC="$REPO_ROOT/scripts/git-hooks"
HOOKS_DST="$REPO_ROOT/.git/hooks"

if [[ ! -d "$HOOKS_DST" ]]; then
    echo "Error: $HOOKS_DST does not exist. Are you in a git repository?"
    exit 1
fi

for hook in "$HOOKS_SRC"/*; do
    [[ -f "$hook" ]] || continue
    name=$(basename "$hook")
    target="$HOOKS_DST/$name"

    # Symlink rather than copy so updates to the versioned hook auto-apply
    ln -sf "../../scripts/git-hooks/$name" "$target"
    chmod +x "$hook"
    echo "Installed: $name"
done

echo ""
echo "Git hooks installed. Bypass with 'git commit --no-verify' if ever needed."
