"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import {
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineUpload,
} from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";

let selectedStr: any = "";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { Label, Textarea } from "../_shared";

interface iPrompt {
  isExpand?: boolean;
  text: string;
  role?: string;
  setIsExpand: Function;
  index: number;
  handleFocus: Function;
  setSelectedStr: Function;
}
const Prompt = ({
  isExpand,
  text,
  role,
  setIsExpand,
  index,
  handleFocus,
  setSelectedStr,
}: iPrompt) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isUpload, setIsUpload] = useState(false);
  const {
    contextData,
    setContextData,
    version,
  } = useAuth();

  const handleMouseUp = () => {
    if (window) setSelectedStr(window?.getSelection()?.toString().trim());
  };

  const removePrompt = (index: number) => {
    // remove all variables that related removed prompt
    const currentVariableData = contextData[version - 1].variablesData;
    const updatedVariableData = currentVariableData.filter(
      (e: any, i: number) => e.messageIndex !== index
    );

    // remove prompt
    const currentPromptData = contextData[version - 1].promptData;
    const updatePromptData = currentPromptData.filter(
      (_: any, i: number) => i !== index
    );

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.promptData = updatePromptData;
        item.variablesData = updatedVariableData;
      }
      return item;
    });
    setContextData(updateContextData);
    setIsUpload(false);
  };

  useEffect(() => {
    if (isExpand) {
      if (
        contentEditableRef.current &&
        contentEditableRef.current.innerText === ""
      ) {
        contentEditableRef.current.focus();
      } else if (
        contentEditableRef.current &&
        contentEditableRef.current.innerText !== ""
      ) {
        const range = document.createRange();
        const selection = window.getSelection();
        const lastChild = contentEditableRef.current.lastChild;

        if (lastChild) {
          range.selectNodeContents(lastChild);
          range.collapse(false);
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isExpand]);

  const handleChange = (e: any) => {
    const newText = e.target.value;
    const currentPromptData = contextData[version - 1].promptData;
    const updatePromptData = currentPromptData.map((data: any, i: number) => {
      if (i === index) data.text = newText;
      return data;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.promptData = updatePromptData;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  const handleTextChange = (newText: string) => {
    const currentPromptData = contextData[version - 1].promptData;
    const updatePromptData = currentPromptData.map((data: any, i: number) => {
      if (i === index) data.text = newText;
      return data;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.promptData = updatePromptData;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  return (
    <div
      className={`h-fit flex flex-col group [transition:all_.3s_ease-in-out] mb-2 relative overflow-hidden ${
        role?.toLocaleLowerCase() !== "system" && "mt-[10px]"
      }`}
      onClick={() => {
        if (!isExpand) {
          setIsExpand(index);
        }
      }}
    >
      <div
        className={`rounded-lg flex-col relative border border-[#6b6b6b80] hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d] flex justify-between p-2`}
      >
        <div className="flex items-center justify-between">
          <Label className="mb-[5px] text-[12px] dark:text-white">{role?.toUpperCase()}</Label>
          <div
            className={`flex items-center ${
              isExpand && "absolute right-2 top-2"
            } cursor-pointer ml-2 dark:text-[#d9d9e3]`}
          >
            {(role?.toLowerCase() === "user" ||
              role?.toLowerCase() === "assistant") && (
              <>
                {isUpload ? (
                  <IoCloseCircleOutline
                    color="#67686E"
                    className="text-[#37383a] cursor-pointer dark:text-[#d9d9e3] font-bold text-[18px] mr-2"
                    onClick={() => setIsUpload(false)}
                  />
                ) : (
                  <AiOutlineUpload
                    className="text-[#37383a] cursor-pointer dark:text-[#d9d9e3] mr-2"
                    onClick={() => setIsUpload(true)}
                  />
                )}
              </>
            )}
            {role?.toLocaleLowerCase() !== "system" && index > 1 && (
              <AiOutlineDelete
                className="text-[#37383a] dark:text-[#d9d9e3] mr-2"
                onClick={() => removePrompt(index)}
              />
            )}
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
        {role?.toLowerCase() === "system" ? (
          <div>
            {isExpand ? (
              <div className="w-full">
                <TextareaAutosize
                  rows={4}
                  ref={textareaRef}
                  value={text}
                  onChange={handleChange}
                  spellCheck={false}
                  className={`${
                    role?.toLocaleLowerCase() !== "system" && "mt-[0px]"
                  } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] text-[#353740]  dark:text-[#d9d9e3]`}
                />
              </div>
            ) : (
              // <p className="text-[#71717A] text-[14px] whitespace-nowrap">
              //   {text.length === 0
              //     ? "enter system prompt..."
              //     : text.substring(0, 15) + "..."}
              // </p>
              <TextareaAutosize
                value={text.substring(0, 15) + "..."}
                spellCheck={false}
                className="w-full resize-none overflow-y-hidden outline-none bg-transparent h-fit min-h-fit rounded-md relative text-[#71717A] text-[14px] cursor-pointer"
              />
            )}
          </div>
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
                  <div>
                    <div
                      contentEditable="true"
                      id="prompt-content"
                      autoFocus={true}
                      ref={contentEditableRef}
                      className="outline-none p-[5px] min-h-[100px] dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: text,
                      }}
                      onBlur={(evt) =>
                        handleTextChange(evt.currentTarget.innerHTML)
                      }
                      onFocus={() => handleFocus(index)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {!isExpand && role?.toLocaleLowerCase() !== "system" && (
          // <p className="text-[#71717A] text-[14px] whitespace-nowrap">
          //   {text.length === 0
          //     ? "empty prompt..."
          //     : text.substring(0, 15) + "..."}
          // </p>
          <TextareaAutosize
            value={
              text.length === 0
                ? "empty prompt..."
                : text.substring(0, 15) + "..."
            }
            spellCheck={false}
            className="w-full resize-none overflow-y-hidden outline-none bg-transparent h-fit min-h-fit rounded-md relative text-[#71717A] text-[14px] cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Prompt;
