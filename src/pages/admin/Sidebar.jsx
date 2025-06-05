import {
  ChartNoAxesColumn,
  SquareLibrary,
  Users,
  Settings,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex mt-5">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-5 sticky top-0 h-screen">
        <div className="mt-12 space-y-6">
          {/* Dashboard */}
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-800 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              }`
            }
          >
            <ChartNoAxesColumn size={22} />
            <span>Dashboard</span>
          </NavLink>

          {/* Courses */}
          <NavLink
            to="course"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-800 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              }`
            }
          >
            <SquareLibrary size={22} />
            <span>Courses</span>
          </NavLink>

          {/* Subscribers */}
          <NavLink
            to="subscribers"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-800 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              }`
            }
          >
            <Users size={22} />
            <span>Subscribers</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-gray-800 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
              }`
            }
          >
            <Settings size={22} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Main content
      <div className="flex-1 md:p-24 p-2 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Outlet />
      </div> */}
    </div>
  );
};

export default Sidebar;
