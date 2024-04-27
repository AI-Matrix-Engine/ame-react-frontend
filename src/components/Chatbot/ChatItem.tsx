import React, { useState, useEffect } from "react"
import { AiFillEdit } from "react-icons/ai";
import { useChat } from "@/context/ChatContext";
import { iChat } from "@/utils/types";

interface ChatItemProps {
    chatIndex: number,
    chatTitle: string
}

const ChatItem: React.FC<ChatItemProps> = ({ chatIndex, chatTitle }) => {
    const [isChangeTitle, setIsChangeTitle] = useState<boolean>(false);
    const { currentChat, setCurrentChat, chatHistory, setChatHistory } = useChat();
    const [title, setTitle] = useState<string>(chatTitle)

    const submitHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsChangeTitle(false);
    };

    useEffect(() => {
        if (isChangeTitle) return;
        let data: iChat[] = chatHistory;
        data[chatIndex].title = title;
        setChatHistory(data);
    }, [isChangeTitle])

    return (
        <div onDoubleClick={() => setIsChangeTitle(true)} className="py-2 cursor-pointer flex flex-row items-center justify-between">
            {
                isChangeTitle ? (
                    <form onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="Send a message."
                            className="w-full flex p-1 mr-2 bg-gray-700 text-white rounded-lg outline-none"
                            spellCheck="false"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                ) : (
                    <div>{title}</div>
                )
            }
            <AiFillEdit onClick={() => setIsChangeTitle(!isChangeTitle)} />
        </div>
    )
}

export default ChatItem;