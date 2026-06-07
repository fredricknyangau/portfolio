from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.mongo import close_mongo_connection, connect_to_mongo
from app.modules import contact
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Portfolio backend API for Fredrick Nyang'au",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/v1/contact")


@app.get("/", tags=["Root"])
async def root():
    return {"status": "ok", "message": "Portfolio backend is running."}


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "environment": settings.ENVIRONMENT}
