"use client";

import React, { useState } from "react";
import { variables, JsonDataType } from "./JsonData.";
import { UIRenderer } from "./UIRenderer";
import Link from "next/link";
import { RightPane } from "./RightPane";
import { IntakeForm } from "./IntakeForm";

type UIFactoryState = JsonDataType & { value: string };
export const UIFactory = () => {
  const [UIData, setUIData] = useState(
    variables.map((element) => ({ ...element, value: "" }))
  );
  const [customFields, setCustomFields] = useState<JsonDataType[]>([]);

  function generateUUID() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  }

  const handleChange = (element: JsonDataType) => {
    const updatedData = UIData.map((oldElement) =>
      oldElement.id === element.id ? element : oldElement
    );

    setUIData(updatedData);
  };
  const handleRendering = (element: JsonDataType) => {
    return <UIRenderer element={{ ...element }} onChange={handleChange} />;
  };

  const handleUiElements = (element: JsonDataType) => {
    const updatedCustomField = {
      ...element,
      value: "",
      UUID: generateUUID(),
    };

    setCustomFields([...customFields, updatedCustomField]);
  };

  const handleDeleteCustomFields = (id: string) => {
    const updatedCustomFields = customFields.filter((item) => item.UUID !== id);
    setCustomFields(updatedCustomFields);
  };

  const handleCustomFieldsValueChange = (element: JsonDataType) => {
    const updatedCustomFields = customFields.map((item) => {
      if (item.UUID === element.UUID) {
        return element;
      }
      return item;
    });

    setCustomFields(updatedCustomFields);
  };

  console.log("customField", customFields);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <div>
          <h4 className=" text-2xl text-[#212B36] font-arimo font-semibold text-center mb-4">
            Dynamic Page
          </h4>
          <Link
            href="/playground"
            className=" text-2xl text-[#212B36] font-arimo font-semibold text-center mb-4"
          >
            Playgound
          </Link>
        </div>
        {/* <div className=" grid grid-cols-3 grid-rows-2 gap-8 p-4 justify-center content-center">
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
      </div> */}
        <IntakeForm
          className=""
          customFields={customFields}
          onDelete={handleDeleteCustomFields}
          handleChange={handleCustomFieldsValueChange}
        />
      </div>
      <div className="p-4 bg-gray-200 w-80">
        <RightPane handleUiElements={handleUiElements} />
      </div>
    </div>
  );
};
