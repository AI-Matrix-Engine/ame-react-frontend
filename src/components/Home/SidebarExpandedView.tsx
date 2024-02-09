import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import {
  CaretRightIcon,
  CaretLeftIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import { NavigationBar } from "./NavigationBar";

type SidebarExpandedViewProp = {
  id: string;
  title: string;
  toggle: boolean;
  onHandle: (id: string) => void;
};
export const SidebarExpandedView = ({
  id,
  title,
  toggle,
  onHandle,
}: SidebarExpandedViewProp) => {
  const [opacity, setOpacity] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  const handleMouseEvent = (opacity) => {
    setOpacity(opacity);
  };

  // Check if any of the conditions for showing the previous button is true
  if ((id === "1" && toggle) || (id === "2" && toggle)) {
    setShowPreviousButton(true);
  } else {
    setShowPreviousButton(false);
  }

  return (
    <div className={` `}>
      <div className={`max-h-full   `}>
        {showPreviousButton && (
          <button
            className={`fixed ${id === "1" ? "left-[36%]" : "left-[20%]"} top-[50%] `}
            onClick={() => {
              onHandle(id);
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
        )}
        <div className={` flex justify-between items-center mb-8 mt-8 `}>
          <h5
            className={`${id === "1" ? "text-white" : "text-black"}
            ${opacity && "opacity-50"}
            text-center`}
          >
            {title}
          </h5>
          <button
            className={` ${id === "1" && "bg-[#51555e]"}    ${
              opacity && "opacity-50"
            } rounded-full p-2`}
            onClick={() => {
              onHandle(id);
            }}
          >
            <ArrowsRightLeftIcon
              className={`h-4 w-4 ${
                id === "1" ? "text-white" : "text-black"
              }    ${opacity && "opacity-50"} flex justify-end`}
            />
          </button>
        </div>
        <NavigationBar
          textColor={
            id === "1"
              ? "text-white"
              : `${`text-black  ${opacity && "opacity-50"}`}`
          }
          hoverColor={id === "1" ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
        />
      </div>
    </div>
  );
};
