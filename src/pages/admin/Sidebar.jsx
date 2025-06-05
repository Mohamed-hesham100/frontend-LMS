import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  ChartNoAxesColumn,
  SquareLibrary,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      to: "dashboard",
      icon: <ChartNoAxesColumn size={22} />,
      label: "Dashboard",
    },
    {
      to: "course",
      icon: <SquareLibrary size={22} />,
      label: "Courses",
    },
    {
      to: "subscribers",
      icon: <Users size={22} />,
      label: "Subscribers",
    },
    {
      to: "settings",
      icon: <Settings size={22} />,
      label: "Settings",
    },
  ];

  return (
    <div className="flex mt-5 relative">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full w-[250px] bg-gray-100 dark:bg-gray-900 p-5 z-40 shadow-lg
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:shadow-none border-r border-gray-300 dark:border-gray-700
        `}
      >
        <div className="lg:hidden flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-200"
          >
            <X />
          </button>
        </div>

        <div className="mt-12 space-y-6">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition duration-200 ${
                  isActive
                    ? "bg-purple-500 text-white"
                    : "text-gray-800 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex-1 md:p-24 p-2 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ml-0 lg:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
