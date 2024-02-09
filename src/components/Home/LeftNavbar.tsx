"use client";
import {
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  CaretRightIcon,
} from "@radix-ui/react-icons";
import { SidebarExpandedView } from "./SidebarExpandedView";
import { PrimarySidebarCollapsedContent } from "./PrimarySidebarCollapsedContent";
type navItem = {
  name: string;
  path: string;
};
type styleType = {
  width: string;
};
type leftSideBarType = {
  id: string;
  navItems: navItem[];
  expandedStyles: styleType;
  collapsedStyles: styleType;
  toggle: boolean;
  title: string;
  hover: boolean;
};
type LeftNavbarProps = {
  details: leftSideBarType;
  onHandle: (id: string) => void;
};

export const LeftNavbar = ({ details, onHandle }: LeftNavbarProps) => {
  const { id, toggle, title, hover } = details;
  if (toggle || (id === "1" && hover))
   {
    return  <SidebarExpandedView id={id} title={title} onHandle={onHandle} toggle={toggle} />;
   }
   
  if (!toggle && id === "1" && !hover)
   {
    return  <PrimarySidebarCollapsedContent id={id} onHandle={onHandle} />;
   }
  return (
    <div className="relative h-full flex justify-center items-center">
      <button
        onClick={() => onHandle(id)}
        className={`absolute top-[50%] ${id==="1" && "left-[50%]"}  `}
      >
       {id==="1" ?  <ChevronRightIcon
          className={`h-4 w-4 
          text-white 
           flex   justify-end`}
        />: <CaretRightIcon className = "h-6 w-6 text-black"/>}
      </button>
    </div>
  );
};
