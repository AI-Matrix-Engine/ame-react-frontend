import React from "react";
import { JsonDataType, variables } from "./JsonData.";
import { Button } from "../UI/button";

type Props = {
  handleUiElements: (item: JsonDataType) => void;
};

export const RightPane = ({ handleUiElements }: Props) => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      {variables.map((item, index) => {
        return (
          <Button
            key={index}
            variant="secondary"
            className="mb-2"
            onClick={() => handleUiElements(item)}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};
