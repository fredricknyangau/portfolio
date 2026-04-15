from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio API"
    ENVIRONMENT: str = "development"
    
    # Cross-Origin
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "https://fredricknyangau.vercel.app", "http://localhost:4173"]
    
    # Redis configuration for Rate Limiting & Telemetry Cache
    REDIS_URL: str = "redis://localhost:6379/0"

    # External APIs to ping for telemetry
    KUKUFITI_HEALTH_URL: str = "https://kukufiti-production.up.railway.app/" # Replace with actual backend
    MMGATEWAY_HEALTH_URL: str = "https://mmgateway.onrender.com/" # Replace with actual backend

    # Omni-Dispatch Pipeline Configurations
    MONGODB_URL: str = "mongodb://localhost:27017"
    
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_CHAT_ID: str = ""
    
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 465
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
