# Contributing Guide

## Workflow
1. Branch from `main` using short-lived branches: `feature/*`, `fix/*`, `chore/*`, `security/*`.
2. Keep changes scoped and small.
3. Open a pull request using the PR template.
4. Merge only after required checks pass and review approval is granted.

## Local setup
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm start`
- Database setup/reset: `cd backend && node scripts/setup.js` (destructive)

## Testing before PR
- Backend tests: `cd backend && TEST_DATABASE_URL=<url> npm test`
- Frontend verification: `cd frontend && npm run build`

## Code conventions
- Keep routes thin; put business logic in controllers/services.
- Reuse existing enums/literals for sections/roles/status values.
- Preserve API response shape expected by frontend (`status`, `data`, optional `results`).
- Use shared Axios client in frontend (`frontend/src/services/api.js`), not ad-hoc clients.

## Security and privacy
- Follow `SECURITY.md` and `docs/compliance.md`.
- Call out any personal data handling changes explicitly in PRs.
