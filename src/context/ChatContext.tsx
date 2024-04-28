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
    index: string,
    setIndex: (data: string) => void;
    chatHistory: iChat[];
    setChatHistory: React.Dispatch<
        React.SetStateAction<iChat[]>
    >;
}>({
    currentChat: 0,
    setCurrentChat: () => { },
    index: '',
    setIndex: () => {},
    chatHistory: [],
    setChatHistory: () => { }
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [currentChat, setCurrentChat] = useState<number>(0);
    const [chatHistory, setChatHistory] = useState<iChat[]>([]);
    const [index, setIndex] = useState<string>('');

    return (
        <ChatContext.Provider
            value={{
                currentChat,
                chatHistory,
                index,
                setIndex,
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
