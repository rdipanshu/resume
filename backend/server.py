from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend) configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'rdipanshu@gmail.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")


# -----------------------------
# Models
# -----------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
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
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# -----------------------------
# Email helper
# -----------------------------
def _build_contact_email_html(msg: "ContactMessage") -> str:
    subject = msg.subject or "(no subject)"
    return f"""
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111; line-height:1.6;">
      <h2 style="margin:0 0 16px;">New contact form submission</h2>
      <table style="border-collapse:collapse; width:100%; max-width:600px;">
        <tr><td style="padding:6px 0; font-weight:bold; width:120px;">Name</td><td style="padding:6px 0;">{msg.name}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Email</td><td style="padding:6px 0;">{msg.email}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Subject</td><td style="padding:6px 0;">{subject}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold; vertical-align:top;">Message</td><td style="padding:6px 0; white-space:pre-wrap;">{msg.message}</td></tr>
        <tr><td style="padding:6px 0; font-weight:bold;">Received</td><td style="padding:6px 0;">{msg.created_at}</td></tr>
      </table>
    </div>
    """


async def send_contact_notification(msg: "ContactMessage") -> None:
    """Send an email notification for a new contact submission. Non-blocking, errors are logged not raised."""
    if not resend.api_key:
        logger.warning("RESEND_API_KEY not set; skipping email notification")
        return
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFY_EMAIL],
        "reply_to": msg.email,
        "subject": f"New portfolio message from {msg.name}",
        "html": _build_contact_email_html(msg),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Contact notification email sent: %s", result.get("id") if isinstance(result, dict) else result)
    except Exception:
        logger.exception("Failed to send contact notification email")


# -----------------------------
# Routes
# -----------------------------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API up"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    try:
        msg = ContactMessage(**payload.model_dump())
        await db.contact_messages.insert_one(msg.model_dump())
        await send_contact_notification(msg)
        return msg
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail="Could not save your message") from e


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
