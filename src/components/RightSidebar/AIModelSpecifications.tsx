import React, { useState } from "react";
import { Input, Label, Slider, Button } from "../UI";

const LABEL = "AI Model Specifications";

export const AIModelSpecifications = () => {
  const [sliderValue, setSliderValue] = useState({
    token: 0,
    frequencyPenalty: 0,
    temperature: 0,
    topP: 0,
    presencePenalty: 0,
  });

  const handleSliderValue = (value: number[], name: string) => {
    setSliderValue({
      ...sliderValue,
      [name]: value,
    });
  };
  return (
    <div className="  mt-2 mb-4">
      <Label htmlFor="text" className="mb-2 block">
        {LABEL}
      </Label>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Max Tokens: {sliderValue.token}</Label>
          <Slider
            onValueCommit={(e: number[]) => handleSliderValue(e, "token")}
            max={3000}
            min={0}
            step={1}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">
            Frequency Penalty: {sliderValue.frequencyPenalty}
          </Label>
          <Slider
            onValueCommit={(e: number[]) =>
              handleSliderValue(e, "frequencyPenalty")
            }
            max={2}
            min={0}
            step={0.01}
          />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">
            Temperature: {sliderValue.temperature}
          </Label>
          <Slider
            onValueCommit={(e: number[]) => handleSliderValue(e, "temperature")}
            max={2}
            min={0}
            step={0.01}
          />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Top P: {sliderValue.topP}</Label>
          <Slider
            onValueCommit={(e: number[]) => handleSliderValue(e, "topP")}
            max={1}
            min={0}
            step={0.01}
          />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">
            Presence Penalty: {sliderValue.presencePenalty}
          </Label>
          <Slider
            onValueCommit={(e: number[]) =>
              handleSliderValue(e, "presencePenalty")
            }
            max={2}
            min={0}
            step={0.01}
          />
        </div>

        <div className="w-full md:w-1/2 p-2">
          <Label className="mb-2 block">Stop Sequence</Label>
          <Input type="input" id="label" />
        </div>

        <div className="w-full  p-2 ">
          <Button>Update with Model Configuration</Button>
        </div>
      </div>
    </div>
  );
};
