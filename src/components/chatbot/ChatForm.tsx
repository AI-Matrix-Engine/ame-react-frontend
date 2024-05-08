"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { BiPlus, BiUser, BiChat, BiSend, BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { socketService } from "@/lib/socket";
import { iMessage, eRoleType, iChat } from "@/utils/types";
import { useChat } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import MarkdownView from "../_shared/MarkdownView";
import { redirect } from "next/navigation";

function ChatForm() {
  const [message, setMessage] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string | null>("")
  const [msgHistory, setMsgHistory] = useState<iMessage[]>([]);
  const [streamText, setStreamText] = useState<string>('');
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
    setCurrentChat
  } = useChat();

  const { user } = useAuth();

  const getChatHistory = () => {
    let data = '';
    msgHistory.map((chat: iMessage) => {
      data += `${chat.content}\n`
    })
    return data;
  }

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
  }

  const processIncomingMessages = (data: string): void => {
    const dataArr: string[] = data.split('\n\n');

    dataArr.reduce((promise: Promise<void>, msg: string): Promise<void> => {
      return promise.then(() => typeMessageCharacterByCharacter(msg));
    }, Promise.resolve())
      .catch(error => {
        console.error('An error occurred while processing messages:', error);
      });
  }

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
        submitOnEnter: true
      },
      page: "chatbot.backend_functions.openai_chatbot"
    };

    const socket = socketService.getSocket();

    if (socket) {
      socket.emit('user_message', messageData, (response: any) => {

      });
      console.log('Socket emit completed, awaiting callback...');
    }
  }

  const clearMessageInput = () => {
    setMessage('');
  }

  const scrollToBottom = () => {
    if (scrollToLastItem.current) {
      scrollToLastItem.current.scrollTop = scrollToLastItem.current.scrollHeight;
    }
  }

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
    if(!user?.uid || !user.token) {
      redirect('/login');
    }
  }, [user])

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
    if(aiResponse.length === 0) return;

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
    if (streamText == '' || !isResponseLoading)
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
    <div className="flex h-[90vh] bg-gray-900 w-full">
      <main className="flex-1 flex flex-col">
        {!currentTitle && (
          <div className="flex flex-col items-center justify-center text-white p-4">
            <h1>Chat GPT Clone</h1>
            <h3>How can I help you today?</h3>
          </div>
        )}

        {isShowSidebar ? (
          <MdOutlineArrowRight
            className="absolute top-1/2 left-0 transform -translate-x-full text-white cursor-pointer"
            size={36}
            onClick={toggleSidebar}
          />
        ) : (
          <MdOutlineArrowLeft
            className="absolute top-1/2 left-0 transform -translate-x-full text-white cursor-pointer"
            size={36}
            onClick={toggleSidebar}
          />
        )}

        <div ref={scrollToLastItem} className="flex flex-col h-full overflow-y-auto">
          <ul className="space-y-2 p-4">
            {msgHistory.map((chatMsg, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-lg`}
              >
                <div className="text-white w-8 h-8">
                  {chatMsg.role === eRoleType.USER ? (
                    <BiSolidUserCircle size={36} />
                  ) : (
                    <BiChat size={36} />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {chatMsg.role === eRoleType.USER ? "You" : "ChatGPT"}
                  </p>
                  <p className="text-white">
                    {idx === msgHistory.length - 1 && chatMsg.role === eRoleType.ASSISTANT && streamText.length > 0 ?
                      <MarkdownView
                        content={streamText}
                        width="800px"
                      />
                      :
                      <MarkdownView
                        content={chatMsg.content}
                        width="800px"
                      />
                    }
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto p-4">
          {errorText && <p className="text-red-500">{errorText}</p>}
          <form className="flex items-center gap-2" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Send a message."
              className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none"
              spellCheck="false"
              value={isResponseLoading ? "Processing..." : message}
              onChange={(e) => setMessage(e.target.value)}
              readOnly={isResponseLoading}
            />
            {!isResponseLoading && (
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg"
              >
                <BiSend size={24} />
              </button>
            )}
          </form>
          <p className="text-center text-gray-400 text-sm mt-2">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ChatForm;
