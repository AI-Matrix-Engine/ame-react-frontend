"use client";
import { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";

import { FormData } from "../matrix_apps/run/Run";
export const RightNavbar = ({ isOpen }: { isOpen: boolean }) => {
  const navItems = [
    {
      name: "WhatsApp",
      path: "/create",
      icon: <ChatBubbleIcon className="h-4 w-4 text-gray-500" />,
    },
    {
      name: "Emails",
      path: "/run",
      icon: <EnvelopeIcon className="h-4 w-4 text-gray-500" />,
    },
    {
      name: "Clients",
      path: "/chatbot",
      icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
    },
  ];
  const [sidebar, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    setSidebar(isOpen);
  }, [isOpen])

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div
      className={`bg-white dark:bg-[#18181b]  text-white ${sidebar ? "w-[300px] pl-2" : "w-6"
        } relative overflow-hidden h-full`}
    >
      <div className="h-full overflow-hidden">
        {sidebar ? (
          <div className="h-full flex flex-col">
            <div className=" px-4 flex justify-between items-center py-4">
              <h1 className="text-black dark:text-white font-semibold text-xl">Matrix AI</h1>
            </div>
            <div
              className={`flex-1 flex flex-col justify-between items-between text-black dark:text-white p-4 overflow-y-auto overflow-x-hidden`}
            >
              <h4 className="text-center">Form</h4>
              <FormData additionalClasses={"space-y-4"} />
            </div>

            <div className="h-full absolute -left-0 top-0 flex items-center justify-center">
              <TbMinusVertical
                className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                onClick={handleSidebar}
              />
            </div>
          </div>
        ) : (
          <div className=" h-full flex justify-center items-center relative">
            <button onClick={handleSidebar} className="top-[50%]">
              <BsChevronCompactLeft
                className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                onClick={handleSidebar}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
