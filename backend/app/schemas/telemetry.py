from pydantic import BaseModel

class TelemetryStat(BaseModel):
    value: str
    label: str
    note: str

class TelemetryResponse(BaseModel):
    stats: list[TelemetryStat]
