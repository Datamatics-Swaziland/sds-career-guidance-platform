# Copilot Instructions for SDS Career Guidance Platform

## Architecture at a Glance
- Monorepo with two deployable apps: `backend/` (Express + Sequelize + PostgreSQL) and `frontend/` (React + Axios + Tailwind).
- Backend boot flow is `backend/server.js` → `backend/src/app.js`; all API routes are mounted under `/api/v1/*`.
- Frontend uses full prefixed endpoints (example: `/api/v1/assessments/questions`) via the shared Axios client in `frontend/src/services/api.js`.
- Core domain path is: start/resume assessment → save progressive answers → complete assessment → compute RIASEC/Holland code → fetch matched occupations.

## SDS Domain Rules (Do Not Drift)
- Assessment sections are fixed enums: `activities`, `competencies`, `occupations`, `self_estimates` (see `backend/src/models/Answer.js`).
- `Answer.value` must be one of `YES|NO|1..6`; `self_estimates` is scored from numeric strings `1-6`.
- Completion guard is strict: assessment must have `228` answers before `/complete` succeeds (`backend/src/controllers/assessment.controller.js`).
- Scoring is centralized in `backend/src/services/scoring.service.js`: totals `R/I/A/S/E/C`, derives 3-letter Holland code, stores score columns on `Assessment`, then filters occupations by exact `(code, educationLevel)`.

## Backend Patterns
- Keep routes thin and logic in controllers/services (`backend/src/routes/*` vs `backend/src/controllers/*`).
- Auth middleware pattern is `verifyToken` + `restrictTo(...)` where role gates are needed (example: `backend/src/routes/assessment.routes.js`).
- Request validation uses Joi through `backend/src/middleware/validation.middleware.js`.
- Error flow is centralized: use `next(err)` and prefer `HttpError` helpers from `backend/src/utils/httpError.js`.
- Logging/auditing is expected for sensitive actions (`backend/src/utils/logger.js`, `AuditLog` writes in middleware/controllers).

## Frontend Integration Patterns
- Do not create ad-hoc HTTP clients; use `frontend/src/services/api.js`.
- Access token is in-memory; refresh token is cookie-based using `/api/v1/auth/refresh-token` with request queueing during refresh races.
- Auth/navigation state is managed in `frontend/src/context/AuthContext.js` and guarded by `frontend/src/components/auth/ProtectedRoute.jsx`.
- Questionnaire saves incrementally per answer to `/api/v1/assessments/:id/progress` (`frontend/src/pages/Questionnaire.jsx`).
- Results page resolves latest completed assessment then calls `/api/v1/results/:assessmentId` (`frontend/src/pages/TestResults.jsx`).

## Developer Workflows (Verified)
- Backend dev: `cd backend && npm run dev`
- Backend tests: `cd backend && npm test`
- Frontend dev: `cd frontend && npm start`
- Frontend build: `cd frontend && npm run build`
- DB reset/seed is destructive: `cd backend && node scripts/setup.js` (`sequelize.sync({ force: true })`).
- Tests require `TEST_DATABASE_URL` (see `backend/tests/admin.e2e.test.js`).
- There is no root `package.json`; ignore root-level scripts mentioned in the current `README.md`.

## Guardrails for AI Changes
- Preserve current response shapes (`status`, `data`, and sometimes `results`) unless coordinated frontend+backend updates are made.
- For secured routes, follow existing middleware order used in the target module.
- Reuse model enums and existing literal values; do not introduce near-duplicate section/role/status strings.
- When changing auth/session logic, verify compatibility with Axios refresh flow and cookie-based refresh endpoint.
- Prefer focused edits in existing modules over new abstractions unless duplication is clearly harmful.