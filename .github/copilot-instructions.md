# Copilot / AI Agent Instructions for this Repo

Quick summary

- Full-stack API testing app: **FastAPI** backend (backend/app) + **Next.js** frontend (frontend/). Backend exposes REST endpoints and persists logs to MongoDB (Motor). Frontend uses a small API wrapper at `frontend/lib/api.ts` that points to `http://localhost:8000` by default.

Getting started (local dev)

- Backend (Windows):
  - Create venv: `python -m venv venv`
  - Activate (PowerShell): `.\venv\Scripts\Activate.ps1` (or `venv\Scripts\activate` on cmd)
  - Install: `pip install -r requirements.txt`
  - Ensure environment variables in `backend/.env` (or system env): `MONGO_URI`, `DB_NAME`, `JWT_SECRET`.
  - Run: `uvicorn app.main:app --reload --port 8000`
- Frontend:
  - `cd frontend && npm install && npm run dev`
  - Frontend expects backend at `http://localhost:8000` (see `frontend/lib/api.ts`)

Key architecture & files (big picture)

- `backend/app/main.py` — app factory, CORS, router registration.
- Routers: `backend/app/routers/*` (auth_router, test_runner, logs) expose the public REST surface.
- Services: `backend/app/services/*` contain business logic (notably `auth_service.py` and `runner_service.py`).
- Models: `backend/app/models/schemas.py` defines Pydantic request/response schemas (RunTestRequest/RunTestResponse, LogEntry, UserSignup, TokenResponse).
- DB: `backend/app/utils/db.py` uses `motor.motor_asyncio.AsyncIOMotorClient` to expose `logs_collection` and `users_collection`.
- Auth: JWT-based (see `auth_service.create_access_token`) and token validation in `dependencies/auth_dependencies.py`.
- Frontend auth integration: `frontend/app/components/AuthProvider.tsx` stores token in `localStorage` under `token` and decodes payload to set `user`.

Important, discoverable patterns & conventions (do not change lightly)

- JWT payload shape: `{ "sub": username, "id": <user_id>, "exp": <timestamp> }`. Frontend decodes `id` as `payload.id` and `username` as `payload.sub` so changing names breaks the client.
- Run logs are saved into `logs_collection` with a `run_id` (uuid4), ISO timestamp, and `user_id` string. See `runner_service.run_test` for exact shape.
- `RunTestRequest.body` may be either an object (sent as JSON) or raw string (sent as form/body text). The runner distinguishes with `isinstance(..., dict)`.
- DB env loading: `db.py` calls `load_dotenv(override=True)` (Windows-friendly) and will raise at startup if `MONGO_URI`/`DB_NAME` are missing; it prints debug lines — useful for diagnosing env problems.
- The runner uses the blocking `requests` library inside an async function — this is a pedagogical/implementation choice and will block the event loop under load. Consider `httpx.AsyncClient` if converting to non-blocking behavior.

Common developer tasks & concrete examples

- Create a user:
  - POST `/auth/signup` with `{ "username":"u", "email":"e@x.com", "password":"p" }` => returns `UserResponse`.
- Login & get token:
  - POST `/auth/login` with `{ "username":"u", "password":"p" }` => `TokenResponse` with `access_token`.
- Run a test (example request body):
  - POST `/run-test/` with
    ```json
    {
      "url": "https://httpbin.org/get",
      "method": "GET",
      "headers": { "Accept": "application/json" },
      "timeout": 10
    }
    ```
- Inspect logs (requires Authorization header `Bearer <token>`):
  - GET `/logs/` or GET `/logs/<run_id>`

Notes for agents (how to operate in this repo)

- Always reference and preserve existing Pydantic schemas when changing endpoints — compatibility is important.
- When changing token contents or auth behavior, update `AuthProvider.tsx` decoding logic and tests/usage across the frontend.
- Prefer small, incremental changes: e.g., replacing `requests` with `httpx` should include both a functional migration and a short explanation in PR body about event loop blocking concerns.
- Add tests where possible (unit tests for `auth_service`, integration tests for `runner_service` behavior using a local mock HTTP server) — there are currently no tests in the repo.

Potential follow-ups / low-effort improvements

- Migrate blocking `requests` calls to `httpx.AsyncClient` in `runner_service`.
- Move `API_URL` in `frontend/lib/api.ts` to an environment variable and document it.
- Add Dockerfile / docker-compose for local dev with MongoDB to make onboarding easier.
- Add basic end-to-end tests that run a sample request and assert log insertion.

Where to look for more context

- `backend/app/services/*` — real logic lives here.
- `backend/app/routers/*` — public API surface.
- `frontend/lib/api.ts` and `frontend/app/components/AuthProvider.tsx` — how the client communicates & stores tokens.

If anything here is unclear or you'd like me to expand a section (examples, local-run tips, or a template PR checklist), tell me what to clarify and I will update the file. ✅
