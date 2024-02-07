"use client";
import React, { useState } from "react";
import { Header } from "./Header";
import { LeftNavbar } from "./LeftNavbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/sheet";
import { FormData } from "./Run/Run";
import {
  PlusIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { RightNavbar } from "./RightNavbar";

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
  hover: boolean;
  title: string;
};

const mostLeftNavItems = [
  {
    name: "Create",
    path: "/create",
    icon: <PlusIcon className="h-4 w-4 text-white" />,
  },
  {
    name: "Run",
    path: "/run",
    icon: <PlusIcon className="h-4 w-4 text-white" />,
  },
  {
    name: "Chatbot",
    path: "/chatbot",
    icon: <ChatBubbleLeftIcon className="h-4 w-4 text-white" />,
  },
];
const leftNavItems = [
  {
    name: "WhatsApp",
    path: "/create",
    icon: <ChatBubbleIcon className="h-4 w-4 text-black" />,
  },
  {
    name: "Emails",
    path: "/run",
    icon: <EnvelopeIcon className="h-4 w-4 text-black" />,
  },
  {
    name: "Clients",
    path: "/chatbot",
    icon: <PersonIcon className="h-4 w-4 text-black" />,
  },
];
const leftSideBars: leftSideBarType[] = [
  {
    id: "1",
    navItems: mostLeftNavItems,
    expandedStyles: { width: "  w-[300px]" },
    collapsedStyles: { width: " w-12" },
    toggle: false,
    hover: false,
    title: "Command Center",
  },
  {
    id: "2",
    navItems: leftNavItems,
    expandedStyles: { width: "ml-[302px] w-30" },
    collapsedStyles: { width: "ml-[48px] w-12" },
    toggle: false,
    hover: false,
    title: "Title",
  },
];

export const Main = ({ children }) => {
  const [sideBars, setSideBars] = useState(leftSideBars);

  const handleNavigation = (id: string) => {
    const updatedSideBars = sideBars.map((sideBar: leftSideBarType) => {
      if (sideBar.id === id) sideBar.toggle = !sideBar.toggle;
      if (sideBar.id === "1") {
        setSideBars((prev) => {
          if (sideBar.toggle) {
            prev[1].expandedStyles.width = "ml-[302px] w-30";
            prev[1].collapsedStyles.width = "ml-[298px] w-12";
          } else {
            prev[1].expandedStyles.width = "ml-[48px] w-30";
            prev[1].collapsedStyles.width = "ml-[48px] w-12";
            prev[0].hover = false;
          }
          return [...prev];
        });
      } else {
        setSideBars((prev) => {
          prev[0].toggle
            ? (prev[1].collapsedStyles.width = "ml-[302px] w-12")
            : (prev[1].collapsedStyles.width = "ml-[48px] w-12");

          return [...prev];
        });
      }
      return sideBar;
    });
    setSideBars(updatedSideBars);
  };
  const handleMouseEvent = (id: string, hover: boolean) => {
    const updatedSideBars = sideBars.map((item) => {
      if (item.id === "1" && id === "1") {
        console.log("Id", item);
        item.hover = hover;
      }
      return { ...item };
    });
    setSideBars(updatedSideBars);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex relative h-full ">
        {sideBars.map((sideBar: leftSideBarType) => (
          <div
            onMouseEnter={() => handleMouseEvent(sideBar.id, true)}
            onMouseLeave={() => handleMouseEvent(sideBar.id, false)}
            key={sideBar.id}
            className={`px-8 h-full  pl-4  ${
              sideBar.id === "1"
                ? "bg-[#252b36] absolute left-0 "
                : "bg-[#f9f9f9]"
            } ${
              sideBar.toggle || (sideBar.id === "1" && sideBar.hover)
                ? `max-h-full overflow-y-scroll ${sideBar.expandedStyles.width}`
                : sideBar.collapsedStyles.width
            }`}
          >
            <LeftNavbar details={sideBar} onHandle={handleNavigation} />
          </div>
        ))}
        <div className={`flex-1 `}>
          {children}
          <div className="p-4">
            <h4 className="text-sky-400 text-center">Drawer</h4>
            <Sheet>
              <SheetTrigger className="border-2  border-zinc-200 rounded-md px-4 py-2">
                Open
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>

                <SheetTitle className="text-center">Form</SheetTitle>
                <SheetDescription>
                  <FormData additionalClasses={"space-y-4"} />
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <RightNavbar />
      </div>
    </div>
  );
};
