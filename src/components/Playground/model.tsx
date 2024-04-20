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
    <div className="w-full border-b border-zinc-200 pb-1 pt-4">
      <p
        className="flex items-center text-[12px] mb-1 cursor-pointer w-full justify-between"
        onClick={() => setIsOpenModel(modelId)}
      >
        <Label className="cursor-pointer">{modelName.toLocaleUpperCase()}</Label>
        {isOpen ? (
          <MdOutlineKeyboardArrowDown className="ml-1" />
        ) : (
          <MdOutlineKeyboardArrowRight className="ml-1" />
        )}
      </p>
      {isOpen && (
        <>
          <Textarea name="description" />
          <div className="flex items-center justify-between mt-2 mb-1">
            <div className="flex items-center">
              <Checkbox
                name="discoverability"
                value="show_on_events_page"
                defaultChecked
              />
              <p className="text-[12px] ml-1">Required</p>
            </div>
            <div
              className="text-[12px] ml-1 flex items-center cursor-pointer"
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
            <div>
              <Dropdown options={recipies} />
              <Input name="full_name" className="my-1" />
              <Dropdown options={recipies} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
