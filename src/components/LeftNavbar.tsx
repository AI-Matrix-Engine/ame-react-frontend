"use client";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

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

  const { id, navItems, toggle } = details;

  return (
    <div
      className={`bg-[#F8F9FB] text-white   h-screen relative `}
    >

      {toggle ? (
      <>
            <div className="flex justify-around items-center">
        <h5 className="text-[#212B36] text-center ">Title</h5>
        <button onClick={()=>onHandle(id)}>
        <ChevronDoubleRightIcon className="h-4 w-4 text-gray-500 flex justify-end" />
             </button>
      </div>
        <ul className="flex flex-col justify-between items-between">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="flex  text-[#212B36] p-4 hover:bg-[#EFF1F4] cursor-pointer justify-between items-center gap-4"
              >
               <div>  {item.icon}</div>
               <h4 className="text-center flex-1"> {item.name}</h4>
              
              </Link>
            </li>
          ))}
        </ul>
             
      </>
      ) : (
        <div className=" h-full flex  flex-col  items-center  ">
         
         <div>
         <button onClick={()=>onHandle(id)} >
            <ChevronDoubleLeftIcon className="h-4 w-4 text-gray-500 flex justify-end" />
          </button>
          </div>
          <h4 className="text-black rotate-90 absolute top-[60%] ">
            Navigation
          </h4>
        </div>
      )}
     
    </div>
  );
};
