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
  { name: "Create", path: "/create" },
  { name: "Run", path: "/run" },
  { name: "Chatbot", path: "/chatbot" },
];

const leftNavItems = [
  { name: "WhatsApp", path: "/create" },
  { name: "Emails", path: "/run" },
  { name: "Clients", path: "/chatbot" },
];

const leftSideBars: leftSideBarType[] = [
  {
    id: "1",
    navItems: mostLeftNavItems,
    expandedStyles: { width: "w-28" },
    collapsedStyles: { width: "w-12" },
    toggle: true,
  },
  {
    id: "2",
    navItems: leftNavItems,
    expandedStyles: { width: "left-[112px] w-28" },
    collapsedStyles: { width: "left-[110px] w-12" },
    toggle: false,
  },
];

export const Main = ({ children }) => {
  const [sideBars, setSideBars] = useState(leftSideBars);
  // const [handleSidebar, setHandleSidebar] = useState<navbar>({
  //   first: true,
  //   second: false,
  // });

  const updateId = () => {
    return (Math.floor(Math.random() * 3) + 2).toString();
  }

  const handleNavigation = (id: string) => {
    // const updatedSideBars = sideBars.map((sideBar) => sideBar.id === id ? ({...sideBar, toggle: !sideBar.toggle, id: updateId()}): ({...sideBar, id: updateId()}))
    const updatedSideBars = sideBars.map((sideBar: leftSideBarType) => {
      if (sideBar.id === id) {
        if ((sideBar.id === "1" && sideBar.toggle)) {
          setSideBars((prev) => {
            prev[1].collapsedStyles.width = "left-[40px] w-12";
            return [...prev];
          });
        }
       
        else {
          setSideBars((prev) => {
            prev[1].collapsedStyles.width = "left-[110px] w-12";
            return [...prev];
          });

        }
        
        return { ...sideBar, toggle: !sideBar.toggle };
      } 
      
      else {
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
            sideBars[0].toggle && sideBars[1].toggle ? "ml-56" : "ml-40"
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
