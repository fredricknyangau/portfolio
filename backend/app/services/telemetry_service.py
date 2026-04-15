import httpx
import time
import asyncio
from app.core.config import settings
from app.core.logging import get_logger
from app.schemas.telemetry import TelemetryStat, TelemetryResponse

logger = get_logger(__name__)

async def ping_url(client: httpx.AsyncClient, url: str) -> tuple[bool, int]:
    """Pings a URL and returns (is_up, latency_in_ms)"""
    # Reject empty URLs implicitly before hitting network layer
    if not url:
        return False, 0
        
    try:
        start = time.time()
        # Fast timeout to ensure the dashboard doesn't hang linearly
        response = await client.get(url, timeout=4.0)
        latency = int((time.time() - start) * 1000)
        # Any response confirming the edge is alive counts as "Up" for ping purposes
        is_up = response.status_code < 500
        return is_up, latency
    except Exception as e:
        logger.debug(f"Failed to ping {url}: {e}")
        return False, 0

async def fetch_live_telemetry() -> TelemetryResponse:
    async with httpx.AsyncClient() as client:
        # Utilizing concurrent I/O mapping
        results = await asyncio.gather(
            ping_url(client, settings.KUKUFITI_HEALTH_URL),
            ping_url(client, settings.MMGATEWAY_HEALTH_URL),
            return_exceptions=True
        )
        
    kukufiti_up, k_lat = results[0] if not isinstance(results[0], Exception) else (False, 0)
    mmg_up, m_lat = results[1] if not isinstance(results[1], Exception) else (False, 0)
    
    # Real calculations
    nodes_up = sum(1 for status in [kukufiti_up, mmg_up] if status)
    total_nodes = 2
    
    uptime_display = f"{(nodes_up / total_nodes) * 100:.0f}%" if total_nodes > 0 else "0%"
    
    active_latencies = [lat for lat in [k_lat, m_lat] if lat > 0]
    avg_latency = sum(active_latencies) // len(active_latencies) if active_latencies else 0
    latency_display = f"<{avg_latency + 10}ms" if avg_latency else "Offline"
    
    # Render operational status
    render_status = "Operational" if nodes_up == total_nodes else "Degraded" if nodes_up > 0 else "Down"
    
    stats = [
        TelemetryStat(value=uptime_display, label='Edge Uptime', note='live concurrent probe'),
        TelemetryStat(value=latency_display, label='Node Latency', note='average edge routing'),
        TelemetryStat(value=str(nodes_up), label='Active Nodes', note=f'out of {total_nodes} deployments'),
        TelemetryStat(value=render_status, label='Render Env', note='infrastructure health')
    ]
    
    return TelemetryResponse(stats=stats)
