# Security rules for AI coding agents

Drop this section into AGENTS.md, CLAUDE.md, or your agent's rules file, then customize the roles, data, and libraries for your app. Rules guide the agent; back them with tests and CI checks that enforce them.

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

### When you finish a task
- List every change that touches authentication, authorization, or sensitive data
- List any new dependencies
