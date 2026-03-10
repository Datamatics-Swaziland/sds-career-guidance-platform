# Incident Response Runbook

## Scope
Security incidents involving confidentiality, integrity, or availability of this platform.

## Severity
- **Critical**: Active data breach or major service compromise
- **High**: Confirmed vulnerability with realistic exploitation path
- **Medium**: Security weakness without confirmed impact

## Response timeline targets
- Acknowledge and triage: within 1 hour (critical), 1 business day (others)
- Containment: immediate for critical incidents
- Regulator notification path: prepare for legal-required timelines (including 72-hour handling expectation where applicable)

## Steps
1. Detect and log incident details (time, systems, suspected data impact).
2. Contain (disable compromised credentials/sessions, isolate affected systems).
3. Assess impact (data types, user count, legal exposure, persistence).
4. Escalate to dev lead + security + legal/compliance.
5. Patch/remediate and verify containment.
6. Communicate internally and externally per legal guidance.
7. Complete post-incident review with corrective actions.

## Evidence checklist
- Relevant logs/audit entries
- Timeline of actions
- Root cause and remediation commit/PR links
- Preventive actions and owners
