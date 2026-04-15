from fastapi import APIRouter
from app.schemas.telemetry import TelemetryResponse
from app.services.telemetry_service import fetch_live_telemetry

router = APIRouter()

@router.get("", response_model=TelemetryResponse)
async def get_telemetry():
    """
    Fetches real-time status of backend services.
    """
    return await fetch_live_telemetry()
