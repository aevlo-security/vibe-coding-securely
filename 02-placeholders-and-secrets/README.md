# Part 2: Placeholders and secrets

Rules to add to your agent's instruction file (AGENTS.md, CLAUDE.md, or your rules file), plus a pre-commit hook that enforces them. The rules guide the agent. The hook catches what slips through.

## 1. Add the rules to your agent's instruction file

Copy [`agent-rules.md`](agent-rules.md).

## 2. Add the pre-commit hook

Copy [`pre-commit`](pre-commit) to `.git/hooks/pre-commit` and make it executable:

```bash
cp pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Adjust `SENSITIVE_PATHS` to match your repo.

Git hooks are local and aren't shared when someone clones the repo. Run the same checks in CI so they apply to everyone.

## 3. Add these lines to .gitignore

See [`gitignore-snippet`](gitignore-snippet):

```
.env
.env.*
!.env.example
```

## 4. If a secret gets committed

1. Rotate it immediately. Deleting it from the code doesn't remove it from git history.
2. Check the provider's logs for any use of the leaked key.
3. Remove it from git history if the repo is shared or public.
4. Add the pattern to your hook so it can't happen again.

Previous: [Part 1: Context and review](../01-context-and-review/) · Next: [Part 3: Dependencies and attacker testing](../03-dependencies-and-attacker-testing/)
