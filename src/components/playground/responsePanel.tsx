"use client";
import React, { useEffect, useState } from "react";
import ResponsePrompt from "@/components/playground/response";
import { useAuth } from "@/context/AuthContext"; // Assuming AuthContext is the file where AuthProvider is defined
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Button } from "../_shared";

interface iPData {
  api: string;
  mode: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  FrequencyPenalty: number;
  PresencePenalty: number;
  role?: string;
  text: string;
}

const RightSection = ({ width, index, isResizable, onMouseDown }: any) => {
  const {
    contextData,
    setContextData,
    version,
  } = useAuth();
  const [moveFlag, setMoveFlag] = useState<boolean>(false);

  useEffect(() => {
    const currentModels = contextData[version - 1].responseData;
    if (currentModels.filter((model: any) => model.isOpen).length === 0) {
      setMoveFlag(false);
    } else if (currentModels.filter((model: any) => model.isOpen)[0].isMoved) {
      setMoveFlag(true);
    } else setMoveFlag(false);
  }, [contextData]);

  const handleExpand = (index: number) => {
    const currentModels = contextData[version - 1].responseData;
    const updateModels = currentModels.map((model: any, key: number) => {
      if (key === index) {
        if (model.isOpen) {
          model.isOpen = false;
          model.isModelSettingOpen = false;
        }
        else {
          model.isOpen = true;
          model.isModelSettingOpen = true;
        };
      }
      return model;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateModels;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  const removePrompt = (index: number) => {
    const currentModels = contextData[version - 1].responseData;
    const updateModels = currentModels.filter(
      (_: any, i: number) => i !== index
    );

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateModels;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  const clearTextById = (index: number) => {
    const currentModels = contextData[version - 1].responseData;
    const updateModels = currentModels.map((item: any, i: number) => {
      if (i === index) item.text = "";
      return item;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateModels;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  const moveToMessage = (index: number, text: string) => {
    const currentModelsData = contextData[version - 1].responseData;
    const currentPromptData = contextData[version - 1].promptData;

    const plainText = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1");

    const lastPrompt = currentPromptData[currentPromptData.length - 1];

    if (lastPrompt.role === "user") {
      currentPromptData.push({
        isFocus: true,
        isExpand: true,
        role: "assistant",
        text: plainText,
      });

      const updateContextData = contextData.map((item: any, key: number) => {
        if (key === version - 1) {
          item.promptData = currentPromptData;
        }
        return item;
      });
      setContextData(updateContextData);
    } else {
      if (lastPrompt.text === "") {
        const updatedPromptData = currentPromptData.map(
          (prompt: any, key: number) => {
            if (key === currentPromptData.length - 1) {
              prompt.text = plainText;
              prompt.isFocus = true;
              prompt.isExpand = true;
            }
            return prompt;
          }
        );

        const updateContextData = contextData.map((item: any, key: number) => {
          if (key === version - 1) {
            item.promptData = updatedPromptData;
          }
          return item;
        });
        setContextData(updateContextData);
      } else {
        currentPromptData.push({
          isFocus: false,
          isExpand: false,
          role: "user",
          text: "",
        });
        currentPromptData.push({
          isFocus: true,
          isExpand: true,
          role: "assistant",
          text: plainText,
        });

        const updateContextData = contextData.map((item: any, key: number) => {
          if (key === version - 1) {
            item.promptData = currentPromptData;
          }
          return item;
        });
        setContextData(updateContextData);
      }
    }
    const updatedModelsData = currentModelsData.map((item: any, key: number) => {
      if (key == index) {
        item.text = "";
      }
      return item;
    });
    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updatedModelsData;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  const handleFormat = (formatId: number, index: number) => {
    const currentResponseData = contextData[version - 1].responseData;

    const updatedResponseData = currentResponseData.map(
      (res: any, key: number) => {
        if (key === index) res.isFormat = formatId;
        return res;
      }
    );

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updatedResponseData;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  return (
    <div
      className={`overflow-y-auto relative pt-[6px] h-full px-[0.37em] mr-2`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      {contextData[version - 1].responseData.length > 0 &&
        contextData[version - 1].responseData.map(
          (prompt: any, index: number) => (
            <ResponsePrompt
              isExpand={prompt.isOpen}
              role={prompt.role}
              index={index}
              isFormat={prompt.isFormat}
              key={index}
              setIsExpand={handleExpand}
              removePrompt={removePrompt}
              pData={contextData[version - 1].promptData}
              clearTextByID={clearTextById}
              text={prompt.text}
              moveToMessage={moveToMessage}
              handleFormat={handleFormat}
            />
          )
        )}
      {isResizable && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            cursor: "col-resize",
          }}
          onMouseDown={(e) => onMouseDown(index, e)}
        />
      )}
    </div>
  );
};

export default RightSection;
