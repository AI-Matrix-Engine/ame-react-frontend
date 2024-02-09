import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { JsonDataType } from "../Home/JsonData.";

type DefaultOnChange = React.ChangeEventHandler<HTMLInputElement>;


type CustomOnChange = (value: string) => void;
type CombinedOnChange = DefaultOnChange | CustomOnChange;
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">  {
  element?: string | JsonDataType  ;
  onChange?: CombinedOnChange  ;
}

const  Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,onChange, type, element, ...props }, ref) => {
    return (
      <>
        {
          <Label htmlFor="email" className="mb-2">
            {typeof element === "object" ?element?.source_params?.options?.placeholder : element}
          </Label>
         }
        <input
        
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className
          )}
          ref={ref}
          {...props}
          placeholder = {typeof element ===  "object" ? element?.source_params?.options?.placeholder : element  } 
          onChange={onChange}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
