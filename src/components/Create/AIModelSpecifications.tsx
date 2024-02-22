import React from "react";
import { Input, Label, Slider, Button } from "../UI";

const LABEL = "AI Model Specifications";

export const AIModelSpecifications = () => {
  return (
    <div className="container mx-auto px-4">
      <Label htmlFor="text" className="mb-2 block">
        {LABEL}
      </Label>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Max Tokens: 512</Label>
          <Slider />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Frequency Penalty: 0.0</Label>
          <Slider />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Temperature: 1</Label>
          <Slider  defaultValue={[50]} />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Top P: 1</Label>
          <Slider />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Presence Penalty: 0.0</Label>
          <Slider />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Stop Sequence</Label>
          <Input type="input" id="label" />
        </div>

        <div className="w-full md:w-1/2 p-2 ">
          <Button>Update with Model Configuration</Button>
        </div>
      </div>
    </div>
  );
};
