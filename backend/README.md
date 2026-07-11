# Zoom Clone - Video Conferencing Platform

## Overview
A Zoom-inspired video conferencing platform built using Next.js, FastAPI, and SQLite.

## Features

- New Meeting
- Join Meeting
- Schedule Meeting
- Upcoming Meetings
- Recent Meetings
- Unique Meeting ID
- Shareable Invite Link
- Camera & Microphone Access
- Screen Sharing
- Meeting Timer
- Meeting Validation
- Responsive Dashboard

## Tech Stack

Frontend
- Next.js
- TypeScript
- Tailwind CSS

Backend
- FastAPI
- SQLAlchemy

Database
- SQLite

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

## Project Structure

```
frontend/
backend/
```

## Future Improvements

- Authentication
- Multiple Participants
- Chat
- Recording
- Host Controls
