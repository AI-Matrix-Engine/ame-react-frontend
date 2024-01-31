"use client";

import React, { useState } from "react";
import { variables } from "./Data.";
import { UIRenderer } from "./UIRenderer";
import { Checkbox } from "../UI/checkbox";

export const UIFactory = () => {
  const [UIData, setUIData] = useState(
    variables.map((element) => ({ ...element, value: "" }))
  );

  const handleChange = (element: any) => {
    const updatedData = UIData.map((oldElement) =>
      oldElement.id === element.id ? element : oldElement
    );
    console.log("UpdatedData", updatedData);
    setUIData(updatedData);
  };
  const handleRendering = (element) => {
    return <UIRenderer element={{ ...element }} onChange={handleChange} />;
  };

  return (
    <div>
      <div>
        <h4 className=" text-2xl text-[#212B36] font-arimo font-semibold text-center mb-4">
          School Management
        </h4>
      </div>
      <div className=" grid grid-cols-3 grid-rows-2 gap-8 p-4 justify-center content-center">
        {UIData.map((element, index) => {
          if (element?.source_params?.type === "textarea") {
            return (
              <div key={index} className="col-span-full">
                {handleRendering(element)}
              </div>
            );
          } else {
            return (
              <div key={index} className="flex flex-col">
                {handleRendering(element)}
              </div>
            );
          }
        })}
      </div>
      <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
    </div>
  );
};
