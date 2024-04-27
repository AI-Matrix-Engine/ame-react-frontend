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

interface ChatMessage {
  title: string;
  role: "user" | "gpt";
  content: string;
}

function ChatFrom() {
  const [text, setText] = useState<string>("");
  const [message, setMessage] = useState<ChatMessage | null>(null);
  const [previousChats, setPreviousChats] = useState<ChatMessage[]>([]);
  const [localChats, setLocalChats] = useState<ChatMessage[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const scrollToLastItem = useRef<HTMLLIElement | null>(null);

  const createNewChat = (): void => {
    setMessage(null);
    setText("");
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle: string): void => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText("");
  };

  const toggleSidebar = useCallback((): void => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!text) return;

    setIsResponseLoading(true);
    setErrorText("");

    // add the code for your socket or anything

    try {
      // Simulate API call
    } catch (e: any) {
      setErrorText(e.message);
      console.error(e);
    } finally {
      setIsResponseLoading(false);
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
    const storedChats = localStorage.getItem("previousChats");
    if (storedChats) {
      setLocalChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      const newChat = {
        title: currentTitle,
        role: "user",
        content: text,
      };

      const responseMessage = {
        title: currentTitle,
        role: message!.role,
        content: message!.content,
      };

      setPreviousChats((prevChats: any) => [
        ...prevChats,
        newChat,
        responseMessage,
      ]);
      setLocalChats((prevChats: any) => [
        ...prevChats,
        newChat,
        responseMessage,
      ]);

      const updatedChats = [...localChats, newChat, responseMessage];
      localStorage.setItem("previousChats", JSON.stringify(updatedChats));
    }
  }, [message, currentTitle, text, localChats]);

  const currentChat = (localChats || previousChats).filter(
    (prevChat) => prevChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  );

  const localUniqueTitles = Array.from(
    new Set(localChats.map((prevChat) => prevChat.title).reverse())
  ).filter((title) => !uniqueTitles.includes(title));

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

        <div className="flex flex-col h-full overflow-y-auto">
          <ul className="space-y-4 p-4">
            {currentChat.map((chatMsg, idx) => (
              <li
                key={idx}
                ref={scrollToLastItem}
                className={`flex items-center gap-4 p-4 ${chatMsg.role === "user" ? "bg-blue-600" : "bg-gray-700"
                  } rounded-lg`}
              >
                {chatMsg.role === "user" ? (
                  <BiSolidUserCircle size={36} />
                ) : (
                  <img
                    src="images/chatgpt-logo.svg"
                    alt="ChatGPT"
                    className="w-9 h-9"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {chatMsg.role === "user" ? "You" : "ChatGPT"}
                  </p>
                  <p>{chatMsg.content}</p>
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
              value={isResponseLoading ? "Processing..." : text}
              onChange={(e) => setText(e.target.value)}
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
