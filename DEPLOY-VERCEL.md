# Deploying to Vercel (Services model)

Vercel now requires the **Services** model when a project has both a frontend
and a backend. The `vercel.json` in this repo uses `experimentalServices` to
declare two services:

| Service | Entrypoint     | URL prefix |
|---------|----------------|------------|
| `web`   | `frontend/`    | `/`        |
| `api`   | `api/index.py` | `/api`     |

Emergent deployment (`/backend/server.py`) is unaffected and still works.

---

## 1. Push to GitHub
Profile → Save to GitHub.

## 2. Import in Vercel
- vercel.com → **Add New → Project** → pick the repo.
- **Root Directory**: leave at repo root.
- **Framework Preset**: leave as-is — `vercel.json` controls everything.
- Don't set `Build Command` or `Output Directory` in the UI (Services handles it).
- Click **Deploy** — first build will fail because env vars are missing.

## 3. Set environment variables
Project → **Settings → Environment Variables** (Production + Preview):

| Key | Example | Required |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://USER:PASS@cluster.xxx.mongodb.net/?retryWrites=true&w=majority` | ✅ |
| `DB_NAME` | `portfolio` | ✅ |
| `CORS_ORIGINS` | `*` or `https://dipanshu.co.in` | optional |
| `REACT_APP_BACKEND_URL` | *(leave empty)* | ⚠ must be empty |

> Use **MongoDB Atlas** (free tier works). Atlas → Network Access → allow
> `0.0.0.0/0` (Vercel uses dynamic IPs).
>
> Leave `REACT_APP_BACKEND_URL` empty so the frontend calls relative `/api/*`
> URLs that Vercel routes to the api service.

## 4. Redeploy
Deployments → … → **Redeploy** after adding env vars.

## 5. Verify
- `https://<app>.vercel.app/` → portfolio loads
- `https://<app>.vercel.app/api/` → `{"message":"Portfolio API up (Vercel)"}`
- Submit the contact form → success toast → Atlas `portfolio.contact_messages`

---

## Common errors

**`vercel.json required to deploy projects with multiple services`** →
The `experimentalServices` block must be present in `vercel.json` (it is, in this repo). Make sure Vercel is reading the latest commit.

**`MONGO_URL env var is not set`** → add it in Vercel env vars, redeploy.

**MongoDB connection timeout** → Atlas → Network Access → allow `0.0.0.0/0`.

**CORS errors** → set `CORS_ORIGINS` to your domain.

**Frontend deploys but `/api/contact` returns 404** → confirm both services
appear under the deployment's "Build & Deployment" log, and `vercel.json` is at
the **repo root**, not inside `frontend/`.
