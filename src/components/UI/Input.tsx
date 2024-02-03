import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  element: any;
  onChange?: any;
}

const  Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,onChange, type, element = "", ...props }, ref) => {
    return (
      <>
        <Label htmlFor="email" className="mb-2">{element.source_params?.options?.placeholder}</Label>
        <input
        
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className
          )}
          ref={ref}
          {...props}
          placeholder={element.source_params?.options?.placeholder || element}
          onChange={onChange}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
