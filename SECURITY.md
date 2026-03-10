# Security Policy

## Supported branch
- `main` is the only supported release branch.

## Reporting a vulnerability
- Do **not** open public issues for vulnerabilities.
- Report privately to the project security contact and Datamatics security lead.
- Include: affected endpoint/module, reproduction steps, impact, and suggested fix.

## Response targets
- Acknowledgement: within 1 business day
- Triage and severity assignment: within 3 business days
- Remediation target:
  - Critical: 24-72 hours
  - High: 7 days
  - Medium: 30 days

## Security requirements for contributors
- Never commit secrets, credentials, tokens, or production data.
- Use least privilege for local and cloud credentials.
- Preserve audit logging for security-sensitive actions.
- For auth/session changes, verify compatibility with frontend refresh-token flow.

## Disclosure
- Coordinated disclosure is required.
- Public advisories are published only after patch deployment.
