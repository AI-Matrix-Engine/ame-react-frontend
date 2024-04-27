import { PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
export const menuItems = [
  {
    category: "App Name Here",
    items: [
      {
        itemCategory: "AI Prolog",
        icon: <PersonIcon className="h-4 w-4 text-red-400" />,
      },
      {
        itemCategory: "Carry",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
    ],
  },
  {
    category: "Intelligence Engine - From Components",

    items: [
      {
        itemCategory: "AI API",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Create", "Run", "Manage", "Admin", "Login", "Signup"],
      },
      {
        itemCategory: "Chatbot",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Open AI",
          "Google Gemini Pro",
          "AI infinity Matrix",
          "Chatbot Template",
          "Admin",
          "Login"
        ],
      },
      {
        itemCategory: "Workflows",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Start Process(live)",
          "Build",
          "Builder 3",
          "Drag & Drop 1",
          "Tables",
        ],
      },
      {
        itemCategory: "Other Intellegence",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Sub_Item 1", "Sub _Item 2", "Sub_Item 3"],
      },
    ],
  },
  {
    category: "Admin Development",

    items: [
      {
        itemCategory: "OAI App Dev",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Sample Form Element",
          "Sample Tab Content",
          "Run",
          "Manage",
          "Admin",
        ],
      },
    ],
  },
  {
    category: "Static Menu",

    items: [
      {
        itemCategory: "Search Console",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Accordians", "BreadCrumbs", "Cards"],
      },
      {
        itemCategory: "Buttons",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Google Search",
          "ButtonGroups",
          "LoadingButton",
          "Dropdowns",
        ],
      },
      {
        itemCategory: "Keywords Search",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Form Control",
          "Select",
          "MultiSelect",
          "Check & radios",
          "Range",
          "Input group",
          "Floating Labels",
          "Date Picker",
          "Date Range Picker",
          "Time Picker",
          "Layout",
          "Validation",
        ],
      },
      {
        itemCategory: "Content Generator",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Core UI Icons",
          "Core UI Icons Brands",
          "Core UI Icons Flag",
        ],
      },
      {
        itemCategory: "Shopify",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Alert", "Badge", "Modals", "Toasts"],
      },
      {
        itemCategory: "WordPress",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
    ],
  },
  {
    category: "Knowledge",

    items: [
      {
        itemCategory: "Webscrapers",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
      {
        itemCategory: "Crawler",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
      {
        itemCategory: "Website Analyzer",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
      {
        itemCategory: "Google Maps",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
    ],
  },
  {
    category: "Extras",

    items: [
      {
        itemCategory: "Pages",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Login", "Register", "Error 404", "Error 500"],
      },
      {
        itemCategory: "Apps",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [
          "Invoicing",
          "Email",
          //  {subMenuItem:"Invoicing",subMenuItemOptions:["Invoic"]},
          //  {subMenuItem:"Email",subMenuItemOptions:["Inbox","Message","Compose"]}
        ],
      },

      {
        itemCategory: "Actual UI Doc",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
      },
    ],
  },
  {
    category: "Section Title",

    items: [
      {
        itemCategory: "Parent Menu 1",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
      },
      {
        itemCategory: "Parent Menu 2",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
      },
      {
        itemCategory: "Parent Menu 3",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
      },
      {
        itemCategory: "Parent Menu 4",
        icon: <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
      },
    ],
  },
];

export const promptData = [
  // {
  //   role: "system",
  //   text: "I’m going on one of the most amazing trips of life and need you to help me decide on the best places to visit. I’m going to be visiting New York, Colorado and areas around San Francisco and it’s really important that I go to the best spots! Some of my favorite things to do are: Biking, walking, going to dinner and enjoying the city! This is really important for me so please give me the best places I should go!",
  // },
  // {
  //   role: "assistant",
  //   text: "Note to the development team: This is only here to show what would happen if someone clicked “add message” twice",
  // },
  // {
  //   role: "user",
  //   text: "Lorem Ipsum is simply for dummy text of the printing and typesetting in the industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
  // },
  // {
  //   role: "user",
  //   text: "I’m going on one of the most amazing trips of life and need you to help me decide on the best places to visit. I’m going to be visiting New York, Colorado and areas around San Francisco and it’s really important that I go to the best spots! Some of my favorite things to do are: Biking, walking, going to dinner and enjoying the city! This is really important for me so please give me the best places I should go!",
  // }
];
