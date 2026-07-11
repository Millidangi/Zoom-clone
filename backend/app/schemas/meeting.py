from pydantic import BaseModel
from datetime import datetime


class MeetingCreate(BaseModel):
    title: str
    description: str
    host_name: str
    scheduled_at: datetime
    duration: int


class MeetingResponse(BaseModel):
    meeting_id: str
    title: str
    description: str
    host_name: str
    meeting_link: str
    scheduled_at: datetime
    duration: int

    class Config:
        from_attributes = True