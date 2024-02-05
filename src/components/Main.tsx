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
} from "./UI/sheet";
import { FormData } from "./Run/Run";
import {
  PlusIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { PersonIcon,ChatBubbleIcon } from "@radix-ui/react-icons";

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
};

const mostLeftNavItems = [
  {
    name: "Create",
    path: "/create",
    icon: <PlusIcon className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Run",
    path: "/run",
    icon: <PlusIcon className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Chatbot",
    path: "/chatbot",
    icon: <ChatBubbleLeftIcon className="h-4 w-4 text-gray-500" />,
  },
];
const leftNavItems = [
  {
    name: "WhatsApp",
    path: "/create",
    icon: <ChatBubbleIcon className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Emails",
    path: "/run",
    icon: <EnvelopeIcon className="h-4 w-4 text-gray-500" />,
  },
  {
    name: "Clients",
    path: "/chatbot",
    icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
  },
];
const leftSideBars: leftSideBarType[] = [
  {
    id: "1",
    navItems: mostLeftNavItems,
    expandedStyles: { width: "w-30" },
    collapsedStyles: { width: "w-12" },
    toggle: true,
  },
  {
    id: "2",
    navItems: leftNavItems,
    expandedStyles: { width: "left-[120px] w-30" },
    collapsedStyles: { width: "left-[118px] w-12" },
    toggle: false,
  },
];

export const Main = ({ children }) => {

  const [sideBars, setSideBars] = useState(leftSideBars);
 
  const handleNavigation = (id: string) => {
    const updatedSideBars = sideBars.map((sideBar: leftSideBarType) => {
      if (sideBar.id === id) {
        if (sideBar.id === "1" && sideBar.toggle) {
          setSideBars((prev) => {
            if (sideBar.toggle) {
              console.log("Second Toggle is open** ");
              prev[1].expandedStyles.width = "left-[48px] w-30";
            }

            prev[1].collapsedStyles.width = "left-[48px] w-12";
            return [...prev];
          });
        } else if (sideBar.id === "1" && !sideBar.toggle) {
          setSideBars((prev) => {
            if (!sideBar.toggle) {
              prev[1].expandedStyles.width = "left-[120px] w-30";
            }

            prev[1].collapsedStyles.width = "left-[118px] w-12";
            return [...prev];
          });
        } else if (sideBar.id === "2" && sideBar.toggle) {
          setSideBars((prev) => {
            if (sideBar.toggle) {
              console.log("Second Toggle is close*** ");
              if (!prev[0].toggle) {
                prev[1].collapsedStyles.width = "left-[48px] w-12";
              } else {
                prev[1].collapsedStyles.width = "left-[118px] w-12";
              }
            }

            // prev[1].collapsedStyles.width = "left-[110px] w-12";
            return [...prev];
          });
        } else if (sideBar.id === "2" && !sideBar.toggle) {
          setSideBars((prev) => {
            if (!sideBar.toggle) {
              console.log("Second Toggle is close*** ");
              prev[1].collapsedStyles.width = "left-[118px] w-12";
            }

            // prev[1].collapsedStyles.width = "left-[110px] w-12";
            return [...prev];
          });
        } else {
          setSideBars((prev) => {
            prev[1].collapsedStyles.width = "left-[118px] w-12";
            return [...prev];
          });
        }

        return { ...sideBar, toggle: !sideBar.toggle };
      } else {
        return sideBar;
      }
    });
    setSideBars(updatedSideBars);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex relative  ">
        {sideBars.map((sideBar: leftSideBarType) => (
          <div
            key={sideBar.id}
            className={`fixed ${
              sideBar.toggle
                ? sideBar.expandedStyles.width
                : sideBar.collapsedStyles.width
            }`}
          >
            <LeftNavbar details={sideBar} onHandle={handleNavigation} />
          </div>
        ))}
        <div
          className={`flex-1 ${
            sideBars[0].toggle && sideBars[1].toggle
              ? "ml-[264px]"
              : !sideBars[0].toggle && !sideBars[1].toggle
              ? "ml-28"
              : "ml-52"
          }`}
        >
          {children}
          <div>
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

        <div></div>
      </div>
    </div>
  );
};
