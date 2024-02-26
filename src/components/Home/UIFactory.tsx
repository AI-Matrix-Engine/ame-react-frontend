"use client";

import React, { useState } from "react";
import { variables, JsonDataType } from "./JsonData.";
import { UIRenderer } from "./UIRenderer";
import Link from "next/link";
import { RightPane } from "./RightPane";
import { IntakeForm } from "./IntakeForm";
import { Button } from "../UI";
import { Minus } from "lucide-react";

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

    setUIData(updatedData as any);
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

  const formCustomFields = customFields.filter(
    (item) =>
      item.source_params.type !== "table" &&
      item.source_params.type !== "dialog" &&
      item.source_params.type !== "tab"
  );

  return (
    <div className="flex">
      <div className="flex flex-col flex-1 p-4">
        <div>
          <h4 className=" text-2xl text-[#212B36] font-arimo font-semibold text-center mb-4">
            Dynamic Page
          </h4>
          <Link
            href="/sandbox"
            className=" text-2xl text-[#212B36] font-arimo font-semibold text-center mb-4"
          >
            Sandbox
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
          customFields={formCustomFields}
          onDelete={handleDeleteCustomFields}
          handleChange={handleCustomFieldsValueChange}
        />
        <div 
          className="mt-4"
        >
          {customFields
            .filter(
              (item) =>
                item.source_params.type === "table" ||
                item.source_params.type === "dialog" ||
                item.source_params.type === "tab"
            )
            .map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-4 border border-gray-300 p-4 mb-4 rounded items-end"
                >
                  <div className="flex flex-col w-full">
                    <UIRenderer element={element} onChange={handleChange} />
                  </div>

                  <Button
                    className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-400"
                    onClick={() => handleDeleteCustomFields(element.UUID)}
                    type="button"
                  >
                    <Minus />
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="p-4 bg-gray-200 w-80">
        <RightPane handleUiElements={handleUiElements} />
      </div>
    </div>
  );
};
