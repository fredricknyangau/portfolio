# Stage 1: Builder
FROM python:3.12-slim as builder

WORKDIR /app

# Install dependencies into a virtual environment
COPY requirements/base.txt requirements/production.txt ./
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir -r production.txt

# Stage 2: Runtime
FROM python:3.12-slim

WORKDIR /app

# Copy the pre-built virtual environment
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY app/ ./app/

# Never run as root in production
RUN adduser --disabled-password --gecos '' appuser
USER appuser

EXPOSE 8080

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
