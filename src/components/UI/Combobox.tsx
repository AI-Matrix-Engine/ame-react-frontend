"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { Button } from ".";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from ".";
import { Popover, PopoverContent, PopoverTrigger } from ".";

type ComboboxTypes = {
  options: { label: string; value: string }[];
  onClick: (value: string) => void;
  value: string;
  placeHolder: string;
};
export function Combobox({ options, onClick, value, placeHolder }: ComboboxTypes) {
  const [open, setOpen] = React.useState(false);
  const [inputValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-full justify-between bg-transparent"
        >
          {value ? options.find((options) => options.value === value)?.label : placeHolder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[1000px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {options.map((options) => (
              <CommandItem
                key={options.value}
                value={options.value}
                onSelect={(currentValue) => {
                  onClick(currentValue === inputValue ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {options.label}
                <CheckIcon
                  className={cn("ml-auto h-4 w-4", inputValue === options.value ? "opacity-100" : "opacity-0")}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
