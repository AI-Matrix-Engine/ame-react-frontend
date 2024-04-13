"use client";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import {
  CaretRightIcon,
  CaretLeftIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import { NavigationBar } from "./NavigationBar";

type SidebarExpandedViewProp = {
  id: number;
  title: string;
  toggle: boolean;
  onExpand: (id: number) => void;
  opacity: boolean;
};
export const SidebarExpandedView = ({
  id,
  title,
  toggle,
  onExpand,
  opacity,
}: SidebarExpandedViewProp) => {
  return (
    <div>
      <div className={`max-h-full  `}>
        <div
          className={` flex justify-between items-center 
          mb-8 mt-8
           `}
        >
          <h5
            className={`${id === 1 ? "text-white" : "text-black"}
            ${id===2 && opacity && "opacity-50"}
            text-center`}
          >
            {title}
          </h5>
          <button
            className={` ${id === 1 && "bg-[#51555e]"}    ${
             id ===2 &&  opacity && "opacity-50"
            } rounded-full p-2`}
            onClick={() => {
              onExpand(id);
            }}
          >
            <ArrowsRightLeftIcon
              className={`h-4 w-4 ${
                id === 1 ? "text-white" : "text-black"
              }    ${id===2 && opacity && "opacity-50"} flex justify-end`}
            />
          </button>
        </div>
        <NavigationBar
          textColor={
            id === 1
              ? "text-white"
              : `${`text-black  ${opacity && "opacity-50"}`}`
          }
          hoverColor={id === 1 ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
          opacity={`${id===2 && opacity && "opacity-50"}`}
        />
      </div>
    </div>
  );
};
