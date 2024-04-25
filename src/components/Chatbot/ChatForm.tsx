"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { BiPlus, BiUser, BiSend, BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { socketService } from "@/lib/socket";
import { iMessage, eRoleType } from "@/utils/types";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

function ChatFrom() {
  const [message, setMessage] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string | null>("")
  const [chatHistory, setChatHistory] = useState<iMessage[]>([]);
  const [streamText, setStreamText] = useState<string>('');
  const scrollToLastItem = useRef<HTMLDivElement | null>(null);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);

  const getChatHistory = () => {
    let data = '';
    chatHistory.map((chat: iMessage) => {
      data += `${chat.content}\n`
    })
    return data;
  }

  const fetchChatsFromStorage = () => {
    const storedChats: string | null = localStorage.getItem("previousChats");
    if (storedChats && storedChats.length > 2) {
      setChatHistory(JSON.parse(storedChats));
    }
  }

  const displayUserMessage = (msg: string, type: eRoleType) => {
    const newMessage: iMessage = {
      role: type,
      content: msg
    };

    setChatHistory(prev => [
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
        submitOnEnter: true
      },
      page: "chatbot.backend_functions.openai_chatbot"
    };

    if (!socketService.getSocket()) {
      socketService.init();
    }

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
    fetchChatsFromStorage();

    if (!socketService.getSocket()) {
      socketService.init();
    }

    const socket = socketService.getSocket();

    if (socket) {
      socket.on('ai_response', (receivedData: any) => {
        setStreamText("");
        processIncomingMessages(receivedData);
        displayUserMessage(receivedData, eRoleType.ASSISTANT);
      });
    }

    return () => {
      socket?.off('ai_response');
    };
  }, [])

  useEffect(() => {
    if (streamText == '' || !isResponseLoading)
      return;

    setIsResponseLoading(false);
    scrollToBottom();
  }, [streamText])

  useEffect(() => {
    localStorage.setItem("previousChats", JSON.stringify(chatHistory));
    scrollToBottom();
  }, [chatHistory])

  const toggleSidebar = useCallback((): void => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  return (
    <div className="flex h-[90vh] bg-gray-800 w-full">
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
          <ul className="space-y-4 p-4">
            {chatHistory.map((chatMsg, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-4 p-4 ${chatMsg.role === eRoleType.USER ? "bg-blue-600" : "bg-gray-700"
                  } rounded-lg`}
              >
                <div className="w-8 h-8">
                  {chatMsg.role === eRoleType.USER ? (
                    <BiSolidUserCircle size={36} />
                  ) : (
                    <ChatBubbleIcon className="w-8 h-8"></ChatBubbleIcon>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {chatMsg.role === eRoleType.USER ? "You" : "ChatGPT"}
                  </p>
                  <p>{idx === chatHistory.length - 1 && chatMsg.role === eRoleType.ASSISTANT && streamText.length > 0 ? streamText : chatMsg.content}</p>
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

export default ChatFrom;
