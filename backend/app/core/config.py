import json
from typing import Any
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = Field(...)
    ENVIRONMENT: str = Field(...)

    # Cross-Origin
    CORS_ORIGINS: list[str] | str = Field(...)

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Any) -> list[str]:
        if isinstance(value, str):
            value = value.strip()
            # Handle empty strings or literal quotes
            if not value or value in ['""', "''", '[]']:
                return []
            # Detect JSON list format
            if value.startswith("[") and value.endswith("]"):
                try:
                    return json.loads(value)
                except (json.JSONDecodeError, ValueError):
                    pass
            # Fallback to comma-separated list
            return [origin.strip().strip("'").strip('"') for origin in value.split(",") if origin.strip()]
        if isinstance(value, list):
            # Ensure no nested internal strings
            return [str(item).strip() for item in value if item]
        return []

    # Redis configuration for Rate Limiting & Telemetry Cache
    REDIS_URL: str = Field(...)

    # External APIs to ping for telemetry: set these in production via env

    # Omni-Dispatch Pipeline Configurations
    MONGODB_URL: str = Field(...)

    TELEGRAM_BOT_TOKEN: str = Field(...)
    TELEGRAM_CHAT_ID: str = Field(...)

    SMTP_HOST: str = Field(...)
    SMTP_PORT: int = Field(...)
    SMTP_USER: str = Field(...)
    SMTP_PASSWORD: str = Field(...)

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
