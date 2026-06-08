# Deploying to Vercel

Vercel cannot run the original `supervisor` + long-running FastAPI server setup
that Emergent uses. This project ships a **second, Vercel-friendly entry point**
under `/api/index.py` so you can deploy the same codebase on Vercel as well.

## What was added

| File | Purpose |
|---|---|
| `vercel.json` | Vercel project config (build command, output dir, rewrites, runtime) |
| `api/index.py` | FastAPI app exposed as a Vercel Python serverless function |
| `api/requirements.txt` | Python deps for the serverless function |
| `.vercelignore` | Excludes the Emergent-only `backend/` from Vercel builds |

The original `/backend/server.py` and `/backend/.env` are untouched — Emergent
deployment continues to work exactly as before.

---

## 1. Push to GitHub

Use Emergent's **Save to GitHub** button (Profile → Connect GitHub if needed).

## 2. Create a Vercel project

1. Go to https://vercel.com → **Add New → Project**.
2. Import the GitHub repo.
3. **Framework Preset**: leave as "Other" (the `vercel.json` controls everything).
4. **Root Directory**: leave at repo root (do *not* point to `frontend`).
5. Click **Deploy** — the first build will fail because env vars are missing.

## 3. Set the required environment variables

Project → **Settings → Environment Variables** (Production + Preview):

| Key | Example value | Required |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://USER:PASS@cluster.xxx.mongodb.net/?retryWrites=true&w=majority` | ✅ Yes |
| `DB_NAME` | `portfolio` | ✅ Yes |
| `CORS_ORIGINS` | `*` (or your domain comma-separated) | optional |
| `REACT_APP_BACKEND_URL` | *(leave empty / unset)* | ⚠ Must be empty |

> Vercel's serverless functions cannot talk to a local MongoDB.
> You must use **MongoDB Atlas** (free tier works) and whitelist `0.0.0.0/0`
> in Atlas → Network Access (Vercel uses dynamic IPs).

> Leave `REACT_APP_BACKEND_URL` empty so the frontend calls **relative**
> `/api/*` routes, which `vercel.json` rewrites to the Python function.

## 4. Redeploy

After saving env vars: Deployments → … → **Redeploy**.

## 5. Verify

- `https://<your-app>.vercel.app/` → portfolio loads
- `https://<your-app>.vercel.app/api/` → `{"message":"Portfolio API up (Vercel)"}`
- Submit the contact form → success toast → check Atlas
  `portfolio.contact_messages` collection.

---

## Common errors & fixes

**`MONGO_URL env var is not set`** → add it in Vercel env vars and redeploy.

**Build fails on `yarn install`** → make sure `frontend/yarn.lock` is committed
to GitHub (it should be).

**404 on `/api/contact`** → confirm `vercel.json` rewrites are present and the
deployment used the latest commit. Functions tab should show `api/index.py`.

**MongoDB connection timeout** → Atlas → Network Access → add `0.0.0.0/0`
(or Vercel's IP ranges) to the allow-list.

**CORS errors** → set `CORS_ORIGINS` to your Vercel domain
(e.g. `https://your-app.vercel.app`).
