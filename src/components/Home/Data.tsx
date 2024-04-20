import { PersonIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface MenuItem {
  itemCategory: string;
  icon: ReactNode;
  route?: string;
  itemSubMenu?: MenuItemSubMenu[];
}

interface MenuItemSubMenu {
  name: string;
  route: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const menuItems: MenuCategory[] = [
  {
    category: "App Name Here",
    items: [
      {
        itemCategory: "Matrix Workbench",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
        route: "/create",
      },
      {
        itemCategory: "Direct AI Caller",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
      },
      {
        itemCategory: "AI Recipe Caller",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
      },
    ],
  },
  {
    category: "Intelligence Engine",

    items: [
      {
        itemCategory: "Matrix Apps",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
        itemSubMenu: [
          { name: "Create", route: "/create" },
          { name: "Run", route: "/run" },
          { name: "Manage", route: "/manage" },
          { name: "Admin", route: "/admin" },
          { name: "Login", route: "/login" },
          { name: "Signup", route: "/signup" },
          { name: "Playground", route: "/playground" },
        ],
      },
    ],
  },
];
