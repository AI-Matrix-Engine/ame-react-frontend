"use client";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { SidebarExpandedView } from "../SidebarExpandedView";
import { PrimarySidebarCollapsedContent } from "../PrimarySidebarCollapsedContent";

type navItem = {
  name: string;
  path: string;
};

type styleType = {
  width: string;
};

type leftSideBarType = {
  id: number;
  navItems: navItem[];
  expandedStyles: styleType;
  collapsedStyles: styleType;
  toggle: boolean;
  title: string;
  hover: boolean;
};

type LeftNavbarProps = {
  details: leftSideBarType;
  onExpand: (id: number) => void;
  opacity: boolean;
};

export const LeftNavbar = ({ details, onExpand, opacity }: LeftNavbarProps) => {
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
        <CaretRightIcon className="h-6 w-6 text-black" />
      </button>
    </div>
  );
};
