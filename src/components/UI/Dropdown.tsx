"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Label } from "./label";
import { Input } from ".";

type SelectType = {
  label: string;
  value: string;
}

type Props = {
  onClick: (value: string) => void,
  options: SelectType[],
  placeHolder: string,
  value: string,
}

export const Dropdown = ({
  onClick,
  options = [],
  placeHolder,
  value,
  ...rest
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onClick(value);
  };

  return (
    <>
      <Label className="mb-2">{placeHolder}</Label>
      <Select
        onValueChange={(value: string) => {
          handleChange(value);
        }}
        defaultValue={options[0]?.value}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => {
            return (
              <SelectItem key={index} value={item?.value} {...rest}>
                {item?.label}
              </SelectItem>
            );
          })}

          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      {selectedValue && selectedValue === "Other" && (
        <Input
          placeholder="Enter Industry Name..."
          className="mt-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onClick(e.target.value)
          }
          {...rest}
        />
      )}
    </>
  );
};
