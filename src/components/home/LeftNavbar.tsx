"use client";

import { SidebarExpandedView } from "./SidebarExpandedView";
import { PrimarySidebarCollapsedContent } from "./PrimarySidebarCollapsedContent";
import { FaChevronRight } from "react-icons/fa";

import { iLeftNavbarProps } from "@/utils/types";

export const LeftNavbar = ({ details, onExpand, opacity }: iLeftNavbarProps) => {
  const { id, toggle, title, hover } = details;
  if (toggle || (id === 1 && hover)) {
    return (
      <SidebarExpandedView
        id={id}
        title={title}
        onExpand={onExpand}
        toggle={toggle}
        opacity={opacity}
      />
    );
  }

  if (!toggle && id === 1 && !hover) {
    return <PrimarySidebarCollapsedContent id={id} onExpand={onExpand} />;
  }
  
  return (
    <div className="relative h-full flex justify-center items-center">
      <button
        onClick={() => onExpand(id)}
        className={`absolute top-[50%] ${id === 1 && "left-[50%]"}  `}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
