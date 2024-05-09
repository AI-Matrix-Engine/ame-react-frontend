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
  const { user, models, setModels, contextData, setContextData, version } = useAuth();

  const [sidebar, setSidebar] = useState<boolean>(true);
  const [testModelClicked, setTestModelClicked] = useState<boolean | null>(null);
  const [eventCount, setEventCount] = useState<number>(-1);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const [isOpenModel, setIsOpenModel] = React.useState<iModelOpenFlag>({
    model: -1,
    advanced: true,
  });

  useEffect(() => {
    if (!user?.uid || !user.token) {
      redirect('/login');
    }
  }, [user])

  const handleModelOpen = (modelID: number) => {
    const currentModels = contextData[version - 1].responseData;
    const updateModels = currentModels.map((model: any, key: number) => {
      if (key === modelID) {
        if (model.isOpen) model.isOpen = false;
        else model.isOpen = true;
      } else model.isOpen = false;
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

    const updatedModels = [...currentModels, newModel].map((e: any, index: number) => {
      if (index !== currentModels.length) {
        e.isOpen = false;
      }
      return e;
    });

    const newContextData = contextData.map((item: any, key: number) => {
      if (key === (version - 1)) {
        item.responseData = updatedModels;
      }
      return item;
    })
    setContextData(newContextData);
  };

  const updateContextData = (itemIndex: number, character: string) => {
    const currentResponseData = contextData[version - 1].responseData;
    const updateData = currentResponseData.map((item: any, i: number) => {
      if (i === itemIndex) {
        item.text = item.text + character;
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
    if (!socketService.getSocket()) {
      socketService.init(user?.token ? user.token : "", user?.uid ? user.uid : "");
    }

    const socket = socketService.getSocket();


    if (socket) {
      const currentContext = contextData[version - 1];
      const promptData = currentContext.promptData;
      const modelData = currentContext.responseData;
      const variableData = currentContext.variablesData;
      const responseData = currentContext.responseData;

      modelData.forEach((model: any, index: number) => {
        const frontCallPackage = {
          task: 'stream_response',
          index: index.toString(),
          uid: user?.uid,
          variablesData: variableData,
          responseData: responseData,
          promptData,
          recipeID: currentContext.recipeID,
          version: currentContext.version,
        };

        clearResponseData(index)

        socketService.getSocket()?.emit('playground_request', { sid: index, data: frontCallPackage });
      });
    }

    setTestModelClicked(!testModelClicked)

    return () => {
      socket?.off('playground_request');
    };
  }

  useEffect(() => {
    if(testModelClicked === null) return;

    const currentContext = contextData[version - 1];
    const modelData = currentContext.responseData;

    modelData.forEach((model: any, index: number) => {
      if (index > eventCount) {
        const eventName = `${user?.uid}_stream_response_${index}`;
        setEventCount(index);

        socketService.getSocket()?.on(eventName, (data) => {
          const splitedValues = eventName.split('_');
          const itemIndex = parseInt(splitedValues[splitedValues.length - 1]);
          for (let i = 0; i < data.data.length; i++) {
            const character = data.data[i];
            setTimeout(() => {
              updateContextData(itemIndex, character);
            }, 150)
          }
        });
      }
    });
  }, [testModelClicked])

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
                contextData[version - 1].responseData.length > 0 && <Button onClick={() => handleTestModel()} className="text-[12px] w-[150px] h-[30px]">{contextData[version - 1].responseData.length > 1 ? "Test All" : "Run Test"}</Button>
              }
              {contextData[version - 1].responseData.map((model: any, key: number) => (
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
              <Button className="text-[12px] mt-[20px] w-[150px] h-[30px]" onClick={addModel}>
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
