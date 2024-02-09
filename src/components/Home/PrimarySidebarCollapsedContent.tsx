import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { NavigationBar } from './NavigationBar';


type PrimarySidebarCollapsedContentProps = {
    id:string,
    onHandle:(id:string)=>void
}
export const PrimarySidebarCollapsedContent = ({id,onHandle}: PrimarySidebarCollapsedContentProps) => {
  return (
    <div className="max-h-full "  >
  <div className={`flex justify-center ml-2 items-center mb-8 mt-8 `}>
   
    <button
    className={`bg-[#51555e]  rounded-full p-2`}
      onClick={() => {
        onHandle(id);
      }}

    >
      <ArrowsRightLeftIcon
        className={`h-4 w-4 ${
          id === "1" ? "text-white" : "text-black"
        } flex justify-end`}
      />
    </button>
  </div>
   <div className="flex-1 ">
   <NavigationBar
    className="max-h-full"
    text =  "...."
    textColor={id === "1" ? "text-white" : "text-black"}
    hoverColor={id === "1" ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
  />
   </div>
</div>
  )
}

