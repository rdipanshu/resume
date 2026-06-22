# Deploying to Vercel (Services model)

Your Vercel account now uses the **Services** project type — which is required
for any project that bundles both a frontend and a backend.

This repo's `vercel.json` declares two services:

| Service | Entrypoint     | Route prefix | Framework         |
|---------|----------------|--------------|-------------------|
| `web`   | `frontend/`    | `/`          | create-react-app  |
| `api`   | `api/index.py` | `/api`       | fastapi           |

The original production deployment (`/backend/server.py`) is untouched.

---

## ⚠ Critical: set the Project Framework to **Services** in Vercel UI

This is the **#1 reason** you're seeing
`vercel.json required to deploy projects with multiple services`.

1. Open the Vercel project
2. **Settings → General → Framework Preset**
3. Change it to **`Services`** (it may currently be `Other`, `CRA`, or `Next.js`)
4. Save
5. Redeploy

`experimentalServices` in `vercel.json` only works once the project preset is
`Services`. Without it, Vercel keeps trying to treat the repo as a single-app
project and falls back to `npm install` at the root, failing.

---

## 1. Push to GitHub

Profile → Save to GitHub. Confirm `frontend/yarn.lock` is committed.

## 2. Vercel project setup

- vercel.com → **Add New → Project** → pick the repo
- **Root Directory**: leave at repo root (do NOT point to `frontend`)
- **Framework Preset**: **Services** (see section above)
- Leave Build Command / Output Directory / Install Command **blank** — Services
  derives them per-service from the `framework` field in `vercel.json`

## 3. Environment variables (Production + Preview)

| Key | Example | Required |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://USER:PASS@cluster.xxx.mongodb.net/?retryWrites=true&w=majority` | ✅ |
| `DB_NAME` | `portfolio` | ✅ |
| `CORS_ORIGINS` | `*` or `https://dipanshu.co.in` | optional |
| `REACT_APP_BACKEND_URL` | *(leave empty)* | ⚠ must be empty |

> MongoDB **Atlas** required (local Mongo won't work). Atlas → Network Access →
> allow `0.0.0.0/0` (Vercel uses dynamic IPs).
>
> Leave `REACT_APP_BACKEND_URL` empty so the frontend calls relative `/api/*`
> URLs, which Vercel routes to the `api` service.

## 4. Redeploy

Deployments → … → **Redeploy** after step 2 and 3.

## 5. Verify

- `https://<app>.vercel.app/` → portfolio loads
- `https://<app>.vercel.app/api/` → `{"message":"Portfolio API up (Vercel)"}`
- Submit the contact form → success toast → Atlas `portfolio.contact_messages`

---

## Common errors

**`vercel.json required to deploy projects with multiple services`** →
**Framework Preset is not set to `Services`**. Fix it in Project Settings (see
critical section above) and redeploy.

**`Command "npm install" exited with 1`** → Same root cause as above: Vercel
fell back to its default single-app build. Setting Framework Preset to
`Services` fixes it.

**`MONGO_URL env var is not set`** → add it in Vercel env vars and redeploy.

**MongoDB connection timeout** → Atlas → Network Access → allow `0.0.0.0/0`.

**CORS errors** → set `CORS_ORIGINS` to your domain.
