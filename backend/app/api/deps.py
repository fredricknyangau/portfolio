from fastapi import HTTPException, status, Request
import redis.asyncio as redis
from app.core.logging import get_logger
from app.core.config import settings

logger = get_logger(__name__)

# Initialize Redis connection pool but catch failures gracefully for robust local dev
try:
    url = settings.REDIS_URL.strip()
    if url and not (url.startswith("redis://") or url.startswith("rediss://") or url.startswith("unix://")):
        # Default to redis:// if scheme is missing
        url = f"redis://{url}"
    
    # Use SSL options if it's a secure connection
    connection_kwargs = {"decode_responses": True}
    if url.startswith("rediss://"):
        connection_kwargs["ssl_cert_reqs"] = "none"
        
    redis_client = redis.from_url(url, **connection_kwargs)
except Exception as e:
    logger.warning(f"Failed to initialize Redis client: {e}")
    redis_client = None

async def check_rate_limit(request: Request):
    """
    Limits clients to 2 requests per minute using Redis.
    Fails open if Redis is unavailable to preserve service continuity.
    """
    if not redis_client:
        return True
        
    client_ip = request.headers.get("X-Forwarded-For", request.client.host if request.client else "unknown").split(",")[0]
    key = f"rate_limit:contact:{client_ip}"
    
    try:
        requests = await redis_client.incr(key)
        if requests == 1:
            await redis_client.expire(key, 60)
            
        if requests > 2:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please try again later."
            )
    except Exception as e:
        logger.error(f"Redis error during rate limiting: {e}")
        # Allow request to proceed if Redis fails
        
    return True
