"use client";
import React from "react";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { Textarea } from "@/components/UI/textarea";
interface iPrompt {
  isExpand: boolean;
  text: string;
  role: string;
  setIsExpand: Function;
  index: number;
}
export const Prompt = ({
  isExpand,
  role,
  text,
  setIsExpand,
  index,
}: iPrompt) => {
  return (
    <div className="border rounded-xl p-2 mb-2">
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center overflow-hidden mr-6 relative w-fill">
          <p className="text-[#000] text-[10px] mr-3">{role.toUpperCase()}</p>
          {!isExpand && (
            <p className="text-[#71717A] text-[10px] whitespace-nowrap">
              {text.substring(0, 15)}...
            </p>
          )}
        </div>
        <div className="min-w-[15px]">
          {isExpand ? (
            <BsArrowsAngleContract
              color="#67686E"
              className="text-[12px]"
              size={12}
              onClick={() => setIsExpand(index)}
            />
          ) : (
            <BsArrowsAngleExpand
              color="#67686E"
              size={12}
              className="text-[12px]"
              onClick={() => setIsExpand(index)}
            />
          )}
        </div>
      </div>
      {isExpand && (
        <Textarea
          className="text-black flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-[12px] shadow-sm placeholder:text-zinc-500 focus-visible:outline-none min-h-[120px]"
          value={text}
        />
      )}
    </div>
  );
};
