import React from "react";
import { Dropdown, Input } from "../UI";
import { Textarea } from "../UI/textarea";

export const UIRenderer = ({ element, onChange }: any) => {
  const handleChangeValue = (value: string) => {
    onChange({ ...element, value: value });
  };
  if (
    ["standard_dropdown", "dropdown_with_other_option"].includes(
      element?.source_params?.type
    )
  )
    return (
      <Dropdown
        onClick={(value: string) => handleChangeValue(value)}
        options={element?.source_params?.options?.options}
        placeHolder={element?.source_params?.options?.placeholder}
      />
    );

  if (element?.source_params?.type === "standard_text_input")
    return (
      <Input
      element={element}
      placeholder="Filter emails..."
      className="max-w-sm"
      onChange={handleChangeValue}
    />
    );
  if (element?.source_params?.type === "textarea")
    return (
      <div className="w-full">
        <Textarea
          placeholder="Enter Message"
          element={element}
          handleChange={(value: string) => handleChangeValue(value)}
        />
      </div>
    );
};
