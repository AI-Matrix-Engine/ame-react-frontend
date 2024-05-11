"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import axios from "axios";
import Icon from "../icons";
import { FiUpload } from "react-icons/fi";
import { redirect } from "next/navigation";
import { SiChatwoot } from "react-icons/si";
import { socketService } from "@/lib/socket";
import { BsChatQuote } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { HiDotsVertical } from "react-icons/hi";
import MarkdownView from "../_shared/MarkdownView";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import MyMessageView from "../_shared/MyMessageView";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { iMessage, eRoleType, iChat } from "@/utils/types";
import {  MdSend, MdPerson, MdChat } from "react-icons/md";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { BiPlus, BiUser, BiSend, BiSolidUserCircle } from "react-icons/bi";

function ChatForm() {
  const messageTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string | null>("")
  const [msgHistory, setMsgHistory] = useState<iMessage[]>([]);
  const [streamText, setStreamText] = useState<string>('');
  const scrollToLastItem = useRef<HTMLDivElement | null>(null);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState(22);
  const [aiResponse, setAiResponst] = useState<string>("");

  const {
    currentChat,
    chatHistory,
    index,
    setIndex,
    setChatHistory,
    setCurrentChat,
  } = useChat();

  const getChatHistory = () => {
    let data = "";
    msgHistory.map((chat: iMessage) => {
      data += `${chat.content}\n`;
    });
    return data;
  };

  const editHandler = (index: number, content: string): void => {
    setIsResponseLoading(true);
    const updatedTest = msgHistory
      .filter((item, i) => i <= index)
      .map((item, i) => {
        if (i === index) {
          return { ...item, content: content };
        }
        return item;
      });

    setMsgHistory(updatedTest);
    sendMessage(content);
  };

  const reloadHandler = (): void => {
    const updatedTest = msgHistory.filter(
      (item, i) => i < msgHistory.length - 1
    );

    setMsgHistory(updatedTest);
    sendMessage(updatedTest[updatedTest.length - 1].content);
  };

  useEffect(() => {
    const textarea = document.getElementById("messageTextarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      setTextareaHeight(textarea.scrollHeight);
    }
  }, [message]);


  const { user } = useAuth();


  useEffect(() => {
    const intervalFunction = async () => {
      if (index.length === 0) return;

      try {
        // Call API for saving current chat data

        const response = await axios.put('https://aimatrix-api.vercel.app/api/aichat', {
          id: index,
          history: chatHistory
        });

        if (response.status !== 200) {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        // Handle any errors during the API call
        console.error('Error saving chat data:', error);
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
      content: msg
    };

    setMsgHistory(prev => [
      ...prev,
      newMessage
    ]);
  }

  const typeMessageCharacterByCharacter = (message: string) => {
    return new Promise<void>((resolve) => {
      var i = -1;
      var typingInterval = setInterval(() => {
        if (i < message.length - 1) {
          setStreamText(prev => prev + message[i]);
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

  const sendMessage = (msg: string) => {
    const messageData = {
      message: msg ?? message,
      history: getChatHistory(),
      settings: {
        customOptions: false,
        aiPreferencesMain: "Direct AI chat",
        aiPreferencesSecond: "Chat With One AI",
        quickAnswer: true,
        improveQuestions: false,
        makeSmallTalk: true,
        submitOnEnter: true
      },
      page: "chatbot.backend_functions.openai_chatbot"
    };

    const socket = socketService.getSocket();

    if (socket) {
      socket.emit("user_message", messageData, (response: any) => { });
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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler(e);
    }
  };

  const submitHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!message) return;
    setIsResponseLoading(true);
    setErrorText("");
    // add the code for your socket or anything

    try {
      // Simulate API call
      sendMessage(message);
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
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr)
    }

    if (!socketService.getSocket()) {
      socketService.init(user?.token ? user.token : "", user?.uid ? user.uid : "");
    }

    const socket = socketService.getSocket();

    if (socket) {
      socket.on('ai_response', (receivedData: any) => {
        setStreamText("");
        setIsResponseLoading(false);
        setAiResponst(receivedData);
        displayUserMessage(receivedData, eRoleType.ASSISTANT);
      });
    }

    return () => {
      socket?.off('ai_response');
    };
  }, [])

  useEffect(() => {
    if (aiResponse.length === 0) return;

    setTimeout(() => {
      setStreamText(prev => prev + aiResponse.substring(prev.length, prev.length + 5))
      if (streamText.length >= aiResponse.length) {
        setAiResponst('');
        setStreamText('');
      }
    }, 10)
  }, [streamText, aiResponse])

  useEffect(() => {
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr)
    }
  }, [chatHistory])

  useEffect(() => {
    if (streamText === '' || !isResponseLoading)
      return;

    setIsResponseLoading(false);
    scrollToBottom();
  }, [streamText])

  useEffect(() => {
    scrollToBottom();

    if (msgHistory.length === 0) return;

    if (chatHistory.length === 0) {
      setChatHistory(prev => [...prev, {
        title: 'New Chat',
        msgArr: msgHistory
      }])
    } else {
      let data: iChat[] = chatHistory;

      data[currentChat] = {
        title: chatHistory[currentChat].title,
        msgArr: msgHistory
      };

      setChatHistory(data);
    }
  }, [msgHistory])

  useEffect(() => {
    if (chatHistory.length > currentChat) {
      setMsgHistory(chatHistory[currentChat].msgArr);
    }
  }, [currentChat])

  const toggleSidebar = useCallback((): void => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  return (
    <div className="flex h-[90vh] w-full text-sm">
      <main className="flex-1 flex flex-col">
        {!currentTitle && (
          <div className="flex flex-col items-center justify-center p-4 text-md">
            <h1>AI Matrix</h1>
            <h3>How can I help you today?</h3>
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

        <div ref={scrollToLastItem} className="w-full sm:w-3/4 md:2/3 mx-auto flex flex-col h-full overflow-y-auto">
          <ul className="space-y-4 p-4">
            {msgHistory.map((chatMsg, idx) => (
              <li
                key={idx}
                className={`flex items-center mx-auto lg:pl-32 rounded-lg`}
              >
                <div className="w-full">
                  <div className="flex">
                    <div className="pr-2">
                      {chatMsg.role === eRoleType.USER ? (
                        <BiSolidUserCircle className="w-8 h-8" />
                      ) : (
                        <SiChatwoot className="w-8 h-8"></SiChatwoot>
                      )}
                    </div>
                    <p className="font-bold text-lg">
                      {chatMsg.role === "user" ? "You" : "AIDRM"}
                    </p>
                  </div>
                  {chatMsg.role === "user" ? (
                    <MyMessageView
                      content={chatMsg.content}
                      index={idx}
                      uniqueKey={`${idx}${currentChat}`}
                      onSave={editHandler}
                    />
                  ) : (
                    <MarkdownView
                      content={
                        idx === msgHistory.length - 1 &&
                          chatMsg.role === eRoleType.ASSISTANT &&
                          streamText.length > 0
                          ? streamText
                          : chatMsg.content
                      }
                      reloadIcon={idx === msgHistory.length - 1}
                      reloadHandler={reloadHandler}
                      index={idx}
                    />
                  )}
                </div>
              </li>
            ))}
            {isResponseLoading && (
              <li
                key={msgHistory.length + 1}
                className={`flex items-center mx-auto lg:pl-32 rounded-lg`}
              >
                <div>
                  <div className="flex">
                    <div className="pr-2">
                      <SiChatwoot className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-lg">{"AIDRM"}</p>
                  </div>
                  <div className="flex flex-grow flex-col max-w-full ml-10 animate-pulse mb-20">
                    <div>
                      <div className="relative h-5 w-5 rounded-full bg-black"></div>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] stretch">
          {errorText && <p className="text-red-500">{errorText}</p>}
          <form
            className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
            onSubmit={submitHandler}
          >
            <div className="relative h-full max-w-full flex-1 overflow-hidden textarea-container flex flex-col w-full p-2 flex-grow border rounded-xl bg-token-main-surface-primary border-token-border-medium">
              <textarea
                ref={messageTextareaRef}
                id="messageTextarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message AIDRM…"
                className="m-0 w-full text-md resize-none bg-transparent dark:bg-transparent py-[10px] pr-10 md:p-3.5 md:pr-12 max-h-[200px] placeholder-black/50 dark:placeholder-white/50 pl-4 md:pl-6 textarea-field outline-none"
                rows={1}
              ></textarea>
              {!isResponseLoading && (
                <button
                  className="absolute bottom-1.5 right-1.5 rounded-md border p-1.5  transition-colors disabled:bg-gray-300 enabled:bg-current bg-black dark:bg-white"
                  data-testid="send-button"
                >
                  <Icon name="sendMsg" className="" color={'white'} />
                </button>
              )}
            </div>
          </form>
          <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px]">
            <span>
              AIDRM can make mistakes. Consider checking important information.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatForm;
