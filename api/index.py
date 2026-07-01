"""Vercel serverless entrypoint for the FastAPI backend.

Vercel's Python runtime autodetects an ASGI `app` object exported from this
file. We simply re-export the FastAPI application defined in `backend/server.py`.

Requests that reach this function keep their original URL path (e.g.
`/api/status`), so the FastAPI router (which uses the `/api` prefix) matches
them directly.
"""

import sys
from pathlib import Path

# Make sure the backend package is importable when Vercel builds the function.
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from server import app  # noqa: E402,F401  (re-exported for Vercel)
