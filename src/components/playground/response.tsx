"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Label } from "@/components/_shared";

import { AiOutlineDelete } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import { FaPlus } from "react-icons/fa6";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/AuthContext";
import MarkdownView from "@/components/_shared/MarkdownView";

interface iPrompt {
  isExpand?: boolean;
  text: string;
  role?: string;
  setIsExpand: Function;
  index: number;
  removePrompt: Function;
  pData?: any;
  clearTextByID: Function;
  isFormat: number;
  handleFormat: Function;
}
const ResponsePrompt = ({
  isExpand,
  text,
  role,
  setIsExpand,
  clearTextByID,
  index,
  removePrompt,
  pData,
  isFormat,
  handleFormat
}: iPrompt) => {
  const { contextData, version, setContextData } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isButtonFlag, setButtonFlag] = useState<number>(0);

  const erasePromptByID = (index: number) => {
    removePrompt(index);
  };

  const handleChange = (event: any) => {
    const utext = event.target.value;
    const currentResponseData = contextData[version - 1].responseData;
    const updateData = currentResponseData.map((data: any, i: number) => {
      if (i === index) data.text = utext;
      return data;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.responseData = updateData;
      }
      return item;
    });
    setContextData(updateContextData);
  };

  // const handleAddMessage = () => {
  //   const plainText = text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");

  //   const currentPromptData = [...promptData];
  //   currentPromptData.push({
  //     isExpand: true,
  //     role: "assistant",
  //     text: plainText,
  //   });

  //   setPromptData(currentPromptData);
  // };

  useEffect(() => {
    if (isFormat !== 1) {
      if (textareaRef.current && textareaRef.current.innerText === "") {
        textareaRef.current.focus();
      } else if (textareaRef.current && textareaRef.current.innerText !== "") {
        const range = document.createRange();
        const selection = window.getSelection();
        const lastChild = textareaRef.current.lastChild;

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
  }, [isFormat, isExpand]);

  const clearText = () => {
    if (clearTextByID) clearTextByID(index);
  };

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
        <div
          onClick={() => {
            if (!isExpand) {
              setIsExpand(index);
            }
          }}
        >
          <div className="flex items-center justify-between mb-[5px]">
            <div className="flex items-center justify-between">
              <Label className="text-[12px] dark:text-white">{`RESPONSE ${index + 1}`}</Label>
            </div>
            <div
              className={`flex items-center ${
                isExpand && "absolute right-2 top-2"
              } cursor-pointer ml-2 dark:text-[#d9d9e3]`}
            >
              <AiOutlineDelete
                className="text-[#37383a] dark:text-[#d9d9e3] mr-2"
                onClick={() => erasePromptByID(index)}
              />
              {isExpand ? (
                <BsArrowsAngleContract
                  className="text-[#37383a] text-[12px] dark:text-[#d9d9e3]"
                  onClick={() => {
                    setIsExpand(index);
                    setButtonFlag(0);
                  }}
                />
              ) : (
                <BsArrowsAngleExpand
                  className="text-[#37383a] text-[12px] dark:text-[#d9d9e3]"
                  onClick={() => setIsExpand(index)}
                />
              )}
            </div>
          </div>

          {isExpand ? (
            <div className="w-full">
              {isFormat === 0 && (
                <TextareaAutosize
                  ref={textareaRef}
                  autoFocus={true}
                  value={text}
                  onChange={handleChange}
                  className={`w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] text-[#353740] dark:text-[#d9d9e3] h-35`}
                />
              )}
              {isFormat === 1 && <MarkdownView content={text} />}
            </div>
          ) : (
            // <p className="text-[#71717A] text-[14px] whitespace-nowrap">
            //   {(text && text.length === 0) || text == undefined
            //     ? "Some Response..."
            //     : text.replace(/\*/g, "").substring(0, 15) + "..."}
            // </p>
            <TextareaAutosize
              rows={4}
              value={text.replace(/\*/g, "").substring(0, 70) + "..."}
              onChange={handleChange}
              className={`w-full resize-none text-[14px] overflow-y-hidden outline-none bg-transparent h-fit min-h-fit rounded-md relative text-[#71717A] cursor-pointer`}
            />
          )}
        </div>
        {isExpand && (
          <div className="flex items-center justify-between mt-1">
            <div>
              <Button
                className={`text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ${
                  isFormat === 0 && "bg-[#acacac]"
                }`}
                size="sm"
                onClick={() => handleFormat(0, index)}
              >
                Text
              </Button>
              <Button
                className={`text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2 ${
                  isFormat === 1 && "bg-[#acacac]"
                }`}
                size="sm"
                onClick={() => handleFormat(1, index)}
              >
                Markdown
              </Button>
              <Button
                className={`text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2 ${
                  isFormat === 2 && "bg-[#acacac]"
                }`}
                size="sm"
                onClick={() => handleFormat(2, index)}
              >
                Form
              </Button>
              <Button
                className={`text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2 ${
                  isFormat === 3 && "bg-[#acacac]"
                }`}
                size="sm"
                onClick={() => handleFormat(3, index)}
              >
                Table
              </Button>
              <Button
                className={`text-[12px] rounded-lg h-[24px] bg-[#2B2B2B] ml-2 ${
                  isFormat === 4 && "bg-[#acacac]"
                }`}
                size="sm"
                onClick={() => handleFormat(4, index)}
              >
                JSON
              </Button>
            </div>
            <div className="flex items-center">
              {/* <Button
                className="text-[12px] rounded-lg h-[24px] ml-2"
                size="sm"
                onClick={handleAddMessage}
              >
                <FaPlus className="mr-1" />
                Add Messages
              </Button> */}
              <Button
                className="text-[12px] rounded-lg h-[24px] ml-2"
                size="sm"
                onClick={clearText}
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
