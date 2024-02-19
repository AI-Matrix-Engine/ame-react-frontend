"use client";
import React, { useState, ReactNode } from "react";
import { Header } from "./Header";
import { LeftNavbar } from "./LeftNavbar";
import {
  PlusIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { RightNavbar } from "./RightNavbar";
import { SecondSidebarToggleButton } from "./SecondSidebarToggleButton";

type navItem = {
  name: string;
  path: string;
};
type childrenProp = {
  children: ReactNode;
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
    id: 1,
    navItems: mostLeftNavItems,
    expandedStyles: { width: "  w-[300px]" },
    collapsedStyles: {
      width: " overflow-x-hidden overflow-y-scroll  max-h-full w-16",
    },
    toggle: false,
    hover: false,
    title: "Command Center",
  },
  {
    id: 2,
    navItems: leftNavItems,
    expandedStyles: { width: "ml-[302px] w-30" },
    collapsedStyles: { width: "ml-[58px] w-12" },
    toggle: false,
    hover: false,
    title: "Title",
  },
];

export const Main = ({ children }: childrenProp) => {
  const [sideBars, setSideBars] = useState(leftSideBars);

  const onExpand = (id: number) => {
    const updatedSideBars = sideBars.map((sideBar: leftSideBarType) => {
      if (sideBar.id === id) sideBar.toggle = !sideBar.toggle;
      if (sideBar.id === 1) {
        setSideBars((prev) => {
          if (sideBar.toggle) {
            prev[1].expandedStyles.width = "ml-[302px] w-30";
            prev[1].collapsedStyles.width = "ml-[298px] w-12";
          } else {
            prev[1].expandedStyles.width = "ml-[58px] w-30";
            prev[1].collapsedStyles.width = "ml-[58px] w-12";
            prev[0].hover = false;
          }
          return [...prev];
        });
      } else {
        setSideBars((prev) => {
          prev[0].toggle
            ? (prev[1].collapsedStyles.width = "ml-[302px] w-12")
            : (prev[1].collapsedStyles.width = "ml-[58px] w-12");

          return [...prev];
        });
      }
      return sideBar;
    });
    setSideBars(updatedSideBars);
  };
  const handleMouseEvent = (id: number, hover: boolean) => {
    const updatedSideBars = sideBars.map((item) => {
      if (item.id === 1 && id === 1) {
        item.hover = hover;
      }
      return { ...item };
    });
    setSideBars(updatedSideBars);
  };

  const [opacity, setOpacity] = useState(false);
  const handleMouseEventButton = (opacity: boolean) => {
    setOpacity(opacity);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex relative h-full  overflow-x-hidden overflow-y-hidden    ">
        {sideBars.map((sideBar: leftSideBarType) => (
          <div
            id="scrollableDiv"
            onMouseEnter={() => handleMouseEvent(sideBar.id, true)}
            onMouseLeave={() => handleMouseEvent(sideBar.id, false)}
            key={sideBar.id}
            className={`px-8  h-full  pl-4  ${
              sideBar.id === 1
                ? "bg-[#252b36] absolute left-0  z-30"
                : "bg-[#F8F9FB]"
            } ${
              sideBar.toggle || (sideBar.id === 1 && sideBar.hover)
                ? `overflow-y-scroll  ${sideBar.expandedStyles.width}`
                : sideBar.collapsedStyles.width
            } ${sideBar.id === 2 && !sideBar.toggle && "bg-transparent"}`}
          >
            <LeftNavbar
              details={sideBar}
              onExpand={onExpand}
              opacity={opacity}
            />
          </div>
        ))}
        {sideBars[1].toggle && (
          <SecondSidebarToggleButton
            sideBarId={sideBars[1].id}
            onHandle={onExpand}
            handleMouseEvent={(toggle) => handleMouseEventButton(toggle)}
            setOpacity={(value) => setOpacity(value)}
            opacity={opacity}
          />
        )}
        <div className={`flex-1 overflow-y-auto `}>{children}</div>
        <RightNavbar />
      </div>
    </div>
  );
};
