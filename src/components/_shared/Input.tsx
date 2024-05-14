import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./Label";
import { iInputProps } from "@/utils/types";

const Input = React.forwardRef<HTMLInputElement, iInputProps>(
  ({ className, onChange, type, element, placeholder, ...props }, ref) => {
    return (
      <>
        {
          <Label htmlFor="email" className="mb-2">
            {typeof element === "object"
              ? element?.source_params?.options?.placeholder
              : element}
          </Label>
        }
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:text-[#fafafa] dark:bg-[#ffffff0d] dark:border-[#ffffff1a] hover:bg-white/75 dark:hover:bg-zinc-800/75 focus:bg-white/75 dark:focus:bg-zinc-800/75 focus:outline-none",
            className
          )}
          ref={ref}
          {...props}
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
