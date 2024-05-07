import React from "react";
import { BiPlus } from "react-icons/bi";
import { useChat } from "@/context/ChatContext";
import { iChat } from "@/utils/types";
import { AiFillEdit } from "react-icons/ai";
import ChatItem from "./ChatItem";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { currentChat, chatHistory, setCurrentChat, setChatHistory } = useChat();

  const AddNewChat = () => {
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
      className={`w-64 bg-gray-900 p-4 text-white border-r border-gray-600 h-full z-10 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between flex-col">
        <div onClick={AddNewChat} className="flex items-center justify-center cursor-pointer border p-2 border-gray-600">
          <BiPlus size={24} />
          <button>New Chat</button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          {
            chatHistory?.map((chat, index) => (
              <div key={index} onClick={() => ChatClicked(index)} className="w-full">
                <ChatItem chatIndex={index} chatTitle={chat.title}></ChatItem>
              </div>
            ))
          }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;