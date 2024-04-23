"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { Label, Textarea } from "../UI";

interface iPrompt {
  isExpand?: boolean;
  text?: string;
  role?: string;
  setIsExpand?: Function;
  index: number;
  setPData: Function;
  pData?: any;
}
const Prompt = ({
  isExpand,
  text,
  role,
  setIsExpand,
  index,
  setPData,
  pData,
}: iPrompt) => {
  const [isUpload, setIsUpload] = React.useState(false);

  const removePrompt = (index: number) => {
    const updateData = pData.filter((_: any, i: number) => i !== index);
    setPData(updateData);
  };

  const handleChange = (event: any) => {
    const utext = event.target.value;
    const updateData = pData.map((data: any, i: number) => {
      if (i === index) data.text = utext;
      return data;
    });

    setPData(updateData);
  };

  const handleKeyDown = (e:any) => {
    const textarea: any = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="h-fit flex flex-col group rounded-lg p-2 [transition:all_.3s_ease-in-out] border border-[#6b6b6b80] mb-2 hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d]">
      <div className="flex items-center justify-between pb-1">
        <Label>{role?.toUpperCase()}</Label>
        <div className="flex items-center">
          {/* {role?.toLowerCase() === "user" && (
            <IoImageOutline className="cursor-pointer dark:text-[#d9d9e3]" />
          )} */}
          <RiDeleteBin2Line
            className="cursor-pointer ml-2 dark:text-[#d9d9e3]"
            onClick={() => removePrompt(index)}
          />
        </div>
      </div>
      <textarea
        id="auto-expanding-textarea"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] focus:bg-white text-[#353740] dark:focus:bg-[#2b2b2b] dark:text-[#d9d9e3]"
        placeholder="Auto-Expanding Textarea"
      />
    </div>
  );
};

export default Prompt;
