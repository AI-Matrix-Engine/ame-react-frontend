"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  BiPlus,
  BiUser,
  BiChat,
  BiSend,
  BiSolidUserCircle,
} from "react-icons/bi";
import {
  MdOutlineArrowLeft,
  MdOutlineArrowRight,
  MdSend,
  MdPerson,
  MdChat,
} from "react-icons/md";
import { socketService } from "@/lib/socket";
import { iMessage, eRoleType, iChat } from "@/utils/types";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import MarkdownView from "../_shared/MarkdownView";
import { redirect } from "next/navigation";
import { FiUpload } from "react-icons/fi";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { HiDotsVertical } from "react-icons/hi";

function ChatForm() {
  const [message, setMessage] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string | null>("");
  const [msgHistory, setMsgHistory] = useState<iMessage[]>([]);
  const [streamText, setStreamText] = useState<string>("");
  const scrollToLastItem = useRef<HTMLDivElement | null>(null);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const [aiResponse, setAiResponst] = useState<string>("");

  const {
    currentChat,
    chatHistory,
    index,
    setIndex,
    setChatHistory,
    setCurrentChat,
  } = useChat();

  const { user } = useAuth();

  const getChatHistory = () => {
    let data = "";
    msgHistory.map((chat: iMessage) => {
      data += `${chat.content}\n`;
    });
    return data;
  };

  useEffect(() => {
    const intervalFunction = async () => {
      if (index.length === 0) return;

      try {
        // Call API for saving current chat data

        const response = await axios.put(
          "https://aimatrix-api.vercel.app/api/aichat",
          {
            id: index,
            history: chatHistory,
          }
        );

        if (response.status !== 200) {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        // Handle any errors during the API call
        console.error("Error saving chat data:", error);
      }
    };

    const intervalId: NodeJS.Timeout = setInterval(intervalFunction, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [index, chatHistory]);

  const displayUserMessage = (msg: string, type: eRoleType) => {
    const newMessage: iMessage = {
      role: type,
      content: msg,
    };

    setMsgHistory((prev) => [...prev, newMessage]);
  };

  const typeMessageCharacterByCharacter = (message: string) => {
    return new Promise<void>((resolve) => {
      var i = -1;
      var typingInterval = setInterval(() => {
        if (i < message.length - 1) {
          setStreamText((prev) => prev + message[i]);
          i++;
        } else {
          clearInterval(typingInterval);
          resolve();
        }
      }, 25);
    });
  };

  const processIncomingMessages = (data: string): void => {
    const dataArr: string[] = data.split("\n\n");

    dataArr
      .reduce((promise: Promise<void>, msg: string): Promise<void> => {
        return promise.then(() => typeMessageCharacterByCharacter(msg));
      }, Promise.resolve())
      .catch((error) => {
        console.error("An error occurred while processing messages:", error);
      });
  };

  const sendMessage = () => {
    const messageData = {
      message,
      history: getChatHistory(),
      settings: {
        customOptions: false,
        aiPreferencesMain: "Direct AI chat",
        aiPreferencesSecond: "Chat With One AI",
        quickAnswer: true,
        improveQuestions: false,
        makeSmallTalk: true,
        submitOnEnter: true,
      },
      page: "chatbot.backend_functions.openai_chatbot",
    };

    const socket = socketService.getSocket();

    if (socket) {
      socket.emit("user_message", messageData, (response: any) => {});
      console.log("Socket emit completed, awaiting callback...");
    }
  };

  const clearMessageInput = () => {
    setMessage("");
  };

  const scrollToBottom = () => {
    if (scrollToLastItem.current) {
      scrollToLastItem.current.scrollTop =
        scrollToLastItem.current.scrollHeight;
    }
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!message) return;

    setIsResponseLoading(true);
    setErrorText("");
    // add the code for your socket or anything

    try {
      // Simulate API call
      sendMessage();
      displayUserMessage(message, eRoleType.USER);
      clearMessageInput();
    } catch (e: any) {
      setErrorText(e.message);
      console.error(e);
    } finally {
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsShowSidebar(window.innerWidth <= 640);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!user?.uid || !user.token) {
      redirect("/login");
    }
  }, [user]);

  useEffect(() => {
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr);
    }

    if (!socketService.getSocket()) {
      socketService.init(
        user?.token ? user.token : "",
        user?.uid ? user.uid : ""
      );
    }

    const socket = socketService.getSocket();

    if (socket) {
      socket.on("ai_response", (receivedData: any) => {
        setStreamText("");
        setIsResponseLoading(false);
        setAiResponst(receivedData);
        displayUserMessage(receivedData, eRoleType.ASSISTANT);
      });
    }

    return () => {
      socket?.off("ai_response");
    };
  }, []);

  useEffect(() => {
    if (aiResponse.length === 0) return;

    setTimeout(() => {
      setStreamText(
        (prev) => prev + aiResponse.substring(prev.length, prev.length + 5)
      );
      if (streamText.length >= aiResponse.length) {
        setAiResponst("");
        setStreamText("");
      }
    }, 10);
  }, [streamText, aiResponse]);

  useEffect(() => {
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (streamText === "" || !isResponseLoading) return;

    setIsResponseLoading(false);
    scrollToBottom();
  }, [streamText]);

  useEffect(() => {
    scrollToBottom();

    if (msgHistory.length === 0) return;

    if (chatHistory.length === 0) {
      setChatHistory((prev) => [
        ...prev,
        {
          title: "New Chat",
          msgArr: msgHistory,
        },
      ]);
    } else {
      let data: iChat[] = chatHistory;

      data[currentChat] = {
        title: chatHistory[currentChat].title,
        msgArr: msgHistory,
      };

      setChatHistory(data);
    }
  }, [msgHistory]);

  useEffect(() => {
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr);
    }
  }, [currentChat]);

  const toggleSidebar = useCallback((): void => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  return (
    <div className="flex h-[90vh] w-full text-sm">
      <main className="flex-1 flex flex-col">
        {!currentTitle && (
          <div className="flex flex-col items-center justify-center p-4 text-md">
            <h1 className="text-black dark:text-white">AI Matrix</h1>
            <h3 className="text-black dark:text-white">
              How can I help you today?
            </h3>
          </div>
        )}

        {isShowSidebar ? (
          <MdOutlineArrowRight
            className="absolute top-1/2 left-0 transform -translate-x-full cursor-pointer"
            size={36}
            onClick={toggleSidebar}
          />
        ) : (
          <MdOutlineArrowLeft
            className="absolute top-1/2 left-0 transform -translate-x-full cursor-pointer"
            size={36}
            onClick={toggleSidebar}
          />
        )}

        <div
          ref={scrollToLastItem}
          className="w-full sm:w-3/4 md:2/3 mx-auto flex flex-col h-full overflow-y-auto"
        >
          <ul className="space-y-4 p-4">
            {msgHistory.map((chatMsg, idx) => (
              <li key={idx} className={`relative flex gap-8 p-4 rounded group`}>
                <div className="h-8 flex">
                  {chatMsg.role === eRoleType.USER ? (
                    <MdPerson size={24} className="text-black dark:text-white" />
                  ) : (
                    <MdChat size={22} className="text-black dark:text-white" />
                  )}
                </div>
                <div>
                  <p className="mb-2 text-black dark:text-white">
                    {chatMsg.role === eRoleType.USER ? "You" : "AI Matrix"}
                  </p>
                  <p>
                    {idx === msgHistory.length - 1 &&
                    chatMsg.role === eRoleType.ASSISTANT &&
                    streamText.length > 0 ? (
                      <MarkdownView index={idx} content={streamText} />
                    ) : (
                      <MarkdownView index={idx} content={chatMsg.content} />
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto p-8 w-full sm:w-3/4 md:2/3 mx-auto">
          {errorText && <p className="text-red-500">{errorText}</p>}
          <form className="flex items-center relative" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Send a message"
              className="flex-1 px-4 py-3 rounded-lg outline-none dark:bg-[#252b36] dark:text-[#c3c3c3]"
              spellCheck="false"
              value={isResponseLoading ? "Processing..." : message}
              onChange={(e) => setMessage(e.target.value)}
              readOnly={isResponseLoading}
            />
            {!isResponseLoading && (
              <div className="flex items-center absolute right-2 p-2 space-x-3">
                <FiUpload size={16} color="#888" className="cursor-pointer" />
                <button type="submit">
                  <ArrowUpIcon
                    width={22}
                    height={22}
                    className="flex-1 flex items-center justify-center p-1 rounded bg-[#888888]"
                    color="#ffffff"
                  />
                </button>
              </div>
            )}
            <HiDotsVertical className="font-semibold text-xl cursor-pointer dark:text-[#9b9a9a] absolute right-[-2rem]" />
          </form>
          <p className="text-center mt-3 text-sm text-black dark:text-white/70">
            AI Matrix can make mistakes. Consider checking important information
          </p>
        </div>
      </main>
    </div>
  );
}

export default ChatForm;
