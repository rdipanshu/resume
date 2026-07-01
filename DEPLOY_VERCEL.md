# Deploying this project to Vercel

This repo is a monorepo with a React (CRA + Craco) frontend and a FastAPI +
MongoDB backend. It is configured to deploy to Vercel as:

- **Static frontend** built from `frontend/` (output: `frontend/build`)
- **Serverless Python function** at `api/index.py` that mounts the FastAPI app
  defined in `backend/server.py`
- All requests to `/api/*` are rewritten to the Python function; everything else
  is served from the static build.

## 1. Prerequisites

- A Vercel account and this repo pushed to GitHub (use the "Save to GitHub"
  button in the Emergent chat input).
- A **MongoDB Atlas** cluster (Vercel serverless can't reach a local Mongo).
  Create one at https://www.mongodb.com/atlas and grab the connection string.
- A **Resend** API key from https://resend.com if you want the contact form
  emails to be delivered (optional — the endpoint still saves messages to
  MongoDB when the key is missing).

## 2. Import the repo on Vercel

1. Go to https://vercel.com/new and import the GitHub repository.
2. When prompted for framework settings, keep the defaults — `vercel.json`
   already declares the build command and output directory:
   - Build command: `cd frontend && yarn install --frozen-lockfile && yarn build`
   - Output directory: `frontend/build`
3. The Python function under `api/` is picked up automatically thanks to
   `api/requirements.txt`.

## 3. Environment variables (set in Vercel dashboard)

| Variable        | Required | Example / notes                                                       |
| --------------- | -------- | --------------------------------------------------------------------- |
| `MONGO_URL`     | Yes      | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/?retryWrites=true`  |
| `DB_NAME`       | Yes      | e.g. `portfolio`                                                      |
| `RESEND_API_KEY`| Optional | Enables contact-form email notifications                              |
| `SENDER_EMAIL`  | Optional | Defaults to `onboarding@resend.dev`                                   |
| `NOTIFY_EMAIL`  | Optional | Defaults to `rdipanshu@gmail.com`                                     |
| `CORS_ORIGINS`  | Optional | Comma-separated origins. Defaults to `*`. Same-origin, so usually fine|

Add them under **Project → Settings → Environment Variables** for the
`Production` (and `Preview`, if you want previews to work) environments, then
redeploy.

## 4. MongoDB Atlas network access

In Atlas, under **Network Access**, allow access from `0.0.0.0/0` (or the
current Vercel egress ranges) so serverless functions can connect.

## 5. Verifying the deployment

After the first deploy, hit:

- `https://<your-project>.vercel.app/` – should load the portfolio
- `https://<your-project>.vercel.app/api/` – should return `{"message": "Portfolio API up"}`
- Submit the contact form; a document should appear in the
  `contact_messages` collection in Atlas, and (if `RESEND_API_KEY` is set) an
  email should arrive at `NOTIFY_EMAIL`.

## 6. Local development is unchanged

Supervisor still runs the backend on port 8001 and the frontend on port 3000
via CRA, using `backend/.env` and `frontend/.env` for local configuration.
The Vercel-only files (`api/`, `vercel.json`, `.vercelignore`,
`frontend/.env.production`) are inert locally.
