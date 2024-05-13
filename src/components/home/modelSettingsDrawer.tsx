"use client";
import React, { useState, useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { BsChevronCompactLeft } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";
import { responseData } from "../Data";
import { useAuth } from "@/context/AuthContext";
import { socketService } from "@/lib/socket";

import { Button } from "../_shared";
import { Model } from "../_shared/model";

import { redirect } from "next/navigation";

interface iModelOpenFlag {
  model: number;
  advanced: boolean;
}

export const ModelSettingsDrawer = () => {
  const { user, contextData, setContextData, version, getResponseData, eventHistory, setEventHistory } = useAuth();

  const [sidebar, setSidebar] = useState<boolean>(true);
  const [testModelClicked, setTestModelClicked] = useState<boolean | null>(null);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [isOpenModel, setIsOpenModel] = React.useState<iModelOpenFlag>({
    model: -1,
    advanced: true,
  });

  const handleModelOpen = (modelID: number) => {
    const currentModels = contextData[version - 1].responseData;
    const updateModels = currentModels.map((model: any, key: number) => {
      if (key === modelID) {
        if (model.isModelSettingOpen) model.isModelSettingOpen = false;
        else model.isModelSettingOpen = true;
      };
      return model;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === (version - 1)) {
        item.responseData = updateModels;
      }
      return item;
    })
    setContextData(updateContextData);
  }

  const handleAdvancedOpen = () => {
    setIsOpenModel((prev) => ({ ...prev, advanced: !prev.advanced }));
  };

  const addModel = () => {
    const newModel = {
      isFormat: 0,
      isOpen: true,
      isModelSettingOpen: true,
      isMoved: false,
      _id: "",
      model: "",
      name: "",
      class: "",
      text: "",
      limitations: {
        context_window: 16000,
        max_tokens: 4096,
        capabilities: ["text", "image", "video", "audio", "search", "tools"],
      },
      api: {
        provider: "",
        endpoint: "",
      },
      controls: []
    };
    const currentModels = contextData[version - 1].responseData;

    const updatedModels = [...currentModels, newModel].map((e: any) => e);

    const newContextData = contextData.map((item: any, key: number) => {
      if (key === (version - 1)) {
        item.responseData = updatedModels;
      }
      return item;
    })
    setContextData(newContextData);
  };

  const clearResponseData = (itemIndex: number) => {
    const currentResponseData = contextData[version - 1].responseData;
    const updateData = currentResponseData.map((item: any, i: number) => {
      if (i === itemIndex) {
        item.text = "";
      }
      return item;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateData;
      }
      return item;
    });
    setContextData(updateContextData);
  }

  const handleTestModel = () => {
    const currentContext = contextData[version - 1];
    const modelData = currentContext.responseData;
    const promptData = currentContext.promptData;
    const variableData = currentContext.variablesData;

    modelData.forEach((model: any, index: number) => {
      clearResponseData(index)
      const frontCallPackage = {
        task: 'stream_response',
        index: index.toString(),
        uid: user?.uid,
        variablesData: variableData,
        responseData: [model],
        promptData,
        recipeID: currentContext.recipeID,
        version: currentContext.version,
      };

      console.log('frontCallPackage', frontCallPackage)

      getResponseData(index, frontCallPackage);
    });

    setTestModelClicked(!testModelClicked)
  }

  return (
    <div
      className={`bg-[#F8F9FB] dark:bg-[#18181b] dark:border-l dark:border-l-[#ffffff1a] text-white ${sidebar ? "w-[300px] pl-2" : "w-6"
        } relative`}
    >
      {sidebar ? (
        <div className="overflow-y-auto h-full">
          <div
            className={`flex flex-col justify-between items-between text-black p-4 overflow-y-auto`}
          >
            <div className="w-full h-full flex flex-col items-center px-1 overflow-y-auto">
              {
                contextData[version - 1].responseData.length > 0 &&
                <Button
                  className="text-[12px] w-[150px] h-[30px]"
                  onClick={() => handleTestModel()}
                  disabled={contextData[version - 1].responseData[contextData[version - 1].responseData.length - 1].model ? false : true}
                >
                  {contextData[version - 1].responseData.length > 1 ? "Test All" : "Run Test"}
                </Button>
              }
              {contextData[version - 1].responseData.map((model: any, key: number) => (
                <Model
                  model={model}
                  key={key}
                  modelId={key}
                  isAdvancedOpen={isOpenModel.advanced}
                  isOpen={model.isOpen}
                  isModelSetting={model.isModelSettingOpen}
                  setIsOpenModel={handleModelOpen}
                  setIsOpenAdvanced={handleAdvancedOpen}
                />
              ))}
              <Button
                className="text-[12px] mt-[20px] w-[150px] h-[30px]"
                onClick={addModel}
                disabled={contextData[version - 1].responseData.length !== 0 ? (contextData[version - 1].responseData[contextData[version - 1].responseData.length - 1].model ? false : true) : false}
              >
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
