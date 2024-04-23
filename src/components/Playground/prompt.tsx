"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoCloseCircleOutline, IoImageOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

import { Label, Textarea } from "../UI";
import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { AiOutlineFileText } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";

interface iPrompt {
  isExpand?: boolean;
  text: string;
  role?: string;
  setIsExpand: Function;
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
    setIsUpload(false);
  };

  const handleChange = (event: any) => {
    const utext = event.target.value;
    const updateData = pData.map((data: any, i: number) => {
      if (i === index) data.text = utext;
      return data;
    });

    setPData(updateData);
    setIsUpload(false);
  };

  const handleKeyDown = (e: any) => {
    const textarea: any = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div
      className={`h-fit flex flex-col group [transition:all_.3s_ease-in-out] ${
        role?.toLocaleLowerCase() !== "system" && "mt-[10px]"
      }`}
    >
      <div className="flex items-center justify-between">
        <Label className="mb-[5px]">{role?.toUpperCase()}</Label>
      </div>
      <div
        onClick={() => {
          if (!isExpand) {
            setIsExpand(index);
          }
        }}
        className={`rounded-lg relative border ${
          isExpand && "pt-[4.5px] pl-[4.5px] pr-[4.5px]"
        } border-[#6b6b6b80] mb-2 hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d] flex justify-between p-2`}
      >
        {role?.toLowerCase() === "system" ? (
          <TextareaAutosize
            rows={4}
            value={text}
            autoFocus={true}
            onChange={handleChange}
            spellCheck={false}
            className={`${
              role?.toLocaleLowerCase() !== "system" && "mt-[23px]"
            } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] focus:bg-white text-[#353740] dark:focus:bg-[#2b2b2b] dark:text-[#d9d9e3]`}
          />
        ) : (
          <>
            {isExpand && (
              <div className="w-full">
                {isUpload ? (
                  <div className="w-full flex flex-col items-center py-[36px] relative rounded-md mt-1">
                    <SlCloudUpload
                      color="#67686E"
                      className="text-[45px] cursor-pointer mr-[15px]"
                    />
                    <div className="flex text-[#707070] text-[16px] my-[20px]">
                      Drag & drop files or{" "}
                      <span className="text-[#AA532D] ml-[5px] underline cursor-pointer">
                        Browse
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center cursor-pointer">
                        <CiImageOn size={30} className="text-white" />
                      </div>
                      <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center ml-[50px] cursor-pointer">
                        <GoVideo size={25} className="text-white" />
                      </div>
                      <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center ml-[50px] cursor-pointer">
                        <AiOutlineFileText size={25} className="text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <TextareaAutosize
                    rows={4}
                    value={text}
                    onChange={handleChange}
                    spellCheck={false}
                    className={`${
                      role?.toLocaleLowerCase() !== "system" && "mt-[23px]"
                    } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] focus:bg-white text-[#353740] dark:focus:bg-[#2b2b2b] dark:text-[#d9d9e3]`}
                  />
                )}
              </div>
            )}
          </>
        )}

        {!isExpand && role?.toLocaleLowerCase() !== "system" && (
          <p className="text-[#71717A] text-[14px] whitespace-nowrap">
            {text.length === 0
              ? "empty prompt..."
              : text.substring(0, 15) + "..."}
          </p>
        )}
        {role?.toLocaleLowerCase() !== "system" && (
          <div
            className={`flex items-center ${
              isExpand && "absolute right-2 top-2"
            } cursor-pointer ml-2 dark:text-[#d9d9e3]`}
          >
            {role?.toLowerCase() === "user" && (
              <>
                {isUpload ? (
                  <IoCloseCircleOutline
                    color="#67686E"
                    className="text-[#37383a] cursor-pointer dark:text-[#d9d9e3] font-bold text-[18px] mr-2"
                    onClick={() => setIsUpload(false)}
                  />
                ) : (
                  <FiUpload
                    className="text-[#37383a] cursor-pointer dark:text-[#d9d9e3] mr-2"
                    onClick={() => setIsUpload(true)}
                  />
                )}
              </>
            )}
            <RiDeleteBin2Line
              className="text-[#37383a] dark:text-[#d9d9e3]"
              onClick={() => removePrompt(index)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Prompt;
