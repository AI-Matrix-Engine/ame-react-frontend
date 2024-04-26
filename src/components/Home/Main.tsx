"use client";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationBar } from "./NavigationBar";
import { iLeftSidebarExpand, childrenProp } from "@/utils/types";
import { TbMinusVertical } from "react-icons/tb";
import { BsChevronCompactRight } from "react-icons/bs";
import { usePathname } from "next/navigation";

import { useRouter } from "next/compat/router";

import Spinner from "@/components/Spinner";

export const Main = ({ children }: childrenProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<iLeftSidebarExpand>({
    command: true,
    app: true,
  });

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pathname]);

  useEffect(() => {
    if (router) {
      router.events.on("routeChangeStart", startLoading);
      router.events.on("routeChangeComplete", stopLoading);
      return () => {
        router.events.off("routeChangeStart", startLoading);
        router.events.off("routeChangeComplete", stopLoading);
      };
    }
  }, [router]);

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
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex h-screen flex-col">
          <Header darkMode={darkMode} setMode={setDarkMode} />
          <div className="flex relative h-full  overflow-x-hidden overflow-y-hidden">
            {/* -----------Left side bar begin----------- */}
            <div className="flex">
              <div
                className={`bg-[#252b36] relative ${
                  isExpand.command && "w-[300px]"
                } flex dark:bg-[#18181b] dark:border-r dark:border-r-[#ffffff1a]`}
              >
                {isExpand.command && (
                  <div className="flex-1 py-[16px] pl-[16px] [transition:all_.3s_ease-in-out]">
                    <h1 className="text-white font-semibold text-xl mb-[10px]">
                      Command Center
                    </h1>
                    <div className="overflow-y-auto pr-[.35rem]">
                      <NavigationBar textColor="text-white" />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
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
            </div>
            <div className={`flex-1 overflow-y-auto `}>{children}</div>
          </div>
        </div>
      )}
    </AuthProvider>
  );
};
