"use client";

import * as React from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { Textarea } from "@/components/UI/textarea";
import { Checkbox } from "@/components/UI/checkbox";
import { Input } from "@/components/UI/index";
import { Dropdown, Label } from "@/components/UI";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { SlCloudUpload } from "react-icons/sl";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { AiOutlineFileText } from "react-icons/ai";

interface iModel {
  modelName: string;
  isOpen: boolean;
  isAdvancedOpen: boolean;
  modelId: number;
  text: string;
  setIsOpenModel: Function;
  setIsOpenAdvanced: Function;
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
  text,
}: iModel) => {
  const [isUpload, setIsUpload] = React.useState(false);
  return (
    <div
      className={`w-full px-2 [transition:all_.3s_ease-in-out] py-[10px] border-b border-b-[#858484] dark:border-b-[#222222] ${
        !isOpen ? " hover:bg-[#e8e8eb] dark:hover:bg-[#ffffff0d]" : ""
      } dark:border-[#27272a]`}
    >
      <p className="flex items-center text-[16px] cursor-pointer w-full justify-between">
        <Input defaultValue={modelName.toLocaleUpperCase()} />
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
              // onBlur={(evt) => handleTextChange(evt.currentTarget.innerHTML)}
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
