"use client";
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";

import { FormData } from "../Run/Run";
export const RightNavbar = () => {
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
  const [sidebar, setSidebar] = useState<boolean>(true);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div
      className={`bg-[#F8F9FB] text-white ${
        sidebar ? "w-[300px] pl-2" : "w-6"
      } relative`}
    >
      {sidebar ? (
        <div>
          <div className=" px-4 flex justify-between items-center mt-4">
            <h1 className="text-black font-semibold text-xl">Matrix AI</h1>
          </div>
          <div
            className={`flex flex-col justify-between items-between text-black p-4 overflow-y-scroll`}
          >
            <h4 className="text-center">Form</h4>
            <FormData additionalClasses={"space-y-4"} />
          </div>
          <TbMinusVertical
            className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150 absolute -left-[0px] top-[50%]"
            onClick={handleSidebar}
          />
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
  );
};
