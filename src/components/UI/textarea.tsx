import  React,{useState} from "react"

import { cn } from "@/lib/utils"


export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    handleChange:(value:string)=>void,
    element:any
    minHeight:any
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ element,handleChange, ...props }, ref) => {
    const [text,setText] = useState("")

    return (
          <textarea
       className={`flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none min-h-[120px]`}
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
