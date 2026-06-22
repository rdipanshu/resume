# Deploying on Vercel — Frontend Only

Vercel will host **just the React frontend** as a static site. The Python /
FastAPI backend stays on your existing Emergent deployment (`dipanshu.co.in`).
This avoids the "multiple services" error entirely — Vercel sees a single
React project.

## Architecture

```
Browser
   │
   ├──> https://<your-app>.vercel.app/         (static React build on Vercel)
   │                │
   │                └── fetch("$REACT_APP_BACKEND_URL/api/contact")
   │                              │
   └──────────────────────────────┴──> https://<emergent-backend-url>/api/contact
                                         (FastAPI + MongoDB on Emergent)
```

---

## 1. Push to GitHub

Profile → Save to GitHub. Confirm `frontend/yarn.lock` is committed.

## 2. Create the Vercel project

- vercel.com → **Add New → Project** → pick the repo
- **Root Directory**: set to **`frontend`** *(critical — not the repo root)*
- **Framework Preset**: `Create React App` (auto-detected)
- Build / install / output: leave blank — `frontend/vercel.json` controls them
- Click **Deploy** — first build may fail until env var is set (see step 3)

## 3. Environment variables (Production + Preview)

| Key | Value | Required |
|---|---|---|
| `REACT_APP_BACKEND_URL` | The Emergent backend URL (e.g. `https://resume-showcase-504.emergent.host` or `https://dipanshu.co.in` if backend lives there) | ✅ Yes |
| `CI` | `false` | optional (prevents warnings-as-errors) |

> The frontend uses `${REACT_APP_BACKEND_URL}/api/contact` to talk to FastAPI.
> Point it at whichever URL hosts your live `/api` routes.

## 4. Make the Emergent backend accept the Vercel domain (CORS)

The backend already allows `*` by default. If you tightened it, add the Vercel
domain to `CORS_ORIGINS` in your Emergent env vars and redeploy the backend.

## 5. Redeploy on Vercel

Deployments → … → **Redeploy** after step 3.

## 6. Verify

- `https://<app>.vercel.app/` → portfolio loads
- Submit the contact form → should hit your Emergent backend successfully

---

## If you instead want EVERYTHING on Vercel (frontend + backend)

You'd need to (a) migrate MongoDB to MongoDB Atlas, (b) rewrite the FastAPI
backend as Vercel Python serverless functions, and (c) use Vercel's new
**Services** project preset. This is a fundamental restructure — your current
setup on Emergent (`https://dipanshu.co.in`) already does all this for you,
so the recommendation is to **keep the backend on Emergent** and use Vercel
only as a static frontend mirror if you need one.

## Common errors

**`Command "npm install" exited with 1`** → Root Directory isn't set to
`frontend`. Vercel ran `npm install` at the repo root where there's no
`package.json`. Fix it in **Settings → General → Root Directory = frontend**.

**`vercel.json required to deploy projects with multiple services`** → You
still have the old multi-service vercel.json. Pull the latest commit which
only has `frontend/vercel.json` (single service).

**Contact form fails / CORS error** → `REACT_APP_BACKEND_URL` is unset, wrong,
or backend CORS is blocking the Vercel domain. Check the Network tab.
