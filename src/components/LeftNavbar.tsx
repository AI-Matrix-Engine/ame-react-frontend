"use client";
import Link from "next/link";
import { ArrowsRightLeftIcon,ChevronRightIcon } from "@heroicons/react/24/outline";
import { NavigationBar } from "./NavigationBar";




type navItem = {
  name: string;
  path: string;
}
type styleType = {
  width: string;
}
type leftSideBarType = {
  id: string;
  navItems: navItem[];
  expandedStyles: styleType;
  collapsedStyles: styleType;
  toggle: boolean;
}
type LeftNavbarProps = {
  details: leftSideBarType;
  onHandle: (id: string) => void;
}

export const LeftNavbar = ({ details, onHandle, }: LeftNavbarProps) => {

  const { id, navItems, toggle,title } = details;

  return (
   
      toggle ? (
      <>
            <div className="flex justify-between items-center mb-8 mt-8">
        <h5 className={`${id==="1" ? "text-white":"text-black"} text-center`}>{title}</h5>
        <button onClick={()=>onHandle(id)}>
        <ArrowsRightLeftIcon className={`h-4 w-4 ${id==="1" ? "text-white":"text-black"} flex justify-end`} />
             </button>
      </div>
      <NavigationBar textColor={id === "1" ? "text-white" : "text-black" }/>
             
      </>
      ) : (
      
         
               <div className="relative w-full h-full flex justify-center items-center">
                  <button onClick={()=>onHandle(id)} className="absolute top-[50%]  " >
            <ChevronRightIcon className={`h-4 w-4 ${id==="1" ? "text-white" : "text-black"} flex   justify-end`} />
          </button>
                </div>
    
         
       
      )
      
   
  );
};
