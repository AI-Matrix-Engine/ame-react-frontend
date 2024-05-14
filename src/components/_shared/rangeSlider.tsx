import React, { useState } from "react";
import { Slider } from "../_shared";
import { Input } from "./Input";

interface iRandSlider {
  min: number;
  max: number;
  step: number;
  label: string;
  defaultValue: string | number;
  helpText: string;
  onChange: (value: any[]) => void;
}

const RangeSlider = ({ min, max, step, label, defaultValue, onChange, helpText }: iRandSlider) => {
  const [inputValue, setInputValue] = React.useState<number | string>(defaultValue);
  const [sliderValue, setSliderValue] = React.useState<number>(typeof defaultValue === "number" ? defaultValue : parseInt(defaultValue));
  const [isHelpText, setShowHelp] = useState(false);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (value > max) {
      setInputValue(max);
      setSliderValue(max);
    } else if (value < min) {
      setInputValue(min);
      setSliderValue(min);
    } else {
      setInputValue(value);
      setSliderValue(value);
    }
    onChange(value);
  }

  const handleSliderChange = (value: number) => {
    setSliderValue(typeof value === "number" ? value : parseInt(value));
    setInputValue(value);
  }
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
            value={inputValue}
            onChange={handleInputChange}
            className="w-[30px] p-0 h-[20px] rounded-sm text-[8px] text-center"
          />
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[sliderValue]}
        className="slider"
        onChange={(e) => handleSliderChange}
      />
    </div>
  );
};

export default RangeSlider;
