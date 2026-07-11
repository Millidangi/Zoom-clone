"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function JoinMeetingModal({
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [meetingId, setMeetingId] = useState("");

  if (!isOpen) return null;

  const handleJoin = () => {
    if (!displayName.trim()) {
      alert("Please enter your display name");
      return;
    }

    if (!meetingId.trim()) {
      alert("Please enter Meeting ID");
      return;
    }

    localStorage.setItem("displayName", displayName);

    router.push(`/meeting/${meetingId}`);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-[500px] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#0E72ED] px-8 py-6 text-white">

          <h2 className="text-3xl font-bold">
            Join Meeting
          </h2>

          <p className="text-blue-100 mt-1">
            Enter your details to join an existing meeting.
          </p>

        </div>

        {/* Body */}

        <div className="p-8 space-y-5">

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Display Name
            </label>

            <input
              type="text"
              placeholder="Mili Kumari"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meeting ID
            </label>

            <input
              type="text"
              placeholder="e.g. a1b2c3d4"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="bg-gray-50 px-8 py-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            className="px-6 py-3 rounded-xl bg-[#0E72ED] hover:bg-blue-700 text-white font-semibold transition"
          >
            Join Meeting
          </button>

        </div>

      </div>

    </div>
  );
}