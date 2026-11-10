# Security rules for AI coding agents

All rules from the series in one file. Drop this into AGENTS.md, CLAUDE.md, or your agent's rules file, then customize the roles, data, and libraries for your app. Rules guide the agent; back them with tests and CI checks that enforce them.

## Security rules (apply to every task)

### Roles and access
- Roles: admin, member, viewer
- Members can only read or change records where record.org_id matches their org
- Only admins can manage users, billing, and API keys

### Sensitive data
- Never log or return: passwords, API keys, tokens, card numbers, SSNs
- Strip internal IDs and owner fields from public API responses

### Always
- Check object ownership on every endpoint that takes an ID, using the shared authorization middleware
- Use parameterized queries. No string-built SQL
- Read secrets from environment variables only
- Deny access by default if a check can't be completed

### Never
- Hardcode credentials, keys, or test users
- Disable or bypass auth, even temporarily or "for testing"
- Add a dependency without asking first

### Approved libraries
- Auth: [your auth library]
- Cryptography (password hashing, encryption, token signing, random values): [your library]. Never write custom crypto
- File uploads: [your upload handler]

### Placeholders
- Never ship incomplete code or skip a security check
- If you can't complete a security check, deny access by default and tell me
- Never leave TODO or FIXME comments in authentication, authorization, payment, or access control code
- Never write a function that returns true or skips validation as a temporary stand-in

### Secrets
- Never write a key, token, or password into code, config files, or tests
- Never put secrets or privileged API keys in frontend code
- When a new secret is needed, add a placeholder to .env.example and tell me

### Dependencies
- Only use packages listed in approved-packages.txt
- Pin exact versions. No ^, ~, *, or latest
- Never install a package you haven't confirmed exists and is actively maintained

### Attacker testing
- Never trust prices, totals, discounts, or roles sent by the client. Look them up on the server
- Reject quantities of zero or less
- For every endpoint that accepts input, write abuse tests: extra fields, steps out of order, and values that shouldn't be allowed
- For every endpoint that takes an object ID, write a test proving a second user can't read, change, or delete it
- Never mark a feature done until its abuse tests pass

### When you finish a task
- List every change that touches authentication, authorization, or sensitive data
- List any new dependencies
