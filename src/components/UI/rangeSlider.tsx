import React, { useState } from "react";

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
      <input type="range" className="w-full border" min={min} max={max} step={step} value={value} onChange={(e: any) => setValue(e.target.value)}/>
    </div>
  );
};

export default RangeSlider;
