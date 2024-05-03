import { useChat } from "@/context/ChatContext";
import { iChat } from "@/utils/types";
import React, { useState } from "react";
import { BsChatQuote, BsChevronCompactRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { TbMinusVertical } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../_shared/Tooltip";
import ChatItem from "./ChatItem";


interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = () => {
  const { currentChat, chatHistory, setCurrentChat, setChatHistory } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const AddNewChat = () => {
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].msgArr.length === 0) {
      setCurrentChat(chatHistory.length - 1);
      return; // If the last chat has an empty msgArr, return without adding new chat
    }

    const newChat: iChat = {
      title: 'New Chat',
      msgArr: []
    };

    setChatHistory(prev => [...prev, newChat]);
    setCurrentChat(chatHistory.length);
  };

  const ChatClicked = (index: number) => {
    setCurrentChat(index);
  };

  return (
    <aside
      className={`flex chatbot-leftbar w-fit h-full z-20`}
    >
      <div className={`h-full w-64 flex flex-col transform transition-transform duration-300 p-2 ${isSidebarOpen ? "" : "hidden"}`}>
        <div className="flex justify-between flex-col ">
          <div onClick={() => { AddNewChat() }} className="flex cursor-pointer pl-2 py-2 pr-1 chatbot-leftbar-hover rounded-md duration-150">
            <div className="w-1/2 flex items-start justify-start font-bold text-md">
              <BsChatQuote size={24} className="pr-2" />
              <button>New Chat</button>
            </div>
            <div className="w-1/2 flex items-end justify-end mb-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FiEdit size={18} />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={-100}>New Chat</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mt-4 pt-4">
            {
              chatHistory?.map((chat, index) => (
                <div key={index} onClick={() => ChatClicked(index)} className={`relative w-full px-2 ${currentChat === index && `leftbar-item-selected`} chatbot-leftbar-hover rounded-md duration-150`}>
                  <ChatItem chatIndex={index} chatTitle={chat.title}></ChatItem>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div
        className={`h-full flex items-center justify-center`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {isSidebarOpen ? (
          <TbMinusVertical onClick={toggleSidebar} className=" cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150" />
        ) : (
          <BsChevronCompactRight onClick={toggleSidebar} className="cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150" />
        )}
      </div>
    </aside >
  );
};

export default Sidebar;