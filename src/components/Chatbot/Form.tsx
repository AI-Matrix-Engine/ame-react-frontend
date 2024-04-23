"use client";
import React, { use } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../UI";
import { useState, useEffect, useRef } from "react";
import { socketService } from "@/lib/socket";

enum eMsgType {
  SENT = 'sent',
  RECIEVE = 'recieve'
}

interface iMessage {
  type: eMsgType,
  message: string
}

export const Form = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const [message, setMessage] = useState<string>("");
  const [customOptionVisible, setCustomOptionVisible] = useState<boolean>(false);
  const [makeSmallTalk, setMakeSmallTalk] = useState<boolean>(true);
  const [answerQuickly, setAnswerQuickly] = useState<boolean>(true);
  const [improveQuestion, setImproveQuestion] = useState<boolean>(false);
  const [submitOnEnter, setSubmitOnEnter] = useState<boolean>(true);
  const [aiPreferencesMain, setAIPreferencesMain] = useState<string>("Direct AI chat");
  const [aiPreferencesSecond, setAIPreferencesSecond] = useState<string>("Chat With One AI");
  const [chatHistory, setChatHistory] = useState<iMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socketService.getSocket()) {
      socketService.init();
    }

    const socket = socketService.getSocket();

    if (socket) {
      socket.on('ai_response', (receivedData: any) => {
        console.log('recievedData', receivedData)
        displayUserMessage(receivedData, eMsgType.RECIEVE);
      });
    }

    return () => {
      socket?.off('ai_response');
    };
  }, [])

  const handleKeydown = (e: any) => {
    if (e.key === 'Enter') {
      if (submitOnEnter) {
        e.preventDefault();
        handleSubmit();
      } else {
        console.log('Enter key pressed without Ctrl/Command or without submitOnEnter checked. No action taken.');
      }
    } else {
      console.log('Key pressed is not Enter. No action taken for this key.');
    }
  }

  const handleTextChange = (e: any) => {
    setMessage(e.target.value)
  }

  const handleCustomOption = (e: any) => {
    setCustomOptionVisible(!customOptionVisible);
  }

  const displayUserMessage = (msg: string, type: eMsgType) => {
    const newMessage: iMessage = {
      type: type,
      message: msg
    };

    setChatHistory(prev => [
      ...prev,
      newMessage
    ]);

    scrollToBottom();
  }

  const clearMessageInput = () => {
    setMessage('');
  }

  const handleSubmit = () => {
    if (message) {
      sendMessage();
      displayUserMessage(message, eMsgType.SENT);
      clearMessageInput();
    } else {
      console.log('No message to send.');
    }
  }

  const getChatHistory = () => {
    let data = '';
    for (let i = 0; i < chatHistory.length; i++) {
      const messageData: iMessage = chatHistory[i];
      data += `${messageData.message}\n`
    }

    return data;
  }

  const getUserSettings = () => {
    const settings = {
      customOptions: customOptionVisible,
      aiPreferencesMain: aiPreferencesMain,
      aiPreferencesSecond: aiPreferencesSecond,
      quickAnswer: answerQuickly,
      improveQuestions: improveQuestion,
      makeSmallTalk: makeSmallTalk,
      submitOnEnter: submitOnEnter
    };
    return settings;
  }

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }

  const sendMessage = () => {
    const messageData = {
      message,
      history: getChatHistory(),
      settings: getUserSettings(),
      page: "chatbot.backend_functions.openai_chatbot"
    };

    if (!socketService.getSocket()) {
      socketService.init();
    }

    const socket = socketService.getSocket();

    if (socket) {
      socket.emit('user_message', messageData, (response: any) => {
        console.log('response', response);
      });
      console.log('Socket emit completed, awaiting callback...');
    }
  }

  return (
    <div className="pl-4">
      <h1>Anywhere in your app!</h1>
      {/* <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex gap-2 items-center ">
            <div className="flex flex-col">
              <Input
                element="Enter Your Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="border-2 border-black"
              />
              {errors.email && touched.email && errors.email}
            </div>

            <div className="flex flex-col">
              <Input
                element="Enter Your Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="border-2 border-black"
              />
              {errors.password && touched.password && errors.password}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white w-[60px] h-[40px]"
            >
              Submit
            </button>
          </form>
        )}
      </Formik> */}
      <div className="container mx-auto">
        <div className="m-4 p-3 rounded bg-gray-200 border-2border-gray-500	">
          <div>AI Dream Chatbot...</div>
          <div ref={chatBoxRef} className="mt-2 p-4 h-96 rounded bg-gray-100 border-1 border-gray-600 overflow-y-auto">
            {
              chatHistory.map((chat: iMessage, index: number) => (
                <div key={index} className={chat.type === eMsgType.SENT ? "" : "flex justify-end"}>
                  <div className={chat.type === eMsgType.SENT ? "m-2 bg-black p-2 rounded text-white w-2/3 flex flex-row items-center" : "m-2 p-2 bg-blue-500 rounded text-white w-2/3 flex flex-row items-center justify-end"}>
                    <div>{chat.message}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="p-8 flex flex-col">
          <textarea rows={4} value={message} onKeyDown={handleKeydown} onChange={handleTextChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Ask me anything..."></textarea>

          <div className="pt-4 flex flex-row items-center justify-between">
            <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none">Send</button>
            <div className="flex items-center">
              <input id="custom-option-checkbox" type="checkbox" checked={customOptionVisible} onChange={handleCustomOption} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="custom-option-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display Custom Options</label>
            </div>
          </div>

          {
            customOptionVisible && (
              <>
                <div className="pt-4 flex flex-row items-center">
                  <div className="flex items-center pr-4">
                    <input id="make-small-talk" type="checkbox" checked={makeSmallTalk} onChange={() => setMakeSmallTalk(!makeSmallTalk)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="make-small-talk" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make Small Talk</label>
                  </div>

                  <div className="flex items-center pr-4">
                    <input id="answer-quickly-please" type="checkbox" checked={answerQuickly} onChange={() => setAnswerQuickly(!answerQuickly)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="answer-quickly-please" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Answer quickly please!</label>
                  </div>

                  <div className="flex items-center pr-4">
                    <input id="improve-my-questions" type="checkbox" checked={improveQuestion} onChange={() => setImproveQuestion(!improveQuestion)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="improve-my-questions" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Improve My Questions</label>
                  </div>

                  <div className="flex items-center pr-4">
                    <input id="submit-on-enter" type="checkbox" checked={submitOnEnter} onChange={() => setSubmitOnEnter(!submitOnEnter)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="submit-on-enter" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Submit on Enter</label>
                  </div>
                </div>

                <div className="pt-4 flex flex-row items-center">
                  <select id="form1" value={aiPreferencesMain} onChange={(e) => setAIPreferencesMain(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option value="Direct AI chat">Direct AI chat</option>
                    <option value="Ask me Some Questions">Ask me Some Questions</option>
                    <option value="Give Me a Few Options">Give Me a Few Options</option>
                    <option value="I'll Fill Out a Form">I'll Fill Out a Form</option>
                  </select>

                  <select id="form2" value={aiPreferencesSecond} onChange={(e) => setAIPreferencesSecond(e.target.value)} className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option value="Chat With One AI">Chat With One AI</option>
                    <option value="Two AIs Side by Side">Two AIs Side by Side</option>
                    <option value="Let's Get a Team">Let's Get a Team</option>
                    <option value="Show Me What You Can Do">Show Me What You Can Do</option>
                    <option value="Unleash Infinity Matrix">Unleash Infinity Matrix!</option>
                  </select>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};
