import { PersonIcon, GridIcon } from "@radix-ui/react-icons";
import { TfiHeadphoneAlt, TfiHeadphone } from "react-icons/tfi";
import { BiGrid } from 'react-icons/bi';
import { MdCreateNewFolder, MdManageAccounts, MdAdminPanelSettings, MdOutlineLogin } from "react-icons/md";
import { VscVmRunning } from "react-icons/vsc";
import { IoCreate } from "react-icons/io5";
import { ReactNode } from "react";
import { MenuCategory } from "@/utils/types";
import { TbMessageChatbot } from "react-icons/tb";

export const menuItems: MenuCategory[] = [
  {
    category: "App Name Here",
    items: [
      {
        itemCategory: "Matrix Workbench",
        icon: <GridIcon className="h-4 w-4" />,
        route: "/matrix-workbench"
      },
      {
        itemCategory: "Direct AI Caller",
        icon: <TfiHeadphoneAlt className="h-4 w-4" />,
        route: "/direct-ai-caller"
      },
      {
        itemCategory: "AI Recipe Caller",
        icon: <TfiHeadphone className="h-4 w-4" />,
        route: "/ai-recipe-caller"
      },
      {
        itemCategory: "Chatbot",
        icon: <TbMessageChatbot className="h-4 w-4" />,
        route: "/chatbot"
      }
    ],
  },
  {
    category: "Intelligence Engine",

    items: [
      {
        itemCategory: "Matrix Apps",
        icon: <BiGrid className="h-4 w-4" />,
        route: "/matrix-apps/create",
        itemSubMenu: [{ name: "Create", route: "/matrix-apps/create", icon: <MdCreateNewFolder className="h-4 w-4" />, }, {
          name: "Run", route: "/matrix-apps/run",
          icon: <VscVmRunning className="h-4 w-4" />,
        }, {
          name: "Manage", route: "/matrix-apps/manage",
          icon: <MdManageAccounts className="h-4 w-4" />,
        }, {
          name: "Admin", route: "/matrix-apps/admin",
          icon: <MdAdminPanelSettings className="h-4 w-4" />,
        }],
      },
    ],
  },
];
