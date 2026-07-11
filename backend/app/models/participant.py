from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from app.database import Base
from datetime import datetime


class Participant(Base):
    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(String, ForeignKey("meetings.meeting_id"))
    display_name = Column(String)
    joined_at = Column(DateTime, default=datetime.utcnow)
    is_host = Column(Boolean, default=False)