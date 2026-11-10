# Agent rules: dependencies and attacker testing

### Dependencies
- Ask before adding any new dependency
- Only use packages listed in approved-packages.txt
- Pin exact versions. No ^, ~, *, or latest
- Never install a package you haven't confirmed exists and is actively maintained

### Attacker testing
- Never trust prices, totals, discounts, or roles sent by the client. Look them up on the server
- Reject quantities of zero or less
- For every endpoint that accepts input, write abuse tests: extra fields, steps out of order, and values that shouldn't be allowed
- For every endpoint that takes an object ID, write a test proving a second user can't read, change, or delete it
- Never mark a feature done until its abuse tests pass
