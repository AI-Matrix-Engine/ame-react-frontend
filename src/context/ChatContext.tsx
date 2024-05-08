import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

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
    const { user } = useAuth();
    useEffect(() => {    
        const handledata = async () => {
          const result = await axios.get('https://aimatrix-api.vercel.app/api/aichat', {
            params: {
                user_id: user?.uid
            }
          })
    
          const chatData = result.data;
          console.log('chatData', chatData)
    
          if (chatData) {
            setIndex(chatData._id)
            if (chatData?.history) {
              setChatHistory(chatData?.history);
              if(chatData?.history.length > 0) {
                setCurrentChat(0);
              }
            }
          }
        }
    
        handledata();
      }, [])

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
