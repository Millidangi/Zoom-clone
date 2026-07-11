from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import Base, engine

from app.models.meeting import Meeting
from app.models.participant import Participant
from app.routers import meeting
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Zoom Clone API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(meeting.router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Zoom Clone API 🚀"
    }