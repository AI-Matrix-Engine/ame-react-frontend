"use client";

import * as React from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { AiOutlineFileText } from "react-icons/ai";
import { Textarea } from "@/components/_shared/Textarea";
import { Checkbox } from "@/components/_shared/Checkbox";
import { Input } from "@/components/_shared/index";
import { Dropdown, Label } from "@/components/_shared";
import { useAuth } from "@/context/AuthContext";

interface iModel {
  modelName: string;
  isOpen: boolean;
  isAdvancedOpen: boolean;
  modelId: number;
  text: string;
  setIsOpenModel: Function;
  setIsOpenAdvanced: Function;
  changeTitle: Function;
  messageIndex: number;
}

const recipies = [
  { value: "0", label: "Database Field" },
  { value: "1", label: "Database Field 1" },
  { value: "2", label: "Database Field 2" },
];

const textAreaField = [
  { value: "0", label: "Text Area" },
  { value: "1", label: "Text Area 1" },
  { value: "2", label: "Text Area 2" },
];

export const LeftModel = ({
  modelName,
  isOpen,
  modelId,
  isAdvancedOpen,
  setIsOpenModel,
  setIsOpenAdvanced,
  changeTitle,
  text,
  messageIndex,
}: iModel) => {
  const { contextData, setContextData, version } = useAuth();
  const [isUpload, setIsUpload] = React.useState(false);

  const isLastCharacterSpecial = (inputString: string) => {
    var specialCharacterRegex = /[!@#$%^&*()+\-=\[\] {};':"\\|,.<>\/?]/;
    var lastCharacter = inputString.slice(-1);
    return specialCharacterRegex.test(lastCharacter);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVariableData = contextData[version - 1].variablesData;
    const currentPromptData = contextData[version - 1].promptData;
    if (!isLastCharacterSpecial(e.target.value)) {
      const updatedPromptData = currentPromptData.map(
        (prompt: any, key: number) => {
          if (key === messageIndex)
            prompt.text = prompt.text.replace(
              currentVariableData[modelId].title,
              e.target.value.toUpperCase()
            );
          return prompt;
        }
      );

      const updateContextData = contextData.map((item: any, key: number) => {
        if (key == version - 1) {
          item.promptData = updatedPromptData;
        }
        return item;
      });
      setContextData(updateContextData);

      changeTitle(modelId, e.target.value.toUpperCase());
    }
  };

  return (
    <div
      className={`w-full px-2 [transition:all_.3s_ease-in-out] py-[12px] ${
        !isOpen
          ? " hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d]"
          : "border border-[#dcdce0]"
      } rounded-md dark:border-[#27272a]`}
    >
      <p className="flex items-center text-[16px] cursor-pointer w-full justify-between">
        <Input
          value={modelName}
          autoFocus={true}
          onChange={handleChangeTitle}
        />
        {isOpen ? (
          <MdOutlineKeyboardArrowDown
            className="ml-1 dark:text-white"
            onClick={() => setIsOpenModel(modelId)}
          />
        ) : (
          <MdOutlineKeyboardArrowRight
            className="ml-1 dark:text-white"
            onClick={() => setIsOpenModel(modelId)}
          />
        )}
      </p>
      {isOpen && (
        <div className="mt-[10px]">
          <div className="relative">
            <div
              contentEditable="true"
              className="border border-zinc-200 outline-none p-[5px] min-h-[100px] pt-[23px] dark:text-[#fafafa] dark:bg-[#ffffff0d] dark:border-[#ffffff1a] rounded-xl"
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            />
            <div
              className={`flex items-center ${"absolute right-2 top-2"} cursor-pointer ml-2 dark:text-[#d9d9e3]`}
            >
              <FiUpload
                className="text-[#37383a] cursor-pointer dark:text-[#d9d9e3] mr-2"
                onClick={() => setIsUpload(true)}
              />
              <RiDeleteBin2Line className="text-[#37383a] dark:text-[#d9d9e3]" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-[17px]">
            <div
              className="text-[14px] ml-1 flex items-center cursor-pointer dark:text-white"
              onClick={() => setIsOpenAdvanced()}
            >
              Advanced
              {isAdvancedOpen ? (
                <MdOutlineKeyboardArrowDown className="ml-1 dark:text-[#3478F7]" />
              ) : (
                <MdOutlineKeyboardArrowRight className="ml-1 dark:text-[#3478F7]" />
              )}
            </div>
            <div className="flex items-center">
              <Checkbox
                name="discoverability"
                value="show_on_events_page"
                defaultChecked
              />
              <p className="text-[14px] ml-1 dark:text-white">Required</p>
            </div>
          </div>
          {isAdvancedOpen && (
            <div className="mt-[15px]">
              <Dropdown options={textAreaField} />
              <Input
                name="full_name"
                className="my-[15px]"
                placeholder="Default Value"
              />
              <Dropdown options={recipies} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
