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
      className={`w-64 p-4 border-r border-r-[#828282af] h-full z-10 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between flex-col text-sm">
        <div className="flex items-center justify-between p-2">
          <button>Chat History</button>
          <BiPlus size={18} onClick={AddNewChat} className="cursor-pointer" />
        </div>
        <div className="mt-4 p-2 border-t border-t-[#828282af]">
          {
            chatHistory?.map((chat, index) => (
              <div key={index} onClick={() => ChatClicked(index)} className="w-full">
                <ChatItem chatIndex={index} chatTitle={chat.title} />
              </div>
            ))
          }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;