"use client";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { RightNavbar } from "./RightNavbar";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationBar } from "./NavigationBar";
import { iLeftSidebarExpand, childrenProp } from "@/utils/types";
import { TbMinusVertical } from "react-icons/tb";
import { BsChevronCompactRight } from "react-icons/bs";



export const Main = ({ children }: childrenProp) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<iLeftSidebarExpand>({
    command: true,
    app: true,
  });

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
      <div className="flex h-screen flex-col">
        <Header darkMode={darkMode} setMode={setDarkMode} />
        <div className="flex relative h-full  overflow-x-hidden overflow-y-hidden">
          {/* -----------Left side bar begin----------- */}
          <div className="flex">
            <div
              className={`bg-[#252b36] ${isExpand.command && "w-[300px]"} flex`}
            >
              {isExpand.command && (
                <div className="flex-1 py-[16px] pl-[16px] [transition:all_.3s_ease-in-out]">
                  <h1 className="text-white font-semibold text-xl mb-[20px]">
                    Command Center
                  </h1>
                  <NavigationBar textColor="text-white" />
                </div>
              )}
              <div className="flex items-center px-2">
                {isExpand.command ? (
                  <TbMinusVertical 
                    className="text-white cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                    onClick={() =>
                      setIsExpand((prev) => ({
                        ...prev,
                        command: !prev.command,
                      }))
                    }
                  />
                ) : (
                  <BsChevronCompactRight 
                    className="text-white cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                    onClick={() =>
                      setIsExpand((prev) => ({
                        ...prev,
                        command: !prev.command,
                      }))
                    }
                  />
                )}
              </div>
            </div>
            <div className={`bg-[#F8F9FB] flex`}>
              {isExpand.app && (
                <div className="flex-1 py-[16px] pl-[16px]">
                  <h1 className="text-black font-semibold text-lg mb-[20px]">
                    App Controls
                  </h1>
                  <NavigationBar textColor="text-black" />
                </div>
              )}
              <div className="flex items-center px-2">
                {isExpand.app ? (
                  <TbMinusVertical 
                    className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                    onClick={() =>
                      setIsExpand((prev) => ({
                        ...prev,
                        app: !prev.app,
                      }))
                    }
                  />
                ) : (
                  <BsChevronCompactRight
                    className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                    onClick={() =>
                      setIsExpand((prev) => ({
                        ...prev,
                        app: !prev.app,
                      }))
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {/* -----------Left side bar end----------- */}

          <div className={`flex-1 overflow-y-auto `}>{children}</div>

          {/* -----------Left side bar begin----------- */}
          <RightNavbar />
          {/* -----------Left side bar end----------- */}
        </div>
      </div>
    </AuthProvider>
  );
};
