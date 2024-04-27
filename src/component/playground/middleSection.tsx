"use client";
import React from "react";
import Prompt from "./Prompt";
import { promptData } from "../Data";
import { LuPlusCircle } from "react-icons/lu";

interface iPData {
  role: string;
  text: string;
}

const MiddleSection = ({ width, index, isResizable, onMouseDown }: any) => {
  const [isExpand, setIsExpand] = React.useState(-1);
  const [pData, setPData] = React.useState<iPData[]>(promptData);
  const handleExpand = (index: number) => {
    if (index === isExpand) setIsExpand(-1);
    else setIsExpand(index);
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
    setPData((prev: iPData[]) => [...prev, newAssistPrompt, newUserPrompt]);
  };
  return (
    <div
      className={`overflow-y-auto relative pt-[6px] h-full px-[0.37em]`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      {pData.map((prompt, index) => (
        <Prompt
          isExpand={index === isExpand ? true : false}
          role={prompt.role}
          index={index}
          key={index}
          setIsExpand={handleExpand}
          setPData={setPData}
          pData={pData}
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
