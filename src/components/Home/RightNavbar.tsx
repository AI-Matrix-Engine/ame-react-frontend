"use client";
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
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
  const [sidebar, setSidebar] = useState(true);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div
      className={`bg-[#F8F9FB] text-white    ${sidebar ? "w-[300px]" : "w-6"} `}
    >
      {sidebar ? (
        <div>
          <div className=" px-4 flex justify-between items-center mt-8">
            <h5 className={`text-black text-center`}>Command Center</h5>
            <button onClick={handleSidebar}>
              <ArrowsRightLeftIcon
                className={`h-4 w-4 text-black flex justify-end`}
              />
            </button>
          </div>

          <div
            className={`flex flex-col justify-between items-between text-black p-4`}
          >
            <h4 className="text-center ">Form</h4>
            <FormData additionalClasses={"space-y-4"} />
          </div>
        </div>
      ) : (
        <div className=" h-full flex justify-center   items-center relative  ">
          <button onClick={handleSidebar} className="top-[50%]">
            <ChevronLeftIcon className="h-4 w-4 text-gray-500 flex justify-end" />
          </button>
        </div>
      )}
    </div>
  );
};
