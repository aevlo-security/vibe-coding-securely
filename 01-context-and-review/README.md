# Part 1: Context and review

Habits 1 and 2: give the agent standing security context, and review everything that touches authentication and access control.

## Habit 1: Give the agent standing security context

A prompt covers one request. Your agent's instruction file is read every session. Copy [`agent-rules.md`](agent-rules.md) into AGENTS.md, CLAUDE.md, or your agent's rules file, then customize the roles, data, and libraries for your app.

Treat that file like code and review every change to it. A malicious edit can quietly tell the agent to write insecure code.

## Habit 2: Review everything that touches auth

- **Rule:** "List every authentication or access control change in your summary." (Included in the rules file.)
- **Check:** nothing that touches auth gets merged without a human review. A CODEOWNERS entry on your auth paths is one way to require it.

**Example:** the agent adds `GET /api/invoices/:id`. Being logged in isn't enough. Confirm it checks that the invoice belongs to the user asking for it.

Next: [Part 2: Placeholders and secrets](../02-placeholders-and-secrets/)
