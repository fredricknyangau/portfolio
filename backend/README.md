# Portfolio Backend API

A production-grade FastAPI microservice built to support the portfolio frontend. 

This service currently handles the **Contact Form Pipeline**, featuring asynchronous notification dispatch, robust rate limiting, and graceful degradation.

## Features

- **Dual-Dispatch Notifications**: Simultaneously routes incoming contact messages to both Telegram (instant alert) and SMTP (formal email).
- **Background Processing**: Uses FastAPI `BackgroundTasks` to ensure the HTTP response returns immediately (`<30ms`) while network dispatch happens asynchronously.
- **Rate Limiting**: Redis-backed rate limiter strictly enforces a maximum of 2 requests per minute per IP. Fails open gracefully if Redis is unavailable.
- **Persistence**: Logs all inbound communications to a MongoDB cluster for audit trailing.
- **Graceful Degradation**: If MongoDB fails, the system logs a warning and proceeds with network notification dispatch instead of failing the request.
- **Comprehensive Test Suite**: Fully mocked pytest suite testing endpoints, validation, and simulated failures without requiring real network access.

## Environment Variables

Copy `.env.example` to `.env` and configure the following:

```env
PROJECT_NAME="Portfolio Backend"
ENVIRONMENT=development
CORS_ORIGINS=["http://localhost:5174", "https://yourdomain.com"]

# Rate Limiting
REDIS_URL=redis://localhost:6379/0

# Persistence
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/test

# Telegram Dispatch
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# SMTP Dispatch (e.g. Gmail App Passwords)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=youremail@gmail.com
SMTP_PASSWORD=your_app_password
```

## Local Development Workflow

All common tasks are wrapped in a `Makefile`.

1. Ensure Redis is running: `docker run -d -p 6379:6379 redis:alpine`
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements/base.txt
   pip install -r requirements/development.txt
   ```
3. Boot the server (auto-reloading on port 8080):
   ```bash
   make dev
   ```

## Testing

The test suite uses `pytest` and heavily utilizes `unittest.mock` to prevent external side effects.

```bash
make test
```

## Docker Production Build

The included `Dockerfile` uses a multi-stage build to ensure the final image is minimal, containing only the runtime dependencies and application code—leaving behind development tools, tests, and caching layers.

```bash
docker build -t portfolio-backend .
docker run -p 8080:8080 --env-file .env portfolio-backend
```
