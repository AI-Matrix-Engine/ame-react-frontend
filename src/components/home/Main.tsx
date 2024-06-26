"use client";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { RightNavbar } from "./RightNavbar";
import { childrenProp } from "@/utils/types";
import { FirstNavBar } from "../layout/FirstNavBar";

import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";

export const Main = ({ navItems, children }: childrenProp) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <ChatProvider>
        <div className="flex h-screen flex-col">
          <Header darkMode={darkMode} setMode={setDarkMode} />
          <div className="flex relative h-full  overflow-x-hidden overflow-y-hidden">
            {/* -----------Left side bar begin----------- */}
            <FirstNavBar navItems={navItems} />
            {/* -----------Left side bar end----------- */}

            <div className={`flex-1 overflow-y-auto `}>{children}</div>

            {/* -----------Right side bar begin----------- */}
            <RightNavbar />
            {/* -----------Right side bar end----------- */}
          </div>
        </div>
      </ChatProvider>
    </AuthProvider>
  );
};
