from typing import List
from pydantic import BaseModel, Field


class PlanRequest(BaseModel):
    user_input: str = Field(..., min_length=1, description="Planlamak istediğiniz günlük görevleri ve hedefleri yazın.")


class TimelineItem(BaseModel):
    time_slot: str
    title: str
    description: str
    category: str
    duration_minutes: int
    priority: str


class PlanResponse(BaseModel):
    summary: str
    total_estimated_hours: float
    timeline: List[TimelineItem]
