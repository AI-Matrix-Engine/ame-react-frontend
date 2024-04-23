"use client";

import * as React from "react";
import { Select } from "@/components/UI/select";
import { Dropdown, Input, Label } from "@/components/UI";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import RangeSlider from "@/components/UI/rangeSlider";

interface iModel {
  model: any;
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

export const Model = ({
  model,
  isOpen,
  modelId,
  isAdvancedOpen,
  setIsOpenAdvanced,
  setIsOpenModel,
}: iModel) => {
  return (
    <div className="w-full pb-1 pt-4">
      <p
        className="flex items-center text-[#000] text-[14px] font-medium mb-1 cursor-pointer [transition:all_.3s_ease-in-out] dark:text-white"
        onClick={() => setIsOpenModel(modelId)}
      >
        {`MODEL ${modelId + 1}`}
        {isOpen ? (
          <MdOutlineKeyboardArrowDown className="ml-1" />
        ) : (
          <MdOutlineKeyboardArrowRight className="ml-1" />
        )}
      </p>
      {isOpen && (
        <>
          <div className="w-full">
            <div className="">
              <Dropdown
                options={[
                  { value: "0", label: "API" },
                  { value: "1", label: "API 1" },
                  { value: "2", label: "API 2" },
                  { value: "3", label: "API 3" },
                ]}
                className="text-[12px] rounded-xl"
              />
              <div className="h-[10px]"/>
               <Dropdown
                options={[
                  { value: "0", label: "Mode" },
                  { value: "1", label: "Mode 1" },
                  { value: "2", label: "Mode 2" },
                  { value: "3", label: "Mode 3" },
                ]}
                className="text-[12px] rounded-xl"
              />
            </div>
          </div>
          <div className="mt-4 w-full">
            <p
              className="flex items-center text-[#000] text-[12px] mb-1 cursor-pointer [transition:all_.3s_ease-in-out] dark:text-white"
              onClick={() => setIsOpenAdvanced()}
            >
              ADVANCED OPTION
              {isAdvancedOpen ? (
                <MdOutlineKeyboardArrowDown className="ml-1" />
              ) : (
                <MdOutlineKeyboardArrowRight className="ml-1" />
              )}
            </p>
            {isAdvancedOpen && (
              <div className="mt-[15px]">
                <RangeSlider
                  min={0}
                  max={1}
                  step={0.1}
                  label="Temperature"
                  defaultValue={model.temperature}
                />
                <RangeSlider
                  min={0}
                  max={1500}
                  step={1}
                  label="Max Tokens"
                  defaultValue={model.maxTokens}
                />
                <RangeSlider
                  min={0}
                  max={1}
                  step={0.1}
                  label="Top P"
                  defaultValue={model.topP}
                />
                <RangeSlider
                  min={0}
                  max={1}
                  step={0.1}
                  label="Frequency Penalty"
                  defaultValue={model.frequencyPenalty}
                />
                <RangeSlider
                  min={0}
                  max={1}
                  step={0.1}
                  label="Presence Penalty"
                  defaultValue={model.presencePenalty}
                />
                <Input placeholder="Enter sequence" className="mt-[10px]"/>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
