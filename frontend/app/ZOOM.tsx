"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import MeetingCard from "../components/MeetingCard";
import CreateMeetingModal from "../components/modals/CreateMeetingModal";
import JoinMeetingModal from "../components/modals/JoinMeetingModal";

export default function Home() {
  const [meetings, setMeetings] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);

  const [instantMeeting, setInstantMeeting] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await api.get("/meetings/");
      setMeetings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Good Morning, Mili 👋
          </h1>

          <DashboardCards
            onNewMeeting={() => {
              setInstantMeeting(true);
              setOpenModal(true);
            }}
            onScheduleMeeting={() => {
              setInstantMeeting(false);
              setOpenModal(true);
            }}
            onJoinMeeting={() => setOpenJoinModal(true)}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                Upcoming Meetings
              </h2>

              {meetings.length === 0 ? (
                <p className="text-gray-500">
                  No upcoming meetings
                </p>
              ) : (
                <div className="space-y-4">
                  {meetings.map((meeting: any) => (
                    <MeetingCard
                      key={meeting.id}
                      title={meeting.title}
                      host={meeting.host_name}
                      status={meeting.status}
                    />
                  ))}
                </div>
              )}

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                Recent Meetings
              </h2>

              <p className="text-gray-500">
                No recent meetings
              </p>

            </div>

          </div>

          <CreateMeetingModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onMeetingCreated={fetchMeetings}
            instantMeeting={instantMeeting}
          />

          <JoinMeetingModal
            isOpen={openJoinModal}
            onClose={() => setOpenJoinModal(false)}
          />

        </main>

      </div>

    </div>
  );
}