from sqlalchemy.orm import Session
from app.models.meeting import Meeting
import uuid


def create_meeting(db: Session, meeting):

    meeting_id = str(uuid.uuid4())[:8]

    meeting_link = f"http://localhost:3000/meeting/{meeting_id}"

    new_meeting = Meeting(
        meeting_id=meeting_id,
        title=meeting.title,
        description=meeting.description,
        host_name=meeting.host_name,
        meeting_link=meeting_link,
        scheduled_at=meeting.scheduled_at,
        duration=meeting.duration
    )

    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)

    return new_meeting
def get_all_meetings(db: Session):
    return db.query(Meeting).all()
def get_meeting_by_id(db: Session, meeting_id: str):
    return db.query(Meeting).filter(
        Meeting.meeting_id == meeting_id
    ).first()
