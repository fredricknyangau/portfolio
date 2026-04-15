FROM python:3.12-slim

WORKDIR /app

# Install deps first (layer caching)
COPY requirements/base.txt .
COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt

COPY . .

# Never run as root in production
RUN adduser --disabled-password --gecos '' appuser
USER appuser

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
