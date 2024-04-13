import { PersonIcon } from "@radix-ui/react-icons";

export const menuItems = [
  {
    category: "Intellegence Engin",

    items: [
      {
        itemCategory: "AI API",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          { name: "Create", route: "/create" }, 
          { name: "Run", route: "/run" }, 
          { name: "Manage", route: "/manage" }, 
          { name: "Admin", route: "/admin" },
          {name:"Login",route:"/login"},
          {name:"Signup",route:"/signup"}
        ],
      },
    ],
  },
];
