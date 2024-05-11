import React, { useState } from "react";
import Slider from "react-slider";
import { Input } from "./Input";

interface iRandSlider {
  min: number;
  max: number;
  step: number;
  label: string;
  defaultValue: string | number;
  helpText: string;
}

const RangeSlider = ({ min, max, step, label, defaultValue, helpText }: iRandSlider) => {
  const [value, setValue] = useState<number | string>(defaultValue);
  const [isHelpText, setShowHelp] = useState(false);
  return (
    <div className="leading-[10px] mb-[15px]">
      <div className="flex text-[12px] text-[#000] dark:text-[#fff] w-full justify-between items-center">
        <div className="flex items-center">
          {label} 
          {/* <div className={`relative`} 
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <IoMdHelpCircleOutline className="ml-1 cursor-pointer text-[15px]"/>
            {isHelpText && <div className="absolute bg-[#616161eb] text-white p-1 rounded-md z-[2] bottom-[15px]">{helpText}</div>}
          </div> */}
        </div>
        <div className="w-fit relative">
          <Input
            value={value}
            onChange={(e: any) => {
              if (e.target.value > max) setValue(max);
              else if (e.target.value < min) setValue(min);
              else setValue(e.target.value);
            }}
            className="w-[30px] p-0 h-[20px] rounded-sm text-[8px] text-center"
          />
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        className="slider"
        onChange={(e: any) => setValue(e)}
      />
    </div>
  );
};

export default RangeSlider;
