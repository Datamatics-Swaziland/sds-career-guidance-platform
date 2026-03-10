# Copilot Instructions for SDS Test System

## Big Picture Architecture
- Monorepo with separate deployable apps: `backend/` (Express + Sequelize + PostgreSQL) and `frontend/` (React + Axios + Tailwind).
- Backend entrypoint is `backend/server.js` → mounts `backend/src/app.js`.
- API base is `/api/v1/*`; frontend calls full prefixed paths (example: `/api/v1/assessments/questions`).
- Primary SDS flow is: start assessment → save answers progressively → complete assessment → scoring + recommendations.
- Scoring and recommendation logic is centralized in `backend/src/services/scoring.service.js`.

## Backend Conventions (Important)
- Route modules are thin; business logic stays in controllers/services (`src/routes/*` vs `src/controllers/*`).
- Auth pattern: `verifyToken` plus role checks (`restrictTo` or `authorize`) before controller logic.
- Validation uses Joi via `src/middleware/validation.middleware.js`.
- Error handling is centralized via `src/middleware/errorHandling.middleware.js`; controllers should pass errors with `next(err)` (use `src/utils/httpError.js` for 4xx/5xx status mapping).
- Logging/audit is first-class: use `src/utils/logger.js` and create audit records for sensitive actions.

## Data Model + SDS Domain Rules
- Core models for assessment flow: `Assessment`, `Answer`, `Question`, `Occupation`, `EducationLevel`, `User`.
- `Answer.value` accepts only `YES|NO|1..6`; section IV (`self_estimates`) is numeric `1-6`.
- Submission guard in `assessment.controller`: requires `228` answers before completion.
- `ScoringService.finalizeAssessment()` computes raw `R/I/A/S/E/C`, derives 3-letter Holland code, stores results on `Assessment`, and filters occupations by both `code` and `educationLevel`.
- Keep section keys exact: `activities`, `competencies`, `occupations`, `self_estimates`.

## Frontend Integration Patterns
- All HTTP goes through `frontend/src/services/api.js` Axios instance.
- Access token is kept in-memory in `frontend/src/services/api.js`; session refresh is cookie-based via `/api/v1/auth/refresh-token` with queued retry logic.
- Auth state is managed by `frontend/src/context/AuthContext.js`; protected navigation uses role-aware `ProtectedRoute`.
- Questionnaire page (`frontend/src/pages/Questionnaire.jsx`) persists each answer incrementally via `/api/v1/assessments/:id/progress`.
- Results page (`frontend/src/pages/TestResults.jsx`) resolves latest completed assessment and then calls `/api/v1/results/:assessmentId`.

## Developer Workflows (Use These)
- Backend dev server: `cd backend && npm run dev`
- Backend tests: `cd backend && npm test`
- Frontend dev server: `cd frontend && npm start`
- Frontend build: `cd frontend && npm run build`
- No root `package.json` exists; do not suggest root-level `npm run dev`/`install-all` commands from README.
- `backend/scripts/setup.js` drops and recreates tables (`sequelize.sync({ force: true })`) and blocks production unless `ALLOW_DESTRUCTIVE_SETUP=true`; run only for local reset via `node backend/scripts/setup.js`.
- Backend tests require `TEST_DATABASE_URL` (see `backend/tests/admin.e2e.test.js`).

## Implementation Guardrails for Agents
- Preserve API response shape used by frontend (`status`, `data`, sometimes `results`) unless updating both sides.
- For new secured endpoints, mirror existing middleware order: auth → authorization → validation → controller.
- Reuse existing section/riasec enums from models and validators; avoid introducing variant string literals.
- When touching auth/session behavior, verify compatibility with Axios refresh interceptor and cookie path `/api/v1/auth`.
- Prefer focused edits in existing modules rather than creating parallel abstractions.