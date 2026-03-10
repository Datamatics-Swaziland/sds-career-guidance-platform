# SDS Career Guidance Platform

Self-Directed Search (SDS) career assessment platform for guiding learners through a full 228-question Holland RIASEC workflow and producing education-level-aware career recommendations.

## What this system does
- Runs a complete SDS assessment across 4 sections: `activities`, `competencies`, `occupations`, `self_estimates`
- Saves answers progressively during test-taking
- Computes RIASEC totals and 3-letter Holland code on completion
- Matches occupations by exact Holland code + learner education level
- Supports role-based access for users, counselors, and admins

## Tech stack
- Backend: Node.js, Express 5, Sequelize, PostgreSQL, Joi, JWT
- Frontend: React, React Router, Axios, Tailwind CSS
- Testing: Jest + Supertest (backend)

## Repository layout
- `backend/` API server and database logic
- `frontend/` React web application
- `docs/` API, schema, and setup documentation

## Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 14+

## Setup
1. Clone repository
```bash
git clone https://github.com/Datamatics-Swaziland/sds-career-guidance-platform.git
cd sds-career-guidance-platform
```

2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Configure environment
- Create `backend/.env` and set database/JWT/frontend values (see `docs/SETUP_GUIDE.md`)
- Set `REACT_APP_API_URL` in frontend environment to your backend base URL

4. Initialize database (destructive)
```bash
cd backend
npm run setup
```

## Run locally
Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

## Testing
Backend tests:
```bash
cd backend
TEST_DATABASE_URL=<your_test_db_url> npm test
```

## Important notes
- There is no root `package.json`; run commands from `backend/` or `frontend/`.
- `backend/scripts/setup.js` uses destructive sync (`force: true`) and will drop existing tables.
- API routes are versioned under `/api/v1/*`.

## Key docs
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA_DOCUMENTATION.md)
- [Setup Guide](docs/SETUP_GUIDE.md)
- [Compliance Baseline](docs/compliance.md)
- [Incident Response Runbook](docs/incident-response.md)
- [Data Subject Rights](docs/data-subject-rights.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

## License
Proprietary - Government of Eswatini (pending approval)