"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { on } from "stream";
// import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

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

export const LeftNavbar = ({ details, onHandle }: LeftNavbarProps) => {
  const { id, navItems, expandedStyles, collapsedStyles, toggle } = details;
  console.log("id**", id);
  return (
    <div
      className={`bg-[#F8F9FB] text-white   h-screen relative `}
    >
      {toggle ? (
      <>
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="flex  text-[#212B36] p-4 hover:bg-[#EFF1F4] cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
              <button onClick={()=>onHandle(id)} className="absolute  top-[50%] right-0">
              <ChevronDoubleRightIcon className="h-6 w-6 text-gray-500 flex justify-end" />
            </button>
      </>
      ) : (
        <div className="relative h-full flex gap-2 flex-col justify-center items-center  ">
         
          <button onClick={()=>onHandle(id)} className=" flex justify-center items-center absolute top-[50%] ">
            <ChevronDoubleLeftIcon className="h-6 w-6 text-gray-500 flex justify-end" />
          </button>
          <h4 className="text-black rotate-90 absolute top-[60%] ">
            Navigation
          </h4>
        </div>
      )}
     
    </div>
  );
};
