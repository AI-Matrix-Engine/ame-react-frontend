"use client";
import React from "react";
import { NavigationBar } from "./NavigationBar";
import { iSidebarExpandedViewProp } from "@/utils/types";

export const SidebarExpandedView = ({
  id,
  title,
  toggle,
  onExpand,
  opacity,
}: iSidebarExpandedViewProp) => {
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
