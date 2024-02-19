import  React,{useState} from "react"

import { cn } from "@/lib/utils"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    handleChange:(value:string)=>void,
    element:any
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className,element,handleChange, ...props }, ref) => {
    const [text,setText] = useState("")

    return (
          <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none ",
          className
        )}
        ref={ref}
        
        value={text}
        onChange={(e)=>{setText(e.target?.value);handleChange(e?.target?.value)}}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
