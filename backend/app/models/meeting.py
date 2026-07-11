from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    host_name = Column(String)
    meeting_link = Column(String)
    scheduled_at = Column(DateTime)
    duration = Column(Integer)
    status = Column(String, default="scheduled")
    created_at = Column(DateTime, default=datetime.utcnow)