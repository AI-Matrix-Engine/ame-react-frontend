import React, { useState } from "react";
import Slider from "react-slider";

interface iRandSlider {
  min: number;
  max: number;
  step: number;
  label: string;
  defaultValue: string | number;
}

const RangeSlider = ({ min, max, step, label, defaultValue }: iRandSlider) => {
  const [value, setValue] = useState<number | string>(defaultValue);

  return (
    <div className="leading-[10px] mb-[15px]">
      <div className="flex text-[12px] text-[#000] dark:text-[#fff] w-full justify-between">
        <p>{label}</p>
        <p>{value}</p>
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
