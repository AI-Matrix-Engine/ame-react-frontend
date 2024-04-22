"use client";
import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Label } from "../UI";

interface iPrompt {
  isExpand?: boolean;
  text?: string;
  role?: string;
  setIsExpand?: Function;
  index: number;
  setPData: Function;
}
const Prompt = ({ role, text, setPData, index }: iPrompt) => {
  const [isUpload, setIsUpload] = React.useState(false);

  const removePrompt = (index: number) => {
    setPData((prev:any) => prev.filter((_:any, i:number) => i !== index))
  }

  return (
    <div className="flex flex-col group rounded-lg p-2 [transition:all_.3s_ease-in-out] border border-[#6b6b6b80] mb-2 hover:border-[#0e8157] hover:bg-[#dcdce0]">
      <div className="flex items-center justify-between pb-1">
        <Label>{role?.toUpperCase()}</Label>
        <RiDeleteBin2Line className="cursor-pointer " onClick={() => removePrompt(index)} />
      </div>
      <div
        contentEditable={true}
        spellCheck={false}
        className="p-1 outline-none bg-transparent h-fit min-h-fit break-words rounded-md whitespace-break-spaces group-hover:bg-danger-200 relative focus:border-[#0e8157] focus:bg-white text-[#353740]"
      >
        {text}
      </div>
    </div>
  );
};

export default Prompt;
