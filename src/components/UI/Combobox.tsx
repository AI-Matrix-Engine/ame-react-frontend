"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { Button } from ".";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from ".";
import { Popover, PopoverContent, PopoverTrigger } from ".";

type ComboboxTypes = {
  options: { label: string; value: string }[];
  onClick: (value:string)=>void;
value:string;
placeHolder:string

};
export function Combobox({ options,onClick,value,placeHolder }: ComboboxTypes) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-full justify-between bg-transparent"
        >
          {value
            ? options.find((options) => options.value === value)?.label
            : placeHolder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[1000px] p-0">
        <Command >
          <CommandInput placeholder="Search framework..." className="h-9" />
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
                  className={cn(
                    "ml-auto h-4 w-4",
                    inputValue === options.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// "use client";

// import * as React from "react";
// import { X } from "lucide-react";

// import { Command, CommandGroup, CommandItem } from ".";
// import { Command as CommandPrimitive } from "cmdk";
// import { Badge } from "./badge";

// type Framework = Record<"value" | "label", string>;

// export function Combobox({ options, value, setValue, multipleSelection }:any) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [open, setOpen] = React.useState(false);
//   const [selected, setSelected] = React.useState([]);
//   const [inputValue, setInputValue] = React.useState("");

//   const handleUnselect = (options : any) => {
//     setSelected((prev) => prev.filter((s: any) => s.value !== options.value));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     const input = inputRef.current;
//     if (input) {
//       if (e.key === "Delete" || e.key === "Backspace") {
//         if (input.value === "") {
//           setSelected((prev) => {
//             const newSelected = [...prev];
//             newSelected.pop();
//             return newSelected;
//           });
//         }
//       }
//       if (e.key === "Escape") {
//         input.blur();
//       }
//     }
//   };
//   const selectables = options.filter((options: any) => !selected.includes(options));

//   return (
//     <Command
//       onKeyDown={handleKeyDown}
//       className="overflow-visible bg-transparent"
//     >
//       <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//         <div className="flex gap-1 flex-wrap">
//           {selected.map((options : any) => {
//             return (
//               <Badge key={options.value} variant="secondary">
//                 {options.label}
//                 {multipleSelection && (
//                   <button
//                     className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         handleUnselect(options);
//                       }
//                     }}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                     }}
//                     onClick={() => handleUnselect(options)}
//                   >
//                     <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                   </button>
//                 )}
//               </Badge>
//             );
//           })}
//           {/* Avoid having the "Search" Icon */}
//           <CommandPrimitive.Input
//             ref={inputRef}
//             value={inputValue}
//             onValueChange={setInputValue}
//             onBlur={() => setOpen(false)}
//             onFocus={() => setOpen(true)}
//             placeholder="Select frameworks..."
//             className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//           />
//         </div>
//       </div>
//       <div className="relative mt-2">
//         {open && selectables.length > 0 ? (
//           <div className="absolute w-full z-10 top-0 rounded-md border bg-white text-popover-foreground shadow-md outline-none animate-in">
//             <CommandGroup className="h-full overflow-auto">
//               {selectables.map((framework : any) => {
//                 return (
//                   <CommandItem
//                     key={framework.value}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                     }}
//                     onSelect={(value) => {
//                       setInputValue("");
//                       setSelected((prev ) : any => [...prev, framework]);
//                       !multipleSelection && setOpen(false);
//                     }}
//                     className={"cursor-pointer"}
//                   >
//                     {framework.label}
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//           </div>
//         ) : null}
//       </div>
//     </Command>
//   );
// }
