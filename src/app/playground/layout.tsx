"use client";
import React from "react";
import { SecondNavbar } from "@/components/layout/SecondNavBar";
import { MenuCategory } from "@/utils/types";
import { GridIcon } from "lucide-react";
import { TfiHeadphone, TfiHeadphoneAlt } from "react-icons/tfi";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const menuItems: MenuCategory[] = [
    {
      category: "App Name Here",
      items: [
        {
          itemCategory: "Playground",
          icon: <TfiHeadphone className="h-4 w-4" />,
          route: "/playground",
        },
        {
          itemCategory: "Direct AI Caller",
          icon: <TfiHeadphoneAlt className="h-4 w-4" />,
          route: "/direct-ai-caller",
        },
        {
          itemCategory: "AI Recipe Caller",
          icon: <TfiHeadphone className="h-4 w-4" />,
          route: "/ai-recipe-caller",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full grow relative">
      <SecondNavbar navItems={menuItems} />
      <main className={`flex-1 flex flex-col transition-margin duration-300`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
