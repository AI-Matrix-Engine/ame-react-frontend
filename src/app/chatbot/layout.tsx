"use client";
import Sidebar from "@/components/chatbot/Sidebar";
import React, { useState } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full grow relative dark:bg-[#18181b] dark:text-[#c3c3c3]">
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
      <div
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 ${isSidebarOpen ? "translate-x-full ml-48" : "translate-x-0"
          } cursor-pointer z-20`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {isSidebarOpen ? (
          <MdOutlineArrowLeft size={36} onClick={toggleSidebar} />
        ) : (
          <MdOutlineArrowRight size={36} onClick={toggleSidebar} />
        )}
      </div>
      <main
        className={`flex-1 flex flex-col transition-margin duration-300`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
