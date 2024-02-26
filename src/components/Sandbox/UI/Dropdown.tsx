"use client";
import React, { useState } from "react";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".";

type SelectType = {
  label: string;
  value: string;
};

type Props = {
  onClick: (value: string) => void;
  options: SelectType[];
  placeHolder: string;
  value: string;
};

export const Dropdown = ({
  onClick,
  options = [],
  placeHolder,
  value,
  ...rest
}: Props) => {
  const handleChange = (value: string) => {
    onClick(value);
  };

  return (
    <div className="w-full">
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
    </div>
  );
};
