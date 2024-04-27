import React, { useState } from "react"

import { cn } from "@/lib/utils"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleChange?: (value: string) => void,
  element?: any
  minHeight?: any
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ element, handleChange, ...props }, ref) => {
    return (
        <textarea
            className="flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 min-h-[120px] outline-none hover:outline hover:outline-gray-300 focus:outline focus:outline-gray-800 focus:ring focus:ring-gray-800 focus:ring-opacity-50"
            ref={ref}
            onChange={(e) => {
                handleChange?.(e?.target?.value)
            }}
            {...props}
        />
    )
  }
)
Textarea.displayName = "Textarea"

export {Textarea}
