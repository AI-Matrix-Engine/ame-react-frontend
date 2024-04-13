import { CaretLeftIcon, DividerVerticalIcon } from '@radix-ui/react-icons'
import React from 'react'
type SecondSidebarToggleButtonProps = {
    handleMouseEvent:(toggle:boolean) => void,
    onHandle:(value:number)=>void,
    sideBarId:number,
    setOpacity:(value:boolean)=>void,
    opacity:boolean
}
export const SecondSidebarToggleButton = ({handleMouseEvent,onHandle,sideBarId,setOpacity,opacity}:SecondSidebarToggleButtonProps) => {
  return (
    <div className="h-full relative ">
    <button
        className={`sticky top-[50%] ml-[-6px]  z-40 `}
        onClick={() => {
          onHandle(sideBarId);
          setOpacity(false)
        }}
        onMouseEnter={() => handleMouseEvent(true)}
        onMouseLeave={() => handleMouseEvent(false)}
      >
        {opacity ? (
          <CaretLeftIcon className="w-[30px] h-[30px] opacity-100" />
        ) : (
          <DividerVerticalIcon className="w-[30px] h-[30px] font-bold text-[#92959b]" />
        )}
      </button>
       </div>
  )
}

