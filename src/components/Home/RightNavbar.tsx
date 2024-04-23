"use client";
import React, { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";
import { responseData } from "../Data";
import { useAuth } from "@/context/AuthContext";

import { FormData } from "../Run/Run";
import { Button } from "../UI";
import { Model } from "../UI/model";

interface iModelOpenFlag {
  model: number;
  advanced: boolean;
}

const modelName = [
  "model 1",
  "model 2",
  "model 3",
  "model 4",
  "model 5",
  "model 6",
  "model 7",
  "model 8",
];

export const RightNavbar = () => {
  const { models, setModels } = useAuth();
  const navItems = [
    {
      name: "WhatsApp",
      path: "/create",
      icon: <ChatBubbleIcon className="h-4 w-4 text-gray-500" />,
    },
    {
      name: "Emails",
      path: "/run",
      icon: <EnvelopeIcon className="h-4 w-4 text-gray-500" />,
    },
    {
      name: "Clients",
      path: "/chatbot",
      icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
    },
  ];
  const [sidebar, setSidebar] = useState<boolean>(true);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [isOpenModel, setIsOpenModel] = React.useState<iModelOpenFlag>({
    model: -1,
    advanced: true,
  });

  const handleModelOpen = (modelID: number) => {
    const currentModels = [...models];
    const updateModels = currentModels.map((model: any, key: number) => {
      if (key === modelID) {
        if(model.isOpen) model.isOpen = false;
        else model.isOpen = true;
      } else model.isOpen = false;
      return model;
    });
    setModels(updateModels);
  };
  const handleAdvancedOpen = () => {
    setIsOpenModel((prev) => ({ ...prev, advanced: !prev.advanced }));
  };
  const addModel = () => {
    const newModel = {
      isOpen: false,
      api: "",
      mode: "",
      temperature: 0.3,
      maxTokens: 1120,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      text: "",
      sequence: "",
    };
    const updatedModels = [...models, newModel];
    setModels(updatedModels);
  };

  return (
    <div
      className={`bg-[#F8F9FB] mr-2 dark:bg-[#18181b] dark:border-l dark:border-l-[#ffffff1a] text-white ${
        sidebar ? "w-[300px] pl-2" : "w-6"
      } relative`}
    >
      {sidebar ? (
        <div className="overflow-y-auto h-full">
          <div className=" px-4 flex justify-between items-center mt-4">
            {/* <h1 className="text-black font-semibold text-xl">Matrix AI</h1> */}
          </div>
          <div
            className={`flex flex-col justify-between items-between text-black p-4 overflow-y-auto`}
          >
            {/* <h4 className="text-center">Form</h4> */}
            {/* <FormData additionalClasses={"space-y-4"} /> */}
            <div className="w-full h-full flex flex-col items-center px-1 overflow-y-auto">
              <Button className="text-[12px]">Test All</Button>
              {models.map((model: any, key: number) => (
                <Model
                  model={model}
                  key={key}
                  modelId={key}
                  isAdvancedOpen={isOpenModel.advanced}
                  isOpen={model.isOpen}
                  setIsOpenModel={handleModelOpen}
                  setIsOpenAdvanced={handleAdvancedOpen}
                />
              ))}
              <Button className="text-[12px] mt-[30px]" onClick={addModel}>
                ADD MODEL
              </Button>
            </div>
          </div>
          <TbMinusVertical
            className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150 absolute -left-[0px] top-[50%]"
            onClick={handleSidebar}
          />
        </div>
      ) : (
        <div className=" h-full flex justify-center items-center relative">
          <button onClick={handleSidebar} className="top-[50%]">
            <BsChevronCompactLeft
              className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
              onClick={handleSidebar}
            />
          </button>
        </div>
      )}
    </div>
  );
};
