"use client";
import React, { useState } from "react";

// type SelectOptionProps = {
//   value: string;
//   active: boolean;
//   updateValue: (value: string) => void;
//   icon?: React.ReactNode;
// };

// const SelectOption: React.FC<SelectOptionProps> = ({
//   value = "",
//   active = false,
//   updateValue,
//   icon,
// }) => {
//   const handleChange = (e: React.MouseEvent<HTMLLIElement>) => {
//     e.preventDefault();
//     console.log("UpdateValue",value);
//     updateValue(value);
//   };

//   if (!icon) {
//     icon = (
//       <svg
//         className="h-5 w-5"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         aria-hidden="true"
//       >
//         <path
//           fill-rule="evenodd"
//           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//           clip-rule="evenodd"
//         ></path>
//       </svg>
//     );
//   }

//   return (
//     <li
//       className="text-gray-900 cursor-default hover:bg-[#EFF1F4]  select-none relative py-2 pl-3 pr-9"
//       onClick={handleChange}
//     >
//       <div className="flex items-center">
//         <span className="ml-3 block font-normal truncate">{value}</span>
//       </div>
//       {active && (
//         <span className="absolute inset-y-0 right-0 flex items-center pr-4">
//           {icon}
//         </span>
//       )}
//     </li>
//   );
// };

// type SelectProps = {
//   value?: string;
//   options: {label:string,value:string}[]
//   icon?: React.ReactNode;
//   handleChange:any;
//   placeHolder:string
// };

// export const Dropdown: React.FC<SelectProps> = ({
//   value = "Select Option",
//   options = [],
//   icon,
//   handleChange ,
//   placeHolder
// }) => {
//   const [state, setState] = useState({
//     value,
//     showOptions: false,
//   });

//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     setState((p) => ({ ...p, showOptions: !state.showOptions }));
//   };

//   const updateValue = (value: string) => {
//     setState((p) => ({ ...p, showOptions: false, value }));
//     console.log("Update Value**",value);
//     handleChange(value)
//   };

//   if (!icon) {
//     icon = (
//       <svg
//         className={
//           state.showOptions ? "h-5 w-5 text-gray-800" : "h-5 w-5 text-gray-400"
//         }
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         aria-hidden="true"
//       >
//         <path
//           fill-rule="evenodd"
//           d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//           clip-rule="evenodd"
//         ></path>
//       </svg>
//     );
//   }

//   return (
//     <div className="relative ">
//      <label className="flex justify-start">{placeHolder}</label>
//       <button
//         type="button"
//         className={
//           state.showOptions
//             ? "transition-all text-black relative w-full border-2 bg-[#EFF1F4]  rounded-md   pr-10 py-2 text-left cursor-default outline-none  sm:text-sm"
//             : "transition-all text-black relative w-full border-2  bg-white rounded-md pr-10 py-2 text-left cursor-default sm:text-sm"
//         }
//         onClick={handleClick}
//       >
//         <span className="flex items-center">
//           <span className="ml-3 block truncate">{state.value}</span>
//         </span>
//         <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//           {icon}
//         </span>
//       </button>
//       {state.showOptions && (
//         <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
//           <ul className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//             {options.map((option, idx) => {

//               return   <SelectOption
//                   key={idx}
//                   value={option.label}
//                   active={state.value === option.value}
//                   updateValue={updateValue}
//                 />

//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Label } from "./label";

export const Dropdown = ({
  onClick,
  options = [],
  placeHolder,
}) => {
  console.log("Options in Dropdown", options);
  return (
    <>
      <Label className="mb-2">{placeHolder}</Label>
      <Select>
        <SelectTrigger >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item?.value}
             
              >
                {item?.label}
              </SelectItem>
            );
          })}

          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
