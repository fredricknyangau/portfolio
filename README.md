# Fredrick Nyangau – Backend Engineering Portfolio

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

A production-grade, containerized portfolio demonstrating backend systems architecture, designed primarily for engineering managers and technical recruiters.

## Project Architecture

This application is constructed as an enterprise microservice template rather than a standard static site. It illustrates end-to-end containerization, reverse proxying, and basic service orchestration.

\`\`\`mermaid
flowchart TD
subgraph "Production Environment (AWS ECS / Docker)"
Nginx[Nginx Reverse Proxy\n:8080]
ReactUI[Vite React SPA\nFrontend Service]
FastAPI[FastAPI\nMock AI Agent Service]

        Nginx -->|Serves Static Files| ReactUI
        Nginx -->|/api/*| FastAPI
    end

    User(fa:fa-user End User Web Browser)
    User --> Nginx

    classDef container fill:#161B24,stroke:#2C3444,stroke-width:1px,color:#EAE6DF;
    class Nginx,ReactUI,FastAPI container;

\`\`\`

## Key Features

- **Microservice Containerization**: Fully separated `frontend/` (React/Vite) and `backend/` (FastAPI) applications bridged via Docker Compose.
- **S.T.A.R Framework Execution**: Projects explicitly describe Situation, Task, Action, and Result formats with dynamic system C4 architectures.
- **Hero A/B Testing**: The frontend integrates an active A/B testing matrix for UI variations, demonstrating split-testing execution logic directly in-browser.
- **Mock AI API**: Ships with a FastAPI boilerplate prepped for LangChain + pgvector integrations.

## Local Development Requirements

- [Node.js (v20+)](https://nodejs.org/)
- [Python 3.12+](https://www.python.org/)
- [Docker](https://www.docker.com/)

## Start the Infrastructure

To run the full stack (Frontend on `:8080`, Backend on `:8080`):
\`\`\`bash
docker compose up --build
\`\`\`

### Start Frontend Only (Standalone)

\`\`\`bash
npm ci
npm run dev
\`\`\`

### Start Backend Only (Standalone)

\`\`\`bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements/production.txt
uvicorn app.main:app --reload
\`\`\`

## CI/CD

This project incorporates a GitHub Actions flow (`.github/workflows/ci.yml`) triggering on pushes to `main`. It guarantees standard code lints, builds the React app, and verifies structural validity of the Docker stack.

---

> "Building production-grade APIs for East Africa's mobile-first economy."
