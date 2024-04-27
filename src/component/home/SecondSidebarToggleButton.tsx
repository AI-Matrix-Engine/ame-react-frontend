import { CaretLeftIcon, DividerVerticalIcon } from '@radix-ui/react-icons'
import React from 'react'
import { iSecondSidebarToggleButtonProps } from '@/utils/types'

export const SecondSidebarToggleButton = ({handleMouseEvent,onHandle,sideBarId,setOpacity,opacity}:iSecondSidebarToggleButtonProps) => {
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

