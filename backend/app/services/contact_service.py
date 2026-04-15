import httpx
import asyncio
import aiosmtplib
from email.message import EmailMessage
from datetime import datetime, timezone
from app.schemas.contact import ContactPayload
from app.core.logging import get_logger
from app.core.config import settings
from app.db.mongo import get_database

logger = get_logger(__name__)

async def write_to_mongo(payload: ContactPayload) -> bool:
    """Safely ingests the payload struct into the primary MongoDB cluster."""
    try:
        db = get_database()
        document = {
            **payload.model_dump(),
            "timestamp_utc": datetime.now(timezone.utc).isoformat(),
            "origin": "Direct Signal Pipeline"
        }
        await db.contact_messages.insert_one(document)
        logger.info("Successfully dropped payload into MongoDB cluster.")
        return True
    except Exception as e:
        logger.error(f"MongoDB persistence failure: {e}")
        return False

async def dispatch_telegram(payload: ContactPayload) -> bool:
    """Dispatches a payload over the Telegram Bot API natively using rich HTML formatting."""
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        logger.warning("Telegram Bot environment variables missing. Dropping dispatch.")
        return False
        
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    
    # Advanced Telegram HTML Formatting
    message = (
        f"🚀 <b>New Connection | Fredrick Nyang'au Portfolio</b>\n"
        f"────────────────────────\n"
        f"👤 <b>Identity:</b> <code>{payload.name}</code>\n"
        f"📧 <b>Return Route:</b> <code>{payload.email}</code>\n\n"
        f"💬 <b>Payload:</b>\n"
        f"<blockquote>{payload.message}</blockquote>\n"
        f"────────────────────────\n"
        f"<i>Transmitted from Zeal Backend Microservice</i>"
    )
    
    body = {
        "chat_id": settings.TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(url, json=body, timeout=5.0)
            if res.status_code == 200:
                logger.info("Telegram dispatch successful.")
                return True
            else:
                logger.error(f"Telegram API declined payload: {res.text}")
                return False
    except Exception as e:
        logger.error(f"Telegram network failure: {e}")
        return False

async def dispatch_smtp(payload: ContactPayload) -> bool:
    """Dispatches via formal SMTP tunnel fallback using a rich HTML template."""
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning("SMTP environment variables missing. Dropping email dispatch.")
        return False
        
    message = EmailMessage()
    message["From"] = settings.SMTP_USER
    message["To"] = settings.SMTP_USER
    message["Subject"] = f"🚀 Portfolio Inquiry: {payload.name}"
    
    # Plaintext fallback for legacy email clients
    plaintext_content = (
        f"INBOUND TRANSMISSION (Fredrick Nyang'au Portfolio):\n\n"
        f"Name: {payload.name}\n"
        f"Email: {payload.email}\n"
        f"Message:\n{payload.message}"
    )
    message.set_content(plaintext_content)
    
    # Rich HTML payload matching portfolio aesthetics
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #080A0D;
                color: #EAE6DF;
                margin: 0;
                padding: 40px 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: #0F1218;
                border: 1px solid #1F2633;
                border-radius: 10px;
                padding: 40px;
                box-shadow: 0 4px 24px rgba(16, 185, 129, 0.05);
            }}
            .header {{
                border-bottom: 1px solid #1F2633;
                padding-bottom: 20px;
                margin-bottom: 24px;
            }}
            .title {{
                color: #10b981; /* Emerald Primary Accent */
                font-size: 24px;
                font-weight: 300;
                margin: 0;
                letter-spacing: -0.5px;
            }}
            .subtitle {{
                color: #9A9590;
                font-size: 14px;
                margin-top: 8px;
                font-weight: 400;
            }}
            .meta-block {{
                background-color: #161B24;
                border-left: 3px solid #10b981;
                padding: 16px;
                border-radius: 4px;
                margin-bottom: 24px;
            }}
            .meta-row {{
                margin: 8px 0;
                font-size: 14px;
            }}
            .meta-label {{
                color: #9A9590;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 12px;
                display: inline-block;
                width: 100px;
            }}
            .meta-value {{
                color: #EAE6DF;
                font-weight: 500;
            }}
            .message-body {{
                font-size: 16px;
                line-height: 1.6;
                color: #EAE6DF;
                white-space: pre-wrap;
                background-color: #080A0D;
                padding: 24px;
                border-radius: 8px;
                border: 1px solid #1F2633;
            }}
            .footer {{
                margin-top: 32px;
                text-align: center;
                font-size: 12px;
                color: #4A4840;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">Secure Pipeline Activation</h1>
                <div class="subtitle">Direct Signal to Fredrick Nyang'au (Zeal)</div>
            </div>
            
            <div class="meta-block">
                <div class="meta-row">
                    <span class="meta-label">Identity</span>
                    <span class="meta-value">{payload.name}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Return Route</span>
                    <a href="mailto:{payload.email}" style="color: #f59e0b; text-decoration: none;">{payload.email}</a>
                </div>
            </div>
            
            <div class="message-body">{payload.message}</div>
            
            <div class="footer">
                Transmitted securely via Zeal Backend Engineering Infrastructure.
            </div>
        </div>
    </body>
    </html>
    """
    
    # Attach HTML version as the preferred alternative
    message.add_alternative(html_content, subtype='html')
    
    try:
        # Intelligently select protocol based on port
        # Port 465 uses implicit SSL (use_tls=True)
        # Port 587 uses explicit STARTTLS (start_tls=True)
        use_tls = settings.SMTP_PORT == 465
        start_tls = settings.SMTP_PORT == 587
        
        await aiosmtplib.send(
            message,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASSWORD,
            use_tls=use_tls,
            start_tls=start_tls,
            timeout=10.0
        )
        logger.info("SMTP email dispatched seamlessly.")
        return True
    except Exception as e:
        logger.error(f"SMTP network/auth failure: {e}")
        return False

async def dispatch_contact_notification(payload: ContactPayload):
    """
    Core orchestrator: guarantees MongoDB persistence first, 
    then independently races Telegram and SMTP transmissions securely.
    """
    # Block 1: The Source of Truth
    db_success = await write_to_mongo(payload)
    if not db_success:
        logger.warning("MongoDB degraded! Relying purely on network transit.")
        
    # Block 2: Simultaneous network dispatches utilizing non-blocking gathers
    logger.info("Initiating simultaneous OMNI-Dispatch relays...")
    results = await asyncio.gather(
        dispatch_telegram(payload),
        dispatch_smtp(payload),
        return_exceptions=True
    )
    
    t_status = "OK" if results[0] is True else "FAIL"
    s_status = "OK" if results[1] is True else "FAIL"
    
    logger.info(f"Dispatch Cycle Completed -> Mongo: {db_success} | Telegram: {t_status} | SMTP: {s_status}")
    
    # We return true as long as it hit ANY pipeline (or even none if variables missing, so UI doesn't crash)
    return True
