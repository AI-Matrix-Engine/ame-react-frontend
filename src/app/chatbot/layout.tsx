"use client";
import Sidebar from "@/components/chatbot/Sidebar";
import { RightNavbar } from "@/components/home/RightNavbar";
import withAuth from "@/components/withAuth";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full relative">
      <Sidebar />
      <main
        className={` h-full flex-1 flex flex-col transition-margin duration-300`}
      >
        {children}
      </main>
      {/* <RightNavbar isOpen={false} /> */}
    </div>
  );
};

export default withAuth(Layout);
