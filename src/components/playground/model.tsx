"use client";

import * as React from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { Textarea } from "@/components/_shared/Textarea";
import { Checkbox } from "@/components/_shared/Checkbox";
import { Input } from "@/components/_shared/index";
import { Dropdown, Label } from "@/components/_shared";

interface iModel {
  modelName: string;
  isOpen: boolean;
  isAdvancedOpen: boolean;
  modelId: number;
  setIsOpenModel: Function;
  setIsOpenAdvanced: Function;
}

const recipies = [
  { value: "0", label: "Select the Recipe Category" },
  { value: "3", label: "Content Writing" },
  { value: "1", label: "SEO" },
  { value: "9", label: "Random Recipes" },
  { value: "12", label: "System Core" },
  { value: "14", label: "Tests" },
];

export const LeftModel = ({
  modelName,
  isOpen,
  modelId,
  isAdvancedOpen,
  setIsOpenModel,
  setIsOpenAdvanced,
}: iModel) => {
  return (
    <div
      className={`w-full px-2 [transition:all_.3s_ease-in-out] py-[12px] ${!isOpen ? " hover:bg-[#dcdce0] dark:hover:bg-[#ffffff0d]" : "border border-[#dcdce0]"
        } rounded-md dark:border-[#27272a]`}
    >
      <p
        className="flex items-center text-[16px] cursor-pointer w-full justify-between"
        onClick={() => setIsOpenModel(modelId)}
      >
        <Label className="cursor-pointer">
          {modelName.toLocaleUpperCase()}
        </Label>
        {isOpen ? (
          <MdOutlineKeyboardArrowDown className="ml-1 dark:text-white" />
        ) : (
          <MdOutlineKeyboardArrowRight className="ml-1 dark:text-white" />
        )}
      </p>
      {isOpen && (
        <div className="mt-[10px]">
          <Textarea name="description" />
          <div className="flex items-center justify-between mt-[17px]">
            <div className="flex items-center">
              <Checkbox
                name="discoverability"
                value="show_on_events_page"
                defaultChecked
              />
              <p className="text-[14px] ml-1 dark:text-white">Required</p>
            </div>
            <div
              className="text-[14px] ml-1 flex items-center cursor-pointer dark:text-white"
              onClick={() => setIsOpenAdvanced()}
            >
              Advanced
              {isAdvancedOpen ? (
                <MdOutlineKeyboardArrowDown className="ml-1" />
              ) : (
                <MdOutlineKeyboardArrowRight className="ml-1" />
              )}
            </div>
          </div>
          {isAdvancedOpen && (
            <div className="mt-[15px]">
              <Dropdown options={recipies} />
              <Input name="full_name" className="my-[15px]" />
              <Dropdown options={recipies} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
