# Data Subject Rights Handling

## Rights workflow
1. Intake request (access/correction/deletion/restriction/portability/objection).
2. Verify requester identity.
3. Classify request and affected systems.
4. Execute approved action with auditable record.
5. Respond within legal/policy timelines.

## Operational controls
- Keep a request register (date received, requester, type, status, completion date).
- Require dual review for deletion requests.
- Ensure exports/deletions include all relevant backend entities.
- Record decisions and exceptions with reason codes.

## Implementation touchpoints in this repo
- Authenticated user profile and account endpoints in `backend/src/routes/auth.routes.js`.
- User/account data models in `backend/src/models/`.
- Audit logging via `backend/src/models/AuditLog.js` and middleware/controllers.
