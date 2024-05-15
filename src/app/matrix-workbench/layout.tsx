"use client";

import React from "react";
import { SecondNavbar } from "@/components/layout/SecondNavBar";
import { MenuCategory } from "@/utils/types";
import { TfiHeadphone, TfiHeadphoneAlt } from "react-icons/tfi";
import withAuth from "@/components/withAuth";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const menuItems: MenuCategory[] = [
    {
      category: "Matrix Workbench",
      items: [
        {
          itemCategory: "Playground",
          icon: <TfiHeadphone className="h-4 w-4" />,
          route: "/matrix-workbench/playground",
        },
        {
          itemCategory: "Direct AI Caller",
          icon: <TfiHeadphoneAlt className="h-4 w-4" />,
          route: "/matrix-workbench/direct-ai-caller",
        },
        {
          itemCategory: "AI Recipe Caller",
          icon: <TfiHeadphone className="h-4 w-4" />,
          route: "/matrix-workbench/ai-recipe-caller",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full grow relative bg-[#f0f2f5] dark:bg-[#18181b]">
      <SecondNavbar navItems={menuItems} />
      <main className={`flex-1 flex flex-col transition-margin duration-300`}>
        {children}
      </main>
    </div>
  );
};

export default withAuth(Layout);
