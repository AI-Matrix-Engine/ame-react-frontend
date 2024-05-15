import { GridIcon } from "@radix-ui/react-icons";
import { TfiHeadphoneAlt, TfiHeadphone } from "react-icons/tfi";
import { BiGrid } from "react-icons/bi";
import {
  MdCreateNewFolder,
  MdManageAccounts,
  MdAdminPanelSettings,
} from "react-icons/md";
import { VscVmRunning } from "react-icons/vsc";
import { MenuCategory } from "@/utils/types";
import { TbMessageChatbot } from "react-icons/tb";
import { LuCodesandbox } from "react-icons/lu";

export const menuItems: MenuCategory[] = [
  {
    category: "AI Matrix Engine",
    items: [
      {
        itemCategory: "Matrix Workbench",
        icon: <GridIcon className="h-4 w-4" />,
        route: "/matrix-workbench",
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
      {
        itemCategory: "Chatbot",
        icon: <TbMessageChatbot className="h-4 w-4" />,
        route: "/chatbot",
      },
      {
        itemCategory: "Sandbox",
        icon: <LuCodesandbox className="h-4 w-4" />,
        route: "/sandbox",
      },
    ],
  },
  {
    category: "Intelligence Engine",
    items: [
      {
        itemCategory: "Matrix Apps",
        icon: <BiGrid className="h-4 w-4" />,
        route: "/matrix-apps/create",
        itemSubMenu: [
          {
            name: "Create",
            route: "/matrix-apps/create",
            icon: <MdCreateNewFolder className="h-4 w-4" />,
          },
          {
            name: "Run",
            route: "/matrix-apps/run",
            icon: <VscVmRunning className="h-4 w-4" />,
          },
          {
            name: "Manage",
            route: "/matrix-apps/manage",
            icon: <MdManageAccounts className="h-4 w-4" />,
          },
          {
            name: "Admin",
            route: "/matrix-apps/admin",
            icon: <MdAdminPanelSettings className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
];

export const sidebarStructure = [
  {
    category: "AI Matrix Engine",
    items: [
      {
        id: "matrix-workbench",
        title: "Matrix Workbench",
        name: "matrix-workbench",
        parent: true,
        icon: <GridIcon className="h-4 w-4" />,
        link: "/matrix-workbench",
      },
      {
        id: "direct-ai-caller",
        title: "Direct AI Caller",
        name: "direct-ai-caller",
        parent: true,
        icon: <TfiHeadphoneAlt className="h-4 w-4" />,
        link: "/direct-ai-caller",
      },
      {
        id: "ai-recipe-caller",
        title: "AI Recipe Caller",
        name: "ai-recipe-caller",
        parent: true,
        icon: <TfiHeadphone className="h-4 w-4" />,
        link: "/ai-recipe-caller",
      },
      {
        id: "chatbot",
        title: "Chatbot",
        name: "chatbot",
        parent: true,
        icon: <TbMessageChatbot className="h-4 w-4" />,
        link: "/chatbot",
      },
      {
        id: "sandbox",
        title: "Sandbox",
        name: "sandbox",
        parent: true,
        icon: <LuCodesandbox className="h-4 w-4" />,
        link: "/sandbox",
      },
    ],
  },
  {
    category: "Intelligence Engine",
    items: [
      {
        id: "Matrix Apps",
        title: "Matrix Apps",
        name: "Matrix Apps",
        parent: true,
        icon: <BiGrid className="h-4 w-4" />,
        link: "/matrix-apps/create",
        child: [
          {
            id: "create",
            title: "Create",
            name: "create",
            link: "/matrix-apps/create",
            icon: <MdCreateNewFolder className="h-4 w-4" />,
          },
          {
            id: "run",
            title: "Run",
            name: "run",
            link: "/matrix-apps/run",
            icon: <VscVmRunning className="h-4 w-4" />,
          },
          {
            id: "manage",
            title: "Manage",
            name: "manage",
            link: "/matrix-apps/manage",
            icon: <MdManageAccounts className="h-4 w-4" />,
          },
          {
            id: "admin",
            title: "Admin",
            name: "admin",
            link: "/matrix-apps/admin",
            icon: <MdAdminPanelSettings className="h-4 w-4" />,
          },
        ],
      },
    ],
  },
];
