"use client";
import Link from "next/link";
import {
  ArrowsRightLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { NavigationBar } from "./NavigationBar";
import { iLeftNavbarProps } from "@/utils/types";

export const LeftNavbar = ({ details, onHandle }: iLeftNavbarProps) => {
  const { id, toggle, title, hover } = details;

  if (toggle || (id === "1" && hover)) {
    return (
      <div>
        <div>
          <div className={`flex justify-between items-center mb-8 mt-8 `}>
            <h5
              className={`${id === "1" ? "text-white" : "text-black"
                } text-center`}
            >
              {title}
            </h5>
            <button
              className={` ${id === "1" && "bg-[#51555e]"} rounded-full p-2`}
              onClick={() => {
                onHandle(id);
              }}
            >
              <ArrowsRightLeftIcon
                className={`h-4 w-4 ${id === "1" ? "text-white" : "text-black"
                  } flex justify-end`}
              />
            </button>
          </div>
          <NavigationBar
            text={!toggle && id === "1" && !hover && "...."}
            textColor={id === "1" ? "text-white" : "text-black"}
            hoverColor={id === "1" ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
          />
        </div>
      </div>
    );
  }
  if (!toggle && id === "1" && !hover) {
    return (
      <div>
        <div className={`flex justify-center ml-2 items-center mb-8 mt-8 `}>
          <button
            className={`bg-[#51555e]  rounded-full p-2`}
            onClick={() => {
              onHandle(id);
            }}
          >
            <ArrowsRightLeftIcon
              className={`h-4 w-4 ${id === "1" ? "text-white" : "text-black"
                } flex justify-end`}
            />
          </button>
        </div>
        <NavigationBar
          text="...."
          textColor={id === "1" ? "text-white" : "text-black"}
          hoverColor={id === "1" ? "bg-[#454b54]" : "bg-[#EFF1F4]"}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <button onClick={() => onHandle(id)} className="absolute top-[50%]  ">
        <ChevronRightIcon
          className={`h-4 w-4 ${id === "1" ? "text-white" : "text-black"
            } flex   justify-end`}
        />
      </button>
    </div>
  );
};
