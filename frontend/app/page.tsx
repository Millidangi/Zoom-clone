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
  const [recentMeetings, setRecentMeetings] = useState<any[]>([]);

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

      const recent = [...res.data].reverse().slice(0, 5);
      setRecentMeetings(recent);
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

          {/* Welcome */}

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-900">
                Good Morning, Mili 👋
              </h1>

              <p className="text-gray-500 mt-2">
                Ready to connect? Start or schedule your next meeting.
              </p>

            </div>

            <div className="hidden lg:flex gap-4">

              <div className="bg-white rounded-2xl shadow-md px-6 py-4">

                <p className="text-gray-500 text-sm">
                  Total Meetings
                </p>

                <h2 className="text-3xl font-bold text-[#0E72ED]">
                  {meetings.length}
                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-md px-6 py-4">

                <p className="text-gray-500 text-sm">
                  Scheduled
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  {
                    meetings.filter(
                      (m) => m.status?.toLowerCase() === "scheduled"
                    ).length
                  }
                </h2>

              </div>

            </div>

          </div>

          {/* Dashboard Cards */}

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

          {/* Meetings */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* Upcoming */}

            <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Upcoming Meetings
                </h2>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {meetings.length}
                </span>

              </div>

              {meetings.length === 0 ? (

                <div className="text-center py-16">

                  <div className="text-6xl">
                    📅
                  </div>

                  <h3 className="text-xl font-semibold mt-4 text-gray-700">
                    No Upcoming Meetings
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Schedule your first meeting to get started.
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

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

            </section>

            {/* Recent */}

            <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Meetings
                </h2>

                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {recentMeetings.length}
                </span>

              </div>

              {recentMeetings.length === 0 ? (

                <div className="text-center py-16">

                  <div className="text-6xl">
                    🕒
                  </div>

                  <h3 className="text-xl font-semibold mt-4 text-gray-700">
                    No Recent Meetings
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Your meeting history will appear here.
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  {recentMeetings.map((meeting: any) => (

                    <MeetingCard
                      key={meeting.id}
                      title={meeting.title}
                      host={meeting.host_name}
                      status={meeting.status}
                    />

                  ))}

                </div>

              )}

            </section>

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