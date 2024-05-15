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
  onChange?: (e: any) => void;
}

const RangeSlider = ({ min, max, step, label, defaultValue, helpText, onChange }: iRandSlider) => {
  const [value, setValue] = useState<any>(defaultValue);
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
        value={[value]}
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-900/20 dark:bg-zinc-50/20 flex items-center"
        trackClassName="absolute h-full bg-zinc-900 dark:bg-zinc-50"
        thumbClassName="block h-4 w-4 rounded-full border border-zinc-900 bg-white   disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-visible:ring-zinc-300"
        onChange={(e: any) => { onChange ? onChange(e) : null; setValue(e); }}
      />
    </div>
  );
};

export default RangeSlider;