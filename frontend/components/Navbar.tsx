"use client";

export default function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">

      {/* Left */}

      <div className="flex flex-col">

        <h1 className="text-2xl font-bold text-[#0E72ED]">
          Zoom Clone
        </h1>

        <p className="text-sm text-gray-500">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative">

          🔔

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition">

          <div className="w-10 h-10 rounded-full bg-[#0E72ED] flex items-center justify-center text-white font-bold text-lg">

            M

          </div>

          <div>

            <p className="font-semibold text-gray-800">
              Mili
            </p>

            <p className="text-xs text-gray-500">
              Host
            </p>

          </div>

        </div>

      </div>

    </nav>
  );
}