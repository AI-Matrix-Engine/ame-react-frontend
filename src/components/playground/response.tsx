"use client";
import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

import { Button, Label, Textarea } from "../_shared";
import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import {
  AiOutlineDelete,
  AiOutlineFileText,
  AiOutlineUpload,
} from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";

interface iPrompt {
  isExpand?: boolean;
  text: string;
  role?: string;
  setIsExpand: Function;
  index: number;
  setPData: Function;
  pData?: any;
}
const ResponsePrompt = ({
  isExpand,
  text,
  role,
  setIsExpand,
  index,
  setPData,
  pData,
}: iPrompt) => {
  const [isUpload, setIsUpload] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const removePrompt = (index: number) => {
    setPData(index);
  };

  const handleChange = (event: any) => {
    const utext = event.target.value;
    const updateData = pData.map((data: any, i: number) => {
      if (i === index) data.text = utext;
      return data;
    });

    setPData(updateData);
  };

  useEffect(() => {
    if (isExpand) {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
      }
    }
  }, [isExpand]);

  return (
    <div
      className={`h-fit flex flex-col group [transition:all_.3s_ease-in-out] ${
        index > 0 && "mt-[10px]"
      }`}
    >
      <div
        className={`flex-col rounded-lg relative border ${
          isExpand && ""
        } border-[#6b6b6b80] mb-2 hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d] flex justify-between p-2`}
      >
        <div className="">
          <div className="flex items-center justify-between mb-[5px]">
            <div className="flex items-center justify-between">
              <Label className="text-[12px]">{`RESPONSE ${index + 1}`}</Label>
            </div>
            <div
              className={`flex items-center ${
                isExpand && "absolute right-2 top-2"
              } cursor-pointer ml-2 dark:text-[#d9d9e3]`}
            >
              <AiOutlineDelete
                className="text-[#37383a] dark:text-[#d9d9e3] mr-2"
                onClick={() => removePrompt(index)}
              />
              {isExpand ? (
                <BsArrowsAngleContract
                  className="text-[#37383a] text-[12px] dark:text-[#d9d9e3]"
                  onClick={() => setIsExpand(index)}
                />
              ) : (
                <BsArrowsAngleExpand
                  className="text-[#37383a] text-[12px] dark:text-[#d9d9e3]"
                  onClick={() => setIsExpand(index)}
                />
              )}
            </div>
          </div>
          {isExpand && (
            <div className="w-full">
              <TextareaAutosize
                ref={textareaRef}
                rows={4}
                autoFocus={true}
                value={text}
                onChange={handleChange}
                className={`w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] text-[#353740] dark:text-[#d9d9e3]`}
              />
            </div>
          )}

          {!isExpand && (
            <p className="text-[#71717A] text-[14px] whitespace-nowrap">
              {(text && text.length === 0) || text == undefined
                ? "Some Response..."
                : text.substring(0, 15) + "..."}
            </p>
          )}
        </div>
        {isExpand && (
          <div className="flex items-center justify-between mt-1">
            <div>
              <Label className="text-[12px] cursor-pointer">Text</Label>
              <Button
                className="text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2"
                size="sm"
              >
                Markdown
              </Button>
              <Button
                className="text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2"
                size="sm"
              >
                Form
              </Button>
              <Button
                className="text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2"
                size="sm"
              >
                Table
              </Button>
              <Button
                className="text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2"
                size="sm"
              >
                JSON
              </Button>
            </div>
            <div>
              <Button
                className="text-[12px] rounded-lg h-[24px] ml-2"
                size="sm"
              >
                Clear
              </Button>
              <Button
                className="text-[12px] rounded-lg h-[24px] ml-2"
                size="sm"
              >
                Test
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePrompt;
