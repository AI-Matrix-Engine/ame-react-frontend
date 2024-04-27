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
            "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
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
