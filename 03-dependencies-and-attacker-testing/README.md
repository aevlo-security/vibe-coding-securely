# Part 3: Dependencies and attacker testing

Rules to add to your agent's instruction file (AGENTS.md, CLAUDE.md, or your rules file), plus checks that enforce them. Examples use Node.js 20+ with no extra packages. Adapt the same pattern to your stack.

## 1. Add the rules to your agent's instruction file

Copy [`agent-rules.md`](agent-rules.md).

## 2. Check dependencies on every change

[`check-deps.mjs`](check-deps.mjs) fails if package.json includes a package that isn't approved or a version that isn't pinned.

Create [`approved-packages.txt`](approved-packages.txt) with one package name per line, then run it in CI alongside your package manager's vulnerability audit:

```
node check-deps.mjs && npm audit --audit-level=high
```

This checks direct dependencies. Commit your lockfile and install with `npm ci` so transitive dependencies stay locked too.

## 3. Test authorization

[`authz.test.mjs`](authz.test.mjs) checks that a second user can't read another user's invoice and that a regular user can't reach admin endpoints. Run with `node --test`. Point it at a test environment, never production. Adjust the endpoints to match your app.

Extend the same pattern to update and delete: User B sends PUT, PATCH, or DELETE to User A's object and should be denied.

## 4. Test checkout for price tampering

[`checkout.test.mjs`](checkout.test.mjs) checks that the server ignores a price sent by the browser and rejects negative quantities. Run with `node --test`. Adjust the endpoints and `PRODUCT_ID` for your app.

## Environment variables

| Variable | Used by | Purpose |
|----------|---------|---------|
| `BASE_URL` | both tests | Test environment URL (default `http://localhost:3000`) |
| `USER_A_EMAIL`, `USER_A_PASSWORD` | both tests | First test account |
| `USER_B_EMAIL`, `USER_B_PASSWORD` | authz test | Second test account, regular user |
| `PRODUCT_ID` | checkout test | Product to order (default `42`) |

Run sections 3 and 4 in CI and block the merge if any test fails.

## Further reading

- Spracklen et al., "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs," USENIX Security 2025: https://arxiv.org/abs/2406.10279

Previous: [Part 2: Placeholders and secrets](../02-placeholders-and-secrets/)
