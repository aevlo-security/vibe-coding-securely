# Agent rules: placeholders and secrets

### Placeholders
- Never ship incomplete code or skip a security check
- If you can't complete a security check, deny access by default and tell me
- Never leave TODO or FIXME comments in authentication, authorization, payment, or access control code
- Never write a function that returns true or skips validation as a temporary stand-in

### Secrets
- Read secrets only from environment variables
- Never write a key, token, or password into code, config files, or tests
- Never put secrets or privileged API keys in frontend code
- When a new secret is needed, add a placeholder to .env.example and tell me
