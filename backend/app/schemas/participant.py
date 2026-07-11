from pydantic import BaseModel


class ParticipantCreate(BaseModel):
    meeting_id: str
    display_name: str


class ParticipantResponse(BaseModel):
    meeting_id: str
    display_name: str
    is_host: bool

    class Config:
        from_attributes = True