# Zoom Clone – Video Conferencing Platform

A Zoom-inspired video conferencing web application built using **Next.js**, **FastAPI**, and **SQLite**. The application replicates Zoom's core meeting workflows, allowing users to create, schedule, and join meetings through a clean and responsive interface.

## Features

- Create Instant Meetings
- Schedule Meetings
- Join Meetings using Meeting ID
- Meeting Validation
- Auto-generated Meeting ID
- Shareable Invite Link
- Camera & Microphone Controls
- Screen Sharing
- Meeting Timer
- Upcoming Meetings Dashboard
- Recent Meetings Dashboard
- Responsive UI

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- Pydantic

### Database
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

Open the application at:

```
http://localhost:3000
```

## Project Structure

```
zoom-clone/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── zoom.db
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── public/
│
└── README.md
```

## Future Improvements

- User Authentication
- Multi-user Video Conferencing
- Chat Support
- Meeting Recording
- Host Controls
- Virtual Background