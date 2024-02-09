"use client";

import React, { useState } from "react";
import { variables,JsonDataType } from "./JsonData.";
import { UIRenderer } from "./UIRenderer";

type UIFactoryState = (JsonDataType & { value: string });
export const UIFactory = () => {
  const [UIData, setUIData] = useState(
    variables.map((element) => ({ ...element, value: "" }))
  );

  const handleChange = (element: JsonDataType) => {
    const updatedData  = UIData.map((oldElement) =>
      oldElement.id === element.id ? element : oldElement
    );
  
    setUIData(updatedData);
  };
  const handleRendering = (element : JsonDataType) => {
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
        {UIData?.map((element, index) => {
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
    </div>
  );
};
