// Commitlint config used by the CI workflow (.github/workflows/commitlint.yml).
// The local shell hook (scripts/git-hooks/commit-msg) does basic regex validation
// independently; this file provides the fuller rule set for CI.
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
