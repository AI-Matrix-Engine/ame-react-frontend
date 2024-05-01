import React from "react";
import { variables } from "./JsonData.";
import { Button } from "../_shared";
import { iRightPaneProps } from "@/utils/types";

export const RightPane = ({ handleUiElements }: iRightPaneProps) => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      {variables
        .filter(
          (item) =>
            item.source_params.type !== "table" &&
            item.source_params.type !== "dialog" &&
            item.source_params.type !== "tab"
        )
        .map((item, index) => {
          return (
            <Button
              key={index}
              variant="secondary"
              className="mb-2"
              onClick={() => handleUiElements(item as any)}
            >
              {item.label}
            </Button>
          );
        })}

      <div className="border-t-2 border-gray-400 my-4"></div>
      {variables
        .filter(
          (item) =>
            item.source_params.type === "table" ||
            item.source_params.type === "dialog" ||
            item.source_params.type === "tab"
        )
        .map((item, index) => {
          return (
            <Button
              key={index}
              variant="secondary"
              className="mb-2"
              onClick={() => handleUiElements(item as any)}
            >
              {item.label}
            </Button>
          );
        })}
    </div>
  );
};
