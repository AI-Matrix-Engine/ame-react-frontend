import {PersonIcon} from "@radix-ui/react-icons";
import {ReactNode} from "react";

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
        category: "Intelligence Engine",
        items: [
            {
                itemCategory: "AI Playground",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Playground", route: "/playground"},
                    {name: "Test Recipe Call", route: ""}, // This page needs to be created - It will allow a quick direct test of a recipe call, without the details of the playground.
                    {name: "Test Direct Call", route: ""}, // This page needs to be created - It will allow a quick AI Call. Just like a chatbot, but nothing fancy.
                ],
            },
            {
                itemCategory: "Agents",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Build Agent", route: ""},
                    {name: "Test Agent", route: ""},
                ],
            },
            {
                itemCategory: "Functions",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Build Functions", route: ""},
                    {name: "Test Functions", route: ""},
                ],
            },
            {
                itemCategory: "APIs",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Build APIs", route: ""},
                    {name: "Test APIs", route: ""},
                ],
            },
            {
                itemCategory: "Workflows",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Build Workflows", route: ""},
                    {name: "Test Workflows", route: ""},
                ],
            },

            {
                itemCategory: "Matrix Apps",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Create", route: "/create"},
                    {name: "Run", route: "/run"},
                    {name: "Manage", route: "/manage"},
                ],
            },

        ],
    },
    {
        category: "Knowledge Base",
        items: [
            {
                itemCategory: "Web Scraper",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Scrape Page", route: ""},
                    {name: "Manage Scrapes", route: ""},
                ],
            },
            {
                itemCategory: "Videos",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Find Videos", route: ""},
                    {name: "Download Videos", route: ""},
                    {name: "Video Content", route: ""},
                ],
            },
            {
                itemCategory: "Something Else",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Page Name Here", route: ""},
                    {name: "Another Page Here", route: ""},
                    {name: "One More Page", route: ""},
                ],
            },
        ],
    },
    {
        category: "Big Category Here",
        items: [
            {
                itemCategory: "App Name Here",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Page Name Here", route: ""},
                    {name: "Another Page Here", route: ""},
                    {name: "One More Page", route: ""},
                ],
            },
        ],
    },
    {
        category: "Big Category Here",
        items: [
            {
                itemCategory: "App Name Here",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Page Name Here", route: ""},
                    {name: "Another Page Here", route: ""},
                    {name: "One More Page", route: ""},
                ],
            },
        ],
    },
    {
        category: "Unknown Category",

        items: [
            {
                itemCategory: "Matrix Apps",
                icon: <PersonIcon className="h-4 w-4 text-gray-500"/>,
                itemSubMenu: [
                    {name: "Admin", route: "/admin"},
                    {name: "Login", route: "/login"},
                    {name: "Signup", route: "/signup"},
                ],
            },
        ],
    },
];
