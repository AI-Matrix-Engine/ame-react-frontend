"use client";
import React, { useContext } from "react";
import ResponsePrompt from "./response";
import { responseData } from "../Data";
import { LuPlusCircle } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext"; // Assuming AuthContext is the file where AuthProvider is defined
import { any } from "zod";


interface iPData {
  api: string,
  mode: string,
  temperature: number,
  maxTokens: number,
  topP: number,
  FrequencyPenalty: number,
  PresencePenalty: number,
  role?:string;
  text:string;
}

const RightSection = ({ width, index, isResizable, onMouseDown }: any) => {
  const { models, setModels } = useAuth();

  const handleExpand = (index: number) => {
    const currentModels = [...models];
    const updateModels = currentModels.map((model:any, key:number) => {
      if (key === index) {
        if(model.isOpen) model.isOpen = false;
        else model.isOpen = true;
      } else model.isOpen = false;
      return model;
    })
    setModels(updateModels);
  };
  const removePrompt = (index:number) => {
    const currentModels = [...models];
    const updateModels = currentModels.filter((_: any, i: number) => i !== index);
    setModels(updateModels);
  };
  return (
    <div
      className={`overflow-y-auto relative pt-[6px] h-full px-[0.37em] mr-2`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      {models.length > 0 &&
        models.map((prompt:any, index:number) => (
          <ResponsePrompt
            isExpand={prompt.isOpen}
            role={prompt.role}
            index={index}
            key={index}
            setIsExpand={handleExpand}
            setPData={removePrompt}
            pData={models}
            text={prompt.text}
          />
        ))}
      {/* <div
        className="flex items-center cursor-pointer p-2 rounded-md [transition:all_.3s_ease-in-out] hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#2b2b2b]"
        onClick={() => addPrompt()}
      >
        <LuPlusCircle className="text-black text-[16px] mr-[8.35px] dark:text-[#d9d9e3]" />
        <span className="text-[14px] font-semibold text-black dark:text-[#d9d9e3]">
          Add Messages
        </span>
      </div> */}
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
