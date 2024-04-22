"use client";
import React from "react";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsUpload,
} from "react-icons/bs";
import { Textarea } from "@/components/UI/textarea";
import { AiOutlineDelete, AiOutlineFileText } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";

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
  const [isUpload, setIsUpload] = React.useState(false);
  return (
    <div
      className={`${
        !isExpand ? "hover:border" : "border"
      } rounded-xl p-2 mt-[11px] group`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center overflow-hidden mr-6 relative w-fill">
          <p className="text-[#000] text-[14px] mr-3">{role.toUpperCase()}</p>
          {!isExpand && (
            <p className="text-[#71717A] text-[14px] whitespace-nowrap">
              {text.substring(0, 15)}...
            </p>
          )}
        </div>
        <div className="min-w-[15px]">
          {isExpand ? (
            <div className="flex items-center">
              <BsUpload
                color="#67686E"
                className="text-[13px] cursor-pointer mr-[15px] hidden group-hover:block"
                title="Upload"
                onClick={() => setIsUpload(true)}
              />
              <AiOutlineDelete
                color="#67686E"
                className="text-[15px] cursor-pointer mr-[15px] hidden group-hover:block"
                title="Delete"
              />
              <BsArrowsAngleContract
                color="#67686E"
                className="text-[12px] cursor-pointer"
                size={12}
                title="Contract"
                onClick={() => setIsExpand(index)}
              />
            </div>
          ) : (
            <BsArrowsAngleExpand
              color="#67686E"
              size={12}
              className="text-[12px] cursor-pointer"
              title="Expand"
              onClick={() => setIsExpand(index)}
            />
          )}
        </div>
      </div>
      {isExpand && (
        <div>
          {isUpload ? (
            <div className="w-full border flex flex-col items-center py-[36px] relative rounded-md mt-1">
              <IoCloseCircleOutline
                color="#67686E"
                size={20}
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setIsUpload(false)}
              />
              <SlCloudUpload
                color="#67686E"
                className="text-[45px] cursor-pointer mr-[15px]"
              />
              <div className="flex text-[#C8C8C8] text-[16px] my-[20px]">
                Drag & drop files or{" "}
                <span className="text-[#AA532D] ml-[3px] underline cursor-pointer">
                  Browse
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center cursor-pointer">
                  <CiImageOn size={30} />
                </div>
                <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center ml-[50px] cursor-pointer">
                  <GoVideo size={25} />
                </div>
                <div className="w-[50px] h-[50px] rounded-[10px] bg-[#AA532D] flex items-center justify-center ml-[50px] cursor-pointer">
                  <AiOutlineFileText size={25} />
                </div>
              </div>
            </div>
          ) : (
            <Textarea
              className="mt-1 text-black flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-[14px] shadow-sm placeholder:text-zinc-500 focus-visible:outline-none min-h-[120px]"
              value={text}
            />
          )}
        </div>
      )}
    </div>
  );
};
