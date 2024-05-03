"use client";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { RightNavbar } from "./RightNavbar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { NavigationBar } from "./NavigationBar";
import { iLeftSidebarExpand, childrenProp } from "@/utils/types";
import { TbMinusVertical } from "react-icons/tb";
import { BsChevronCompactRight } from "react-icons/bs";
import { Dropdown } from "../_shared";
import { Menu } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "../_shared/Avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { menuItems } from "./Data";
import { FirstNavBar } from "../layout/FirstNavBar";
import { ChatProvider } from "@/context/ChatContext";

const recipies = [
  { value: "0", label: "danielove323@g" },
  { value: "3", label: "Content Writing" },
  { value: "1", label: "SEO" },
];

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
            {/* <RightNavbar /> */}
            {/* -----------Right side bar end----------- */}
          </div>
        </div>
      </ChatProvider>
    </AuthProvider>
  );
};
