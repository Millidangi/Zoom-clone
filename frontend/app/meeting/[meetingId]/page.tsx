
// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import api from "../../../services/api";

// // export default function MeetingRoom() {
// //   const { meetingId } = useParams();
// //   const router = useRouter();

// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const streamRef = useRef<MediaStream | null>(null);

// //   const [micOn, setMicOn] = useState(true);
// //   const [cameraOn, setCameraOn] = useState(true);

// //   const [displayName, setDisplayName] = useState("Guest");
// //   const [meetingTitle] = useState("Zoom Meeting");
// //   const [participants] = useState(1);

// //   const [loading, setLoading] = useState(true);
// //   const [seconds, setSeconds] = useState(0);

// //   const [meetingData, setMeetingData] = useState<any>(null);
// //   const [meetingExists, setMeetingExists] = useState(true);

// //   useEffect(() => {
// //     const name = localStorage.getItem("displayName");

// //     if (name) {
// //       setDisplayName(name);
// //     }

// //     startCamera();

// //     const timer = setInterval(() => {
// //       setSeconds((prev) => prev + 1);
// //     }, 1000);

// //     return () => {
// //       stopAllTracks();
// //       clearInterval(timer);
// //     };
// //   }, []);
// //     const startCamera = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: true,
// //         audio: true,
// //       });

// //       streamRef.current = stream;

// //       if (videoRef.current) {
// //         videoRef.current.srcObject = stream;
// //       }

// //       setMicOn(true);
// //       setCameraOn(true);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Please allow Camera & Microphone permissions.");
// //     }
// //   };

// //   const stopAllTracks = () => {
// //     if (!streamRef.current) return;

// //     streamRef.current.getTracks().forEach((track) => track.stop());
// //   };

// //   const toggleMic = () => {
// //     if (!streamRef.current) return;

// //     const audioTrack = streamRef.current.getAudioTracks()[0];

// //     if (!audioTrack) return;

// //     audioTrack.enabled = !audioTrack.enabled;

// //     setMicOn(audioTrack.enabled);
// //   };

// //   const toggleCamera = () => {
// //     if (!streamRef.current) return;

// //     const videoTrack = streamRef.current.getVideoTracks()[0];

// //     if (!videoTrack) return;

// //     videoTrack.enabled = !videoTrack.enabled;

// //     setCameraOn(videoTrack.enabled);
// //   };

// //   const shareScreen = async () => {
// //     try {
// //       const screenStream = await navigator.mediaDevices.getDisplayMedia({
// //         video: true,
// //       });

// //       if (videoRef.current) {
// //         videoRef.current.srcObject = screenStream;
// //       }

// //       const screenTrack = screenStream.getVideoTracks()[0];

// //       screenTrack.onended = async () => {
// //         const cameraStream = await navigator.mediaDevices.getUserMedia({
// //           video: true,
// //           audio: true,
// //         });

// //         streamRef.current = cameraStream;

// //         if (videoRef.current) {
// //           videoRef.current.srcObject = cameraStream;
// //         }
// //       };
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const formatTime = () => {
// //     const hrs = Math.floor(seconds / 3600)
// //       .toString()
// //       .padStart(2, "0");

// //     const mins = Math.floor((seconds % 3600) / 60)
// //       .toString()
// //       .padStart(2, "0");

// //     const secs = (seconds % 60)
// //       .toString()
// //       .padStart(2, "0");

// //     return `${hrs}:${mins}:${secs}`;
// //   };

// //   const copyMeetingId = () => {
// //     navigator.clipboard.writeText(String(meetingId));
// //     alert("Meeting ID copied!");
// //   };

// //   const copyInviteLink = () => {
// //     navigator.clipboard.writeText(window.location.href);
// //     alert("Invite Link copied!");
// //   };

// //   const leaveMeeting = () => {
// //     stopAllTracks();
// //     router.push("/");
// //   };
// //     return (
// //     <div className="h-screen bg-[#111827] flex flex-col">

// //       {/* Header */}

// //       <div className="flex justify-between items-center px-8 py-4 bg-[#1F2937] border-b border-gray-700">

// //         <div>

// //           <h1 className="text-2xl font-bold text-white">
// //             {meetingTitle}
// //           </h1>

// //           <p className="text-gray-300 mt-1">
// //             Meeting ID : {meetingId}
// //           </p>

// //         </div>

// //         <div className="flex items-center gap-4">

// //           <div className="bg-gray-800 rounded-lg px-4 py-2">

// //             <p className="text-sm text-gray-400">
// //               Participant
// //             </p>

// //             <p className="text-white font-semibold">
// //               👤 {displayName}
// //             </p>

// //           </div>

// //           <div className="bg-gray-800 rounded-lg px-4 py-2">

// //             <p className="text-sm text-gray-400">
// //               Participants
// //             </p>

// //             <p className="text-white font-semibold">
// //               👥 {participants}
// //             </p>

// //           </div>

// //           <div className="bg-green-700 rounded-lg px-4 py-2">

// //             <p className="text-sm text-green-100">
// //               Meeting Time
// //             </p>

// //             <p className="text-white font-bold">
// //               {formatTime()}
// //             </p>

// //           </div>

// //         </div>

// //       </div>

// //       {/* Video Area */}

// //       <div className="flex-1 flex flex-col justify-center items-center">

// //         {loading && (
// //           <p className="text-white mb-4 animate-pulse text-lg">
// //             Starting Camera...
// //           </p>
// //         )}

// //         <video
// //           ref={videoRef}
// //           autoPlay
// //           playsInline
// //           muted
// //           className="w-[900px] rounded-2xl bg-black border-4 border-gray-700 shadow-2xl"
// //         />

// //         <div className="flex gap-4 mt-6">

// //           <button
// //             onClick={copyMeetingId}
// //             className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
// //           >
// //             📋 Copy Meeting ID
// //           </button>

// //           <button
// //             onClick={copyInviteLink}
// //             className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
// //           >
// //             🔗 Copy Invite Link
// //           </button>

// //         </div>

// //       </div>
// //           {/* Bottom Controls */}

// //       <div className="h-24 bg-black border-t border-gray-800 flex justify-center items-center gap-5">

// //         <button
// //           onClick={toggleMic}
// //           className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
// //             micOn
// //               ? "bg-green-600 hover:bg-green-700"
// //               : "bg-red-600 hover:bg-red-700"
// //           }`}
// //         >
// //           {micOn ? "🎤 Mic ON" : "🔇 Mic OFF"}
// //         </button>

// //         <button
// //           onClick={toggleCamera}
// //           className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
// //             cameraOn
// //               ? "bg-green-600 hover:bg-green-700"
// //               : "bg-red-600 hover:bg-red-700"
// //           }`}
// //         >
// //           {cameraOn ? "📹 Camera ON" : "📷 Camera OFF"}
// //         </button>

// //         <button
// //           onClick={shareScreen}
// //           className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
// //         >
// //           🖥 Share Screen
// //         </button>

// //         <button
// //           onClick={copyMeetingId}
// //           className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
// //         >
// //           📋 Copy ID
// //         </button>

// //         <button
// //           onClick={copyInviteLink}
// //           className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
// //         >
// //           🔗 Copy Link
// //         </button>

// //         <button
// //           onClick={leaveMeeting}
// //           className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold transition"
// //         >
// //           🚪 Leave Meeting
// //         </button>

// //       </div>

// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "../../../services/api";

// export default function MeetingRoom() {
//   const { meetingId } = useParams();
//   const router = useRouter();

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const [micOn, setMicOn] = useState(true);
//   const [cameraOn, setCameraOn] = useState(true);

//   const [displayName, setDisplayName] = useState("Guest");
//   const [meetingTitle, setMeetingTitle] = useState("Zoom Meeting");
//   const [participants, setParticipants] = useState(1);

//   const [loading, setLoading] = useState(true);
//   const [seconds, setSeconds] = useState(0);

//   const [meetingData, setMeetingData] = useState<any>(null);
//   const [meetingExists, setMeetingExists] = useState(true);

//   useEffect(() => {
//     const name = localStorage.getItem("displayName");

//     if (name) {
//       setDisplayName(name);
//     }

//     fetchMeeting();
//     startCamera();

//     const timer = setInterval(() => {
//       setSeconds((prev) => prev + 1);
//     }, 1000);

//     return () => {
//       stopAllTracks();
//       clearInterval(timer);
//     };
//   }, []);

//   const fetchMeeting = async () => {
//     try {
//       const res = await api.get(`/meetings/${meetingId}`);

//       setMeetingData(res.data);
//       setMeetingTitle(res.data.title);
//       setMeetingExists(true);

//     } catch (err) {
//       console.log(err);
//       setMeetingExists(false);
//     }
//   };
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       setMicOn(true);
//       setCameraOn(true);
//       setLoading(false);

//     } catch (err) {
//       console.error(err);
//       alert("Please allow Camera & Microphone permissions.");
//     }
//   };

//   const stopAllTracks = () => {
//     if (!streamRef.current) return;

//     streamRef.current.getTracks().forEach((track) => track.stop());
//   };

//   const toggleMic = () => {
//     if (!streamRef.current) return;

//     const audioTrack = streamRef.current.getAudioTracks()[0];

//     if (!audioTrack) return;

//     audioTrack.enabled = !audioTrack.enabled;

//     setMicOn(audioTrack.enabled);
//   };

//   const toggleCamera = () => {
//     if (!streamRef.current) return;

//     const videoTrack = streamRef.current.getVideoTracks()[0];

//     if (!videoTrack) return;

//     videoTrack.enabled = !videoTrack.enabled;

//     setCameraOn(videoTrack.enabled);
//   };

//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//       });

//       if (videoRef.current) {
//         videoRef.current.srcObject = screenStream;
//       }

//       const screenTrack = screenStream.getVideoTracks()[0];

//       screenTrack.onended = async () => {
//         const cameraStream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         streamRef.current = cameraStream;

//         if (videoRef.current) {
//           videoRef.current.srcObject = cameraStream;
//         }

//         setMicOn(true);
//         setCameraOn(true);
//       };
//     } catch (err) {
//       console.error(err);
//     }
//   };
//     const formatTime = () => {
//     const hrs = Math.floor(seconds / 3600)
//       .toString()
//       .padStart(2, "0");

//     const mins = Math.floor((seconds % 3600) / 60)
//       .toString()
//       .padStart(2, "0");

//     const secs = (seconds % 60)
//       .toString()
//       .padStart(2, "0");

//     return `${hrs}:${mins}:${secs}`;
//   };

//   const copyMeetingId = () => {
//     navigator.clipboard.writeText(String(meetingId));
//     alert("Meeting ID copied successfully!");
//   };

//   const copyInviteLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     alert("Invite Link copied successfully!");
//   };

//   const leaveMeeting = () => {
//     stopAllTracks();
//     router.push("/");
//   };

//   if (!meetingExists) {
//     return (
//       <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-white">

//         <h1 className="text-5xl font-bold mb-4">
//           Meeting Not Found
//         </h1>

//         <p className="text-gray-400 mb-8">
//           This meeting does not exist or has already ended.
//         </p>

//         <button
//           onClick={() => router.push("/")}
//           className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
//         >
//           Back to Dashboard
//         </button>

//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-[#111827] flex flex-col">

//       {/* Header */}

//       <div className="flex justify-between items-center px-8 py-4 bg-[#1F2937] border-b border-gray-700">

//         <div>

//           <h1 className="text-2xl font-bold text-white">
//             {meetingData?.title || meetingTitle}
//           </h1>

//           <p className="text-gray-300 mt-1">
//             Meeting ID : {meetingId}
//           </p>

//         </div>
//                 <div className="flex items-center gap-4">

//           <div className="bg-gray-800 rounded-xl px-5 py-3">

//             <p className="text-xs text-gray-400 uppercase">
//               Participant
//             </p>

//             <p className="text-white font-semibold mt-1">
//               👤 {displayName}
//             </p>

//           </div>

//           <div className="bg-gray-800 rounded-xl px-5 py-3">

//             <p className="text-xs text-gray-400 uppercase">
//               Participants
//             </p>

//             <p className="text-white font-semibold mt-1">
//               👥 {participants}
//             </p>

//           </div>

//           <div className="bg-green-700 rounded-xl px-5 py-3">

//             <p className="text-xs text-green-100 uppercase">
//               Duration
//             </p>

//             <p className="text-white font-bold mt-1">
//               ⏱ {formatTime()}
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* Video Section */}

//       <div className="flex-1 flex flex-col justify-center items-center">

//         {loading && (

//           <div className="flex flex-col items-center mb-6">

//             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

//             <p className="text-white mt-4">
//               Starting Camera...
//             </p>

//           </div>

//         )}

//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-[900px] rounded-2xl bg-black border-4 border-gray-700 shadow-2xl"
//         />

//         <div className="flex gap-4 mt-6">

//           <button
//             onClick={copyMeetingId}
//             className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
//           >
//             📋 Copy Meeting ID
//           </button>

//           <button
//             onClick={copyInviteLink}
//             className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
//           >
//             🔗 Copy Invite Link
//           </button>

//         </div>

//       </div>
//             {/* Bottom Controls */}

//       <div className="h-24 bg-black border-t border-gray-800 flex justify-center items-center gap-5">

//         <button
//           onClick={toggleMic}
//           className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
//             micOn
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-red-600 hover:bg-red-700"
//           }`}
//         >
//           {micOn ? "🎤 Mic ON" : "🔇 Mic OFF"}
//         </button>

//         <button
//           onClick={toggleCamera}
//           className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
//             cameraOn
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-red-600 hover:bg-red-700"
//           }`}
//         >
//           {cameraOn ? "📹 Camera ON" : "📷 Camera OFF"}
//         </button>

//         <button
//           onClick={shareScreen}
//           className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
//         >
//           🖥️ Share Screen
//         </button>

//         <button
//           onClick={copyMeetingId}
//           className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
//         >
//           📋 Copy ID
//         </button>

//         <button
//           onClick={copyInviteLink}
//           className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
//         >
//           🔗 Copy Link
//         </button>

//         <button
//           onClick={leaveMeeting}
//           className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold transition"
//         >
//           🚪 Leave Meeting
//         </button>

//       </div>
//           </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

export default function MeetingRoom() {
  const { meetingId } = useParams();
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const [displayName, setDisplayName] = useState("Guest");
  const [meetingTitle, setMeetingTitle] = useState("Zoom Meeting");
  const [participants, setParticipants] = useState(1);

  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);

  const [meetingData, setMeetingData] = useState<any>(null);
  const [meetingExists, setMeetingExists] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem("displayName");

    if (name) {
      setDisplayName(name);
    }

    fetchMeeting();
    startCamera();

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      stopAllTracks();
      clearInterval(timer);
    };
  }, []);

  const fetchMeeting = async () => {
    try {
      const res = await api.get(`/meetings/${meetingId}`);

      setMeetingData(res.data);
      setMeetingTitle(res.data.title);
      setMeetingExists(true);

    } catch (err) {
      console.log(err);
      setMeetingExists(false);
    }
  };
    const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setMicOn(true);
      setCameraOn(true);
      setLoading(false);

    } catch (err) {
      console.error(err);
      alert("Please allow Camera & Microphone permissions.");
    }
  };

  const stopAllTracks = () => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => track.stop());
  };

  const toggleMic = () => {
    if (!streamRef.current) return;

    const audioTrack = streamRef.current.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setMicOn(audioTrack.enabled);
  };

  const toggleCamera = () => {
    if (!streamRef.current) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setCameraOn(videoTrack.enabled);
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      const screenTrack = screenStream.getVideoTracks()[0];

      screenTrack.onended = async () => {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = cameraStream;

        if (videoRef.current) {
          videoRef.current.srcObject = cameraStream;
        }

        setMicOn(true);
        setCameraOn(true);
      };

    } catch (err) {
      console.error(err);
    }
  };
    const formatTime = () => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");

    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const copyMeetingId = () => {
    navigator.clipboard.writeText(String(meetingId));
    alert("Meeting ID copied successfully!");
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Invite Link copied successfully!");
  };

  const leaveMeeting = () => {
    stopAllTracks();
    router.push("/");
  };

  if (!meetingExists) {
    return (
      <div className="h-screen bg-[#111827] flex flex-col items-center justify-center text-white">

        <div className="bg-[#1F2937] p-10 rounded-3xl shadow-2xl text-center">

          <div className="text-7xl mb-5">
            ❌
          </div>

          <h1 className="text-4xl font-bold mb-3">
            Meeting Not Found
          </h1>

          <p className="text-gray-300 mb-8">
            This meeting does not exist or has already ended.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-[#0E72ED] hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  };

  return (
    <div className="h-screen bg-[#111827] flex flex-col">

      {/* Header */}

      <div className="h-20 bg-[#1F2937] border-b border-gray-700 px-8 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-white">
            {meetingData?.title || meetingTitle}
          </h1>

          <p className="text-gray-400 mt-1">
            Meeting ID : {meetingId}
          </p>

        </div>
                <div className="flex items-center gap-4">

          <div className="bg-gray-800 rounded-2xl px-5 py-3 shadow-lg">

            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Participant
            </p>

            <p className="text-white font-semibold mt-1">
              👤 {displayName}
            </p>

          </div>

          <div className="bg-gray-800 rounded-2xl px-5 py-3 shadow-lg">

            <p className="text-xs uppercase text-gray-400 tracking-wider">
              Participants
            </p>

            <p className="text-white font-semibold mt-1">
              👥 {participants}
            </p>

          </div>

          <div className="bg-green-600 rounded-2xl px-5 py-3 shadow-lg">

            <p className="text-xs uppercase text-green-100 tracking-wider">
              Duration
            </p>

            <p className="text-white font-bold mt-1">
              ⏱ {formatTime()}
            </p>

          </div>

        </div>

      </div>

      {/* Video Area */}

      <div className="flex-1 flex flex-col items-center justify-center px-10">

        {loading && (

          <div className="flex flex-col items-center mb-8">

            <div className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

            <p className="text-white mt-5 text-lg">
              Starting Camera...
            </p>

          </div>

        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-[950px] max-w-full rounded-3xl bg-black border-4 border-gray-700 shadow-2xl"
        />

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <button
            onClick={copyMeetingId}
            className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
          >
            📋 Copy Meeting ID
          </button>

          <button
            onClick={copyInviteLink}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            🔗 Copy Invite Link
          </button>

        </div>

      </div>
            {/* Bottom Controls */}

      <div className="h-24 bg-[#111111] border-t border-gray-800 flex items-center justify-center gap-5 px-6">

        <button
          onClick={toggleMic}
          className={`w-36 h-14 rounded-2xl font-semibold text-white transition-all ${
            micOn
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {micOn ? "🎤 Mic ON" : "🔇 Mic OFF"}
        </button>

        <button
          onClick={toggleCamera}
          className={`w-40 h-14 rounded-2xl font-semibold text-white transition-all ${
            cameraOn
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {cameraOn ? "📹 Camera ON" : "📷 Camera OFF"}
        </button>

        <button
          onClick={shareScreen}
          className="w-44 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
        >
          🖥 Share Screen
        </button>

        <button
          onClick={copyMeetingId}
          className="w-36 h-14 rounded-2xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-all"
        >
          📋 Copy ID
        </button>

        <button
          onClick={copyInviteLink}
          className="w-40 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all"
        >
          🔗 Copy Link
        </button>

        <button
          onClick={leaveMeeting}
          className="w-44 h-14 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold transition-all"
        >
          🚪 Leave Meeting
        </button>

      </div>
    </div>
  );
}