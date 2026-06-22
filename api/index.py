# Vercel serverless entry point — exposes the FastAPI `app` instance.
# Uses the new Vercel Services model: see /vercel.json.
#
# Required env vars (Vercel Project → Settings → Environment Variables):
#   MONGO_URL    — MongoDB Atlas connection string (mongodb+srv://...)
#   DB_NAME      — database name (e.g. portfolio)
#   CORS_ORIGINS — comma-separated origins, or "*"
#
# Note: with `routePrefix: "/api"` in vercel.json, Vercel forwards requests
# to this function with the prefix stripped. So we register routes at root
# (e.g. "/contact") AND duplicate at "/api/contact" for safety.

import os
import uuid
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field

app = FastAPI(title="Portfolio API (Vercel)")

# ---------- Mongo (lazy, reused across warm invocations) ----------
_client: AsyncIOMotorClient | None = None


def _get_db():
    global _client
    if _client is None:
        mongo_url = os.environ.get("MONGO_URL")
        if not mongo_url:
            raise RuntimeError("MONGO_URL env var is not set")
        _client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
    db_name = os.environ.get("DB_NAME", "portfolio")
    return _client[db_name]


# ---------- Models ----------
class ContactMessageCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str | None = None
    message: str
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


# ---------- Middleware ----------
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Route handlers (registered at both root and /api/* for safety) ----------
async def _root():
    return {"message": "Portfolio API up (Vercel)"}


async def _create_contact_message(payload: ContactMessageCreate):
    try:
        msg = ContactMessage(**payload.model_dump())
        db = _get_db()
        await db.contact_messages.insert_one(msg.model_dump())
        return msg
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Could not save your message")


async def _list_contact_messages():
    db = _get_db()
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


# Root-relative (when Vercel strips the /api prefix)
app.add_api_route("/", _root, methods=["GET"])
app.add_api_route("/contact", _create_contact_message, methods=["POST"], status_code=201, response_model=ContactMessage)
app.add_api_route("/contact", _list_contact_messages, methods=["GET"])

# Also register at /api/* in case the prefix is NOT stripped
app.add_api_route("/api", _root, methods=["GET"])
app.add_api_route("/api/", _root, methods=["GET"])
app.add_api_route("/api/contact", _create_contact_message, methods=["POST"], status_code=201, response_model=ContactMessage)
app.add_api_route("/api/contact", _list_contact_messages, methods=["GET"])
