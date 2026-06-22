# Deploying to Vercel

The repo ships a `vercel.json` that declares **two builds**:
- **`frontend/package.json`** → static CRA build via `@vercel/static-build`
- **`api/index.py`** → FastAPI on `@vercel/python`

Routes in `vercel.json` map `/api/*` to the Python function and everything else
to the React build (with an SPA fallback to `index.html`).

The original production deployment (`/backend/server.py`) is untouched and still works.

---

## 1. Push to GitHub
Profile → Save to GitHub. **Make sure `frontend/yarn.lock` is committed** (it
should be — Vercel uses it to pick yarn over npm).

## 2. Import in Vercel
- vercel.com → **Add New → Project** → pick the repo.
- **Root Directory**: leave at repo root (do NOT point to `frontend`).
- **Framework Preset**: `Other` (the `vercel.json` controls everything).
- Leave Build Command / Output Directory **empty** in the UI.
- Click **Deploy** — first build will fail because env vars are missing.

## 3. Set environment variables
Project → **Settings → Environment Variables** (Production + Preview):

| Key | Example | Required |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://USER:PASS@cluster.xxx.mongodb.net/?retryWrites=true&w=majority` | ✅ |
| `DB_NAME` | `portfolio` | ✅ |
| `CORS_ORIGINS` | `*` or `https://dipanshu.co.in` | optional |
| `REACT_APP_BACKEND_URL` | *(leave empty)* | ⚠ must be empty |
| `CI` | `false` | optional (already handled in build script) |

> Use **MongoDB Atlas** (free tier works). Atlas → Network Access → allow
> `0.0.0.0/0` (Vercel uses dynamic IPs).
>
> Leave `REACT_APP_BACKEND_URL` empty so the frontend calls relative `/api/*`
> URLs that Vercel routes to the Python function.

## 4. Redeploy
Deployments → … → **Redeploy** after adding env vars.

## 5. Verify
- `https://<app>.vercel.app/` → portfolio loads
- `https://<app>.vercel.app/api/` → `{"message":"Portfolio API up (Vercel)"}`
- Submit the contact form → success toast → Atlas `portfolio.contact_messages`

---

## Common errors

**`Command "npm install" exited with 1`** → Vercel fell back to npm because it
didn't see `yarn.lock`. Confirm `frontend/yarn.lock` is committed to GitHub.

**`vercel.json required to deploy projects with multiple services`** → already
handled by the classic `builds` array in this `vercel.json`. Just redeploy.

**`MONGO_URL env var is not set`** → add it in Vercel env vars and redeploy.

**MongoDB connection timeout** → Atlas → Network Access → allow `0.0.0.0/0`.

**CORS errors** → set `CORS_ORIGINS` to your domain.
