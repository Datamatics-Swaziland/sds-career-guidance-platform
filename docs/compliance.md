# Compliance Baseline (Data Protection Act, 2022)

## Legal reference
- Working reference source: Eswatini Data Protection Act, 2022 (EDPA-hosted PDF)
  - https://www.edpa.org.sz/assets/documents/DATA%20PROTECTION%20ACT.pdf
- Regulator context:
  - https://www.edpa.org.sz/
  - https://www.edpa.org.sz/RegulatoryFrameworks.html

## Engineering control matrix

| Control area | Implementation baseline | Evidence/owner |
|---|---|---|
| Access control | JWT auth + role checks (`verifyToken`, `restrictTo`) on protected routes | Backend owner, PR reviews |
| Data minimization | Keep request payloads schema-validated with Joi | API owner, validation tests |
| Auditability | Log security-sensitive actions via `logger` and `AuditLog` | Security owner, log review |
| Secure SDLC | Required PR checks (CI, CodeQL, secret scan, dependency audit) | Dev lead, branch protection settings |
| Secret management | Use GitHub environment secrets; no secrets in repo | Platform owner, scan reports |
| Data subject rights | Maintain documented request workflow and response SLA | Product + legal, DSR register |
| Incident response | Maintain breach triage + notification runbook | Security lead, drill records |
| Retention/deletion | Define retention by dataset and deletion procedures | Data owner, retention policy |

## Required team actions before onboarding developers
1. Enable branch protection on `main` with required status checks.
2. Enable secret scanning and push protection in GitHub security settings.
3. Create GitHub environments: `development`, `staging`, `production` with reviewer gates.
4. Confirm legal/compliance review of this baseline before production rollout.

## Notes
- This document is an engineering baseline and not legal advice.
- Final legal interpretation must be confirmed by authorized legal/compliance officers.
