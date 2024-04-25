"use client";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import { Label } from "../UI";
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
  const [isUpload, setIsUpload] = useState(false);
  const [componentMounted, setComponentMounted] = useState<boolean>(false);
  const { flag1, flag2, variableData, setVariableData } = useAuth();

  const handleMouseUp = () => {
    if (window) selectedStr = window?.getSelection()?.toString();
  };

  const removePrompt = (index: number) => {
    const updateData = pData.filter((_: any, i: number) => i !== index);
    setPData(updateData);
    setIsUpload(false);
  };

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentMounted) handleHighlight();
  }, [flag1]);

  useEffect(() => {
    if (componentMounted) handleHighlightoOpt();
  }, [flag2]);

  const handleChange = (e: any) => {
    const utext = e.target.value;
    const updateData = pData.map((data: any, i: number) => {
      if (i === index) data.text = utext;
      return data;
    });
    setPData(updateData);
    // setIsUpload(false);
  };

  const handleHighlightoOpt = () => {
    const expandIndex = pData
      .map((prop: any, index: number) => {
        if (prop.isExpand) return index;
      })
      .filter((e: any) => e !== undefined)[0];
    const tempText = document.getElementById("prompt-content");
    let temp = tempText?.innerHTML.replace(
      selectedStr,
      `<span style="color: orange; font-style: italic; font-weight: bold;">${selectedStr}</span>`
    );
    const updateData = pData.map((data: any, i: number) => {
      if (i === expandIndex) data.text = temp;
      return data;
    });

    const currentVariableData = [...variableData];
    const newVariableData = [
      ...currentVariableData,
      {
        title: "",
        text: `<span style="color: orange; font-style: italic; font-weight: bold;">${selectedStr}</span>`,
        advanced: {
          tarea: "",
          dValue: "",
          databaseField: "",
        },
      },
    ];
    setPData(updateData);
    if (selectedStr !== "") setVariableData(newVariableData);
    // selectedStr = "";
  };

  const handleHighlight = () => {
    const expandIndex = pData
      .map((prop: any, index: number) => {
        if (prop.isExpand) return index;
      })
      .filter((e: any) => e !== undefined)[0];
    const tempText = document.getElementById("prompt-content");
    let temp = tempText?.innerHTML.replace(
      selectedStr,
      `<span style="color: blue; font-style: italic; font-weight: bold;">${selectedStr}</span>`
    );
    const updateData = pData.map((data: any, i: number) => {
      if (i === expandIndex) data.text = temp;
      return data;
    });

    const currentVariableData = [...variableData];
    const newVariableData = [
      ...currentVariableData,
      {
        title: "",
        text: `<span style="color: blue; font-style: italic; font-weight: bold;">${selectedStr}</span>`,
        advanced: {
          tarea: "",
          dValue: "",
          databaseField: "",
        },
      },
    ];
    setPData(updateData);
    if (selectedStr !== "") setVariableData(newVariableData);
    // selectedStr = "";
  };

  const handleTextChange = (newText: string) => {
    const updateData = pData.map((data: any, i: number) => {
      if (i === index) data.text = newText;
      return data;
    });

    setPData(updateData);
  };

  return (
    <div
      className={`h-fit flex flex-col group [transition:all_.3s_ease-in-out] ${
        role?.toLocaleLowerCase() !== "system" && "mt-[10px]"
      }`}
    >
      <div
        onClick={() => {
          if (!isExpand) {
            setIsExpand(index);
          }
        }}
        className={`rounded-lg flex-col relative border ${
          isExpand && ""
        } border-[#6b6b6b80] mb-2 hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d] flex justify-between p-2`}
      >
        <div className="flex items-center justify-between">
          <Label className="mb-[5px] text-[12px]">{role?.toUpperCase()}</Label>
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
          // <TextareaAutosize
          //   rows={4}
          //   value={text}
          //   autoFocus={true}
          //   onChange={handleChange}
          //   spellCheck={false}
          //   className={`${
          //     role?.toLocaleLowerCase() !== "system" && "mt-[23px]"
          //   } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157]text-[#353740] dark:text-[#d9d9e3]`}
          // />
          <div>
            {isExpand ? (
              <div className="w-full">
                <TextareaAutosize
                  rows={4}
                  value={text}
                  onChange={handleChange}
                  spellCheck={false}
                  className={`${
                    role?.toLocaleLowerCase() !== "system" && "mt-[0px]"
                  } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] text-[#353740]  dark:text-[#d9d9e3]`}
                />
              </div>
            ) : (
              <p className="text-[#71717A] text-[14px] whitespace-nowrap">
                {text.length === 0
                  ? "enter system prompt..."
                  : text.substring(0, 15) + "..."}
              </p>
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
                  // <TextareaAutosize
                  //   rows={4}
                  //   value={text}
                  //   onChange={handleChange}
                  //   spellCheck={false}
                  //   className={`${
                  //     role?.toLocaleLowerCase() !== "system" && "mt-[0px]"
                  //   } w-full resize-none overflow-y-hidden p-1 outline-none bg-transparent h-fit min-h-fit rounded-md group-hover:bg-danger-200 relative focus:border-[#0e8157] text-[#353740]  dark:text-[#d9d9e3]`}
                  // />
                  // <div>1232131232</div>
                  <div>
                    <div
                      contentEditable="true"
                      id="prompt-content"
                      className="outline-none p-[5px] min-h-[100px] dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: text,
                      }}
                      onBlur={(evt) =>
                        handleTextChange(evt.currentTarget.innerHTML)
                      }
                      onMouseUp={() => handleMouseUp()}
                    />
                  </div>
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
      </div>
    </div>
  );
};

export default Prompt;
