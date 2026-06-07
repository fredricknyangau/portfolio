import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

# Must patch env vars before importing the app
import os
os.environ["PROJECT_NAME"] = "Test Backend"
os.environ["ENVIRONMENT"] = "test"
os.environ["CORS_ORIGINS"] = "[]"
os.environ["REDIS_URL"] = "redis://localhost:6379/1"
os.environ["MONGODB_URL"] = "mongodb://localhost:27017"
os.environ["TELEGRAM_BOT_TOKEN"] = "test"
os.environ["TELEGRAM_CHAT_ID"] = "test"
os.environ["SMTP_HOST"] = "test"
os.environ["SMTP_PORT"] = "465"
os.environ["SMTP_USER"] = "test"
os.environ["SMTP_PASSWORD"] = "test"

from app.main import app

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client

@pytest.fixture(autouse=True)
def mock_redis():
    """Mock Redis to prevent connection failures during tests."""
    with patch("app.api.deps.redis_client", None):
        yield

@pytest.fixture(autouse=True)
def mock_mongo():
    """Mock MongoDB database access."""
    mock_db = AsyncMock()
    with patch("app.modules.contact.services.get_database", return_value=mock_db):
        yield mock_db

@pytest.fixture
def mock_telegram():
    with patch("app.modules.contact.services.dispatch_telegram", return_value=True) as m:
        yield m

@pytest.fixture
def mock_smtp():
    with patch("app.modules.contact.services.dispatch_smtp", return_value=True) as m:
        yield m
