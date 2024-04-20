"use client";
import React from "react";
import { Prompt } from "./prompt";
import { promptData } from "../Data";
import { TiPlus } from "react-icons/ti";

export const PromptSection = ({
  width,
  index,
  isResizable,
  onMouseDown,
}: any) => {
  const [isExpand, setIsExpand] = React.useState(-1);
  const [pData, setPData] = React.useState(promptData);
  const handleExpand = (index: number) => {
    if (index === isExpand) setIsExpand(-1);
    else setIsExpand(index);
  };
  return (
    <div
      className={`overflow-auto relative text-white py-2 px-1`}
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
          setIsExpand={handleExpand}
          text={prompt.text}
        />
      ))}
      <div className="flex items-center cursor-pointer">
        <TiPlus className="text-black text-[12px] mr-1"/>
        <span className="text-[12px] text-black">Add Messages</span>
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
