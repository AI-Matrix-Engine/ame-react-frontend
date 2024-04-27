import React, { useState } from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleChange?: (value: string) => void;
  element?: any;
  minHeight?: any;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ element, handleChange, ...props }, ref) => {
    return (
      <textarea
        className={`dark:bg-[#ffffff0d] flex w-full rounded-md border borer-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none min-h-[50px] dark:border-[#27272a] dark:text-white`}
        ref={ref}
        onChange={(e) => {
          handleChange?.(e?.target?.value);
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
