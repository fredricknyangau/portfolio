from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.routers import contact, telemetry
from app.db.mongo import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Boot sequence
    await connect_to_mongo()
    yield
    # Teardown sequence
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend microservice for Zeals portfolio",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/v1/contact")
app.include_router(telemetry.router, prefix="/api/v1/telemetry")

@app.get("/health", tags=["Health"])
async def root_health_check():
    return {"status": "ok", "environment": settings.ENVIRONMENT}
