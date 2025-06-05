import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 md:p-24 p-2 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
