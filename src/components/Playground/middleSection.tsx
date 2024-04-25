"use client";
import React, { useState } from "react";
import Prompt from "./prompt";
import { LuPlusCircle } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

interface iPData {
  role: string;
  text: string;
}

const MiddleSection = ({ width, index, isResizable, onMouseDown }: any) => {
  const { promptData, setPromptData } = useAuth();
  const [isExpand, setIsExpand] = React.useState(-1);
  // const [pData, setPData] = React.useState<iPData[]>(promptData);
  const handleExpand = (index: number) => {
    if (index === isExpand) setIsExpand(-1);
    else setIsExpand(index);

    const currentPromptData = [...promptData];
    const updatePromptData = currentPromptData.map(
      (prompt: any, key: number) => {
        if (key === index) prompt.isExpand = !prompt.isExpand;
        else prompt.isExpand = false;

        return prompt;
      }
    );

    setPromptData(updatePromptData);
  };
  const addPrompt = () => {
    const newAssistPrompt: iPData = {
      role: "assistant",
      text: "",
    };
    const newUserPrompt: iPData = {
      role: "user",
      text: "",
    };
    if (promptData.length === 1) {
      setPromptData((prev: any) => [...prev, newUserPrompt]);
    } else {
      if (promptData[promptData.length - 1].role === "user") {
        setPromptData((prev: any) => [...prev, newAssistPrompt]);
      } else {
        setPromptData((prev: any) => [...prev, newUserPrompt]);
      }
    }
  };
  return (
    <div
      className={`overflow-y-auto relative pt-[6px] h-full px-[0.37em]`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      {promptData.map((prompt, index) => (
        <Prompt
          isExpand={index === isExpand ? true : false}
          role={prompt.role}
          index={index}
          key={index}
          setIsExpand={handleExpand}
          setPData={setPromptData}
          pData={promptData}
          text={prompt.text}
        />
      ))}
      <div
        className="flex items-center cursor-pointer p-2 rounded-md [transition:all_.3s_ease-in-out] hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#2b2b2b]"
        onClick={() => addPrompt()}
      >
        <LuPlusCircle className="text-black text-[16px] mr-[8.35px] dark:text-[#d9d9e3]" />
        <span className="text-[14px] font-semibold text-black dark:text-[#d9d9e3]">
          Add Messages
        </span>
      </div>

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

export default MiddleSection;
