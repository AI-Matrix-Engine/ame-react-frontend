"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDoubleRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { ArrowsRightLeftIcon,ChevronLeftIcon } from "@heroicons/react/24/outline";
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
  const [sidebar,setSidebar] = useState(true);
  const handleSidebar = ()=> {
    setSidebar(!sidebar);
  }
  return (
    <div
      className={`bg-[#F8F9FB] text-white    ${sidebar ? 'w-[300px]' : "w-6"} `}
    >
      {sidebar ? (
      <div >
            <div className=" px-4 flex justify-between items-center mt-8">
            <h5 className={`text-black text-center`}>Command Center</h5>
        <button onClick={handleSidebar}>
        <ArrowsRightLeftIcon className={`h-4 w-4 text-black flex justify-end`} />
             </button>
      </div>
      <ul className={`flex flex-col justify-between items-between text-black`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex  text=white p-4 hover:bg-[#e5e7eb]cursor-pointer justify-around items-center gap-4`}
              >
               <div>  {item.icon}</div>
               <h4 className="text-center flex-1"> {item.name}</h4>
              
              </Link>
            </li>
          ))}
        </ul>
             
      </div>
      ) : (
        <div className=" h-full flex justify-center   items-center relative  ">
         
                 <button onClick={handleSidebar} className="top-[50%]" >
            <ChevronLeftIcon className="h-4 w-4 text-gray-500 flex justify-end" />
          </button>
    
         
        </div>
      )}
     
    </div>
  );
};
