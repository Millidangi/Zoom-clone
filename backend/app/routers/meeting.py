from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.meeting import MeetingCreate
from app.crud.meeting import (
    create_meeting,
    get_all_meetings,
    get_meeting_by_id,
)

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"],
)


# Get all meetings
@router.get("/")
def get_meetings(
    db: Session = Depends(get_db)
):
    return get_all_meetings(db)


# Create new meeting
@router.post("/create")
def create_new_meeting(
    meeting: MeetingCreate,
    db: Session = Depends(get_db)
):
    return create_meeting(db, meeting)


# Get meeting by ID (Validation)
@router.get("/{meeting_id}")
def join_meeting(
    meeting_id: str,
    db: Session = Depends(get_db)
):
    meeting = get_meeting_by_id(db, meeting_id)

    if meeting is None:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return meeting