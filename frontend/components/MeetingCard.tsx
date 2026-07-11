type Props = {
  title: string;
  host: string;
  status: string;
};

export default function MeetingCard({
  title,
  host,
  status,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>

          <p className="mt-3 text-gray-700 font-medium">
            👤 Host: {host}
          </p>

        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            status.toLowerCase() === "scheduled"
              ? "bg-green-100 text-green-700"
              : status.toLowerCase() === "live"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <div className="text-sm text-gray-500">
          📅 Upcoming Meeting
        </div>

        <button className="px-5 py-2 bg-[#0E72ED] hover:bg-blue-700 text-white rounded-lg transition">
          Join
        </button>

      </div>

    </div>
  );
}