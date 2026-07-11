"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Home",
      icon: "🏠",
      href: "/",
    },
    {
      name: "Meetings",
      icon: "📹",
      href: "/meetings",
    },
    {
      name: "Calendar",
      icon: "📅",
      href: "/calendar",
    },
    {
      name: "Recordings",
      icon: "🎥",
      href: "/recordings",
    },
    {
      name: "Settings",
      icon: "⚙️",
      href: "/settings",
    },
  ];

  return (
    <aside className="w-64 bg-[#0E72ED] text-white min-h-screen flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="h-20 flex items-center justify-center border-b border-blue-500">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0E72ED] text-2xl font-bold shadow-md">
            Z
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Zoom
            </h1>

            <p className="text-xs text-blue-100">
              Video Conference
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-4 py-6">

        <p className="text-blue-200 uppercase text-xs tracking-widest mb-3 px-3">
          Main Menu
        </p>

        <div className="space-y-2">

          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.href
                  ? "bg-white text-[#0E72ED] font-bold shadow-lg"
                  : "hover:bg-blue-700 hover:translate-x-1"
              }`}
            >
              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="text-[16px]">
                {item.name}
              </span>

            </Link>
          ))}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-blue-500 p-5">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-white text-[#0E72ED] flex items-center justify-center text-xl font-bold shadow-md">
            M
          </div>

          <div>

            <h3 className="font-semibold">
              Mili
            </h3>

            <p className="text-xs text-blue-100">
              Meeting Host
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}