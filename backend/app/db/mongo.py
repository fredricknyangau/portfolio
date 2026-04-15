from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

db_layer = MongoDB()

async def connect_to_mongo():
    logger.info("Connecting to MongoDB cluster...")
    # Explicitly set tls=True and reasonable timeouts for cloud networking
    db_layer.client = AsyncIOMotorClient(
        settings.MONGODB_URL,
        tls=True,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=10000
    )
    # Target standard portfolio collection space
    db_layer.db = db_layer.client["portfolio_db"]
    logger.info("MongoDB connection established.")

async def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    if db_layer.client:
        db_layer.client.close()
        logger.info("MongoDB connection closed gracefully.")

def get_database():
    return db_layer.db
