# Vibe coding securely

Practical habits for building with AI coding agents without shipping security gaps. Each habit follows one pattern: write the rule down, then enforce it with a check that doesn't depend on the agent remembering.

| # | Habit | Part |
|---|-------|------|
| 1 | Give the agent standing security context | [Part 1: Context and review](01-context-and-review/) |
| 2 | Review everything that touches auth | [Part 1: Context and review](01-context-and-review/) |
| 3 | Hunt for placeholders | [Part 2: Placeholders and secrets](02-placeholders-and-secrets/) |
| 4 | Keep secrets out of the code | [Part 2: Placeholders and secrets](02-placeholders-and-secrets/) |
| 5 | Check what it installs | [Part 3: Dependencies and attacker testing](03-dependencies-and-attacker-testing/) |
| 6 | Test like an attacker | [Part 3: Dependencies and attacker testing](03-dependencies-and-attacker-testing/) |

## Quick start

1. Copy [`agent-rules.md`](agent-rules.md) into your agent's instruction file (AGENTS.md, CLAUDE.md, or your rules file) and customize it for your app.
2. Install the [pre-commit hook](02-placeholders-and-secrets/pre-commit).
3. Add the [dependency check](03-dependencies-and-attacker-testing/check-deps.mjs) and [attacker tests](03-dependencies-and-attacker-testing/) to CI.

Rules guide the agent. Checks catch what slips through.

---

Maintained by [Aevlo Security](https://github.com/aevlo-security).
