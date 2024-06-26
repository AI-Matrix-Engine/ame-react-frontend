"use client";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/_shared/Select";
import { Label } from ".";
import { iDropDownProps } from "@/utils/types";

export const Dropdown = ({
    onClick,
    options = [],
    placeHolder,
    value,
    disabled,
    className,
    isLabel,
    ...rest
}: iDropDownProps) => {
    const handleChange = (value: string) => {
        onClick?.(value);
    };

    return (
        <div className="w-full dark:text-[#fafafa] outline-none rounded-md">
            {!isLabel && <Label className="mb-2">{placeHolder}</Label>}
            <Select
                onValueChange={(value: string) => {
                    handleChange(value);
                }}
                value={value}
                disabled={disabled}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeHolder} />
                </SelectTrigger>
                <SelectContent className={className}>
                    {options?.map((item, index) => {
                        return (
                            <SelectItem key={index} value={item?.value} {...rest}>
                                {item?.label}
                            </SelectItem>
                        );
                    })}

                    {/* <SelectItem value="dark">Dark</SelectItem> */}
                    {/* <SelectItem value="system">System</SelectItem> */}
                </SelectContent>
            </Select>
        </div>
    );
};
