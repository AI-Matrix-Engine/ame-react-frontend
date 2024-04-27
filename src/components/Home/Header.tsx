"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_shared/Avatar";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import Link from "next/link";
import { iHeader } from "@/utils/types";

export const Header = ({ darkMode, setMode }: iHeader) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex py-1 px-4 bg-[#252b36] dark:bg-[#18181b] dark:border-b dark:border-b-[#ffffff1a] items-center justify-center h-[64px] z-[1]">
      <h2 className="flex-1 text-2xl text-white font-arimo font-semibold">
        AIDRM
      </h2>

      <div className="flex items-center">
        <div onClick={() => setMode(!darkMode)}>
          {darkMode ? (
            <MdOutlineNightlight className="text-white text-2xl mr-5 cursor-pointer" />
          ) : (
            <MdOutlineLightMode className="text-white text-2xl mr-5 cursor-pointer" />
          )}
        </div>
        {true ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center items-center w-full rounded-md shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-white hover:bg-gray-700">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-[10px]">{'Tom Cook'}</p>
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    onClick={async () => {
                      try {
                        await logout();
                        await router.push("/login");
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};