"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onMeetingCreated: () => void;
  instantMeeting: boolean;
};

export default function CreateMeetingModal({
  isOpen,
  onClose,
  onMeetingCreated,
  instantMeeting,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hostName, setHostName] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreateMeeting = async () => {
    if (!title.trim()) {
      alert("Please enter meeting title.");
      return;
    }

    if (!hostName.trim()) {
      alert("Please enter host name.");
      return;
    }

    if (!instantMeeting && !scheduledAt) {
      alert("Please select meeting date & time.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/meetings/create", {
        title,
        description,
        host_name: hostName,
        scheduled_at: instantMeeting
          ? new Date().toISOString()
          : scheduledAt,
        duration,
      });

      onMeetingCreated();

      setTitle("");
      setDescription("");
      setHostName("");
      setScheduledAt("");
      setDuration(30);

      onClose();

      if (instantMeeting) {
        router.push(`/meeting/${res.data.meeting_id}`);
      } else {
        alert("Meeting Scheduled Successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[550px] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0E72ED] px-8 py-6 text-white">
          <h2 className="text-3xl font-bold">
            {instantMeeting ? "New Meeting" : "Schedule Meeting"}
          </h2>

          <p className="text-blue-100 mt-1">
            {instantMeeting
              ? "Create and start a meeting instantly."
              : "Plan your meeting for later."}
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Meeting Title
            </label>

            <input
              type="text"
              placeholder="Weekly Team Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description
            </label>

            <textarea
              rows={3}
              placeholder="Meeting Agenda..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Host Name
            </label>

            <input
              type="text"
              placeholder="Mili Kumari"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {!instantMeeting && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Date & Time
              </label>

              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Duration (Minutes)
            </label>

            <input
              type="number"
              min={15}
              max={240}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 bg-gray-50 px-8 py-5">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateMeeting}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#0E72ED] hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Please Wait..."
              : instantMeeting
              ? "Start Meeting"
              : "Schedule Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}