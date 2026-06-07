.PHONY: dev test lint

dev:
	.venv/bin/uvicorn app.main:app --reload --port 8080

test:
	.venv/bin/pytest tests/ -v

lint:
	.venv/bin/flake8 app/ tests/
