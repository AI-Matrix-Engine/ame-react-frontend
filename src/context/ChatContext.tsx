import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { iChat } from "@/utils/types";

const ChatContext = createContext<{
    currentChat: number;
    setCurrentChat: (chatIndex: number) => void;
    chatHistory: iChat[];
    setChatHistory: React.Dispatch<
        React.SetStateAction<iChat[]>
    >;
}>({
    currentChat: 0,
    setCurrentChat: () => { },
    chatHistory: [],
    setChatHistory: () => { }
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<number>(0);
    const [chatHistory, setChatHistory] = useState<iChat[]>([]);

    return (
        <ChatContext.Provider
            value={{
                currentChat,
                chatHistory,
                setCurrentChat,
                setChatHistory
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);

    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }

    return context;
};
