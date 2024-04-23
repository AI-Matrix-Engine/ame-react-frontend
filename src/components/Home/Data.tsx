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
        route: "/matrix-workbench"
      },
      {
        itemCategory: "Direct AI Caller",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
        route: "/direct-ai-caller"
      },
      {
        itemCategory: "AI Recipe Caller",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
        route: "/ai-recipe-caller"
      },
    ],
  },
  {
    category: "Intelligence Engine",

    items: [
      {
        itemCategory: "Matrix Apps",
        icon: <PersonIcon className="h-4 w-4 text-gray-500" />,
        itemSubMenu: [{ name: "Create", route: "/matrix-apps/create" }, { name: "Run", route: "/matrix-apps/run" }, { name: "Manage", route: "/matrix-apps/manage" }, { name: "Admin", route: "/matrix-apps/admin" }, { name: "Login", route: "/login" }, { name: "Signup", route: "/signup" }],
      },
    ],
  },
];
