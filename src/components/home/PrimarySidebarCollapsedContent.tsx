import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavigationBar } from "./NavigationBar";
import { iPrimarySidebarCollapsedContentProps } from "@/utils/types";
import { menuItems } from "./Data";

export const PrimarySidebarCollapsedContent = ({
  id,
  onExpand,
}: iPrimarySidebarCollapsedContentProps) => {
  return (
    <div className="max-h-full ">
      <div className={`flex justify-center ml-2 items-center mb-8 mt-8 `}>
        <button
          className={`bg-[#51555e]  rounded-full p-2`}
          onClick={() => {
            onExpand(id);
          }}
        >
          <ArrowsRightLeftIcon
            className={`h-4 w-4 ${id === 1 ? "text-white" : "text-black"
              } flex justify-end`}
          />
        </button>
      </div>
      <div className="flex-1 ">
        <NavigationBar
          navItems={menuItems}
          className="max-h-full"
          text="...."
          textColor={id === 1 ? "text-white" : "text-black"}
          hoverColor={id === 1 ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
        />
      </div>
    </div>
  );
};
