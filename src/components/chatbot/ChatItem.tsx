import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useChat } from "@/context/ChatContext";
import { BsThreeDots } from "react-icons/bs";
import { RiArchive2Line } from "react-icons/ri";
import { iChat } from "@/utils/types";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../_shared/Tooltip";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { GrFormEdit } from "react-icons/gr";

interface ChatItemProps {
  chatIndex: number;
  chatTitle: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatIndex, chatTitle }) => {
  const [isChangeTitle, setIsChangeTitle] = useState<boolean>(false);
  const { chatHistory, setChatHistory } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const changeTitleRef = useRef<HTMLDivElement>(null);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsChangeTitle(false);
  };

  useEffect(() => {
    setTitle(chatTitle);
  }, [chatTitle]);

  useEffect(() => {
    if (isChangeTitle) return;
    let data: iChat[] = chatHistory;
    data[chatIndex].title = title;
    setChatHistory(data);
  }, [isChangeTitle]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
    if (
      changeTitleRef.current &&
      !changeTitleRef.current.contains(event.target as Node)
    ) {
      setIsChangeTitle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleItemClick = (action: string) => {
    // Implement your logic for each item here
    console.log("Clicked:", action);
    setIsOpen(false);
  };

  const handleDeleteClick = (index: number) => {
    setChatHistory((prev) => prev.filter((_, i) => i !== index));
    setIsOpen(false);
  };

  return (
    <div
      onDoubleClick={() => setIsChangeTitle(true)}
      className="py-2 cursor-pointer flex flex-row items-center justify-between"
      ref={changeTitleRef}
    >
      {isChangeTitle ? (
        <form
          onSubmit={submitHandler}
          className="w-full p-1 border-2 border-blue-600 text-black dark:text-white"
        >
          <input
            type="text"
            placeholder="New chat"
            className="w-full leftbar-item-selected outline-none font-semibold text-lg"
            spellCheck="false"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      ) : (
        <div className="single-line-text font-semibold text-lg">
          {title || "New chat"}
        </div>
      )}
      {!isChangeTitle && (
        <div className="flex ml-2 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BsThreeDots
                  size={18}
                  className="opacity-100 hover:opacity-50"
                  onClick={() => setIsOpen(true)}
                />
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>More</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <RiArchive2Line size={18} />
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Archive</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isOpen && (
            <div
              className="absolute top-6 -right-30 dark:bg-[#2F2F2F] text-black dark:text-white text-md mt-4 w-48 p-2 gap-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-10 z-50"
              ref={dropdownRef}
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div
                  className="flex p-3 gap-2 w-full opacity-100 hover:bg-[#ECECEC] dark:hover:bg-[#424242]  text-left rounded-md"
                  onClick={() => handleItemClick("Share")}
                >
                  <FiShare size={18} />
                  <button role="menuitem">Share</button>
                </div>
                <div
                  className="flex p-3 gap-2 w-full opacity-100 hover:bg-[#ECECEC] dark:hover:bg-[#424242]  text-left rounded-md"
                  onClick={() => {
                    setIsChangeTitle(!isChangeTitle);
                    setIsOpen(false);
                  }}
                >
                  <GrFormEdit size={18} />
                  <button role="menuitem">Rename</button>
                </div>
                <div
                  className="flex p-3 gap-2 w-full text-red-500 font-semibold opacity-100 hover:bg-[#ECECEC] dark:hover:bg-[#424242]  text-left rounded-md"
                  onClick={() => handleDeleteClick(chatIndex)}
                >
                  <RiDeleteBinLine size={18} />
                  <button role="menuitem">Delete chat</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
