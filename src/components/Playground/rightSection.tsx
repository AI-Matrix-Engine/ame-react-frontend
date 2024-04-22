"use client";
import React from "react";
import { promptData } from "../Data";

const RightSection = ({ width, index, isResizable, onMouseDown }: any) => {
  const [isExpand, setIsExpand] = React.useState(-1);
  const [pData, setPData] = React.useState(promptData);
  const handleExpand = (index: number) => {
    if (index === isExpand) setIsExpand(-1);
    else setIsExpand(index);
  };
  return (
    <div
      className={`overflow-y-auto relative text-black dark:text-white px-[12px] pt-[6px]`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      Response
      {isResizable && (
        <div
          className="absolute right-0 top-0 bottom-0 w-[1px] cursor-col-resize bg-[#ececf1] [transition:all_.3s_ease-in-out] hover:bg-[#0e8157cc]"
          onMouseDown={(e) => onMouseDown(index, e)}
        />
      )}
    </div>
  );
};

export default RightSection;
