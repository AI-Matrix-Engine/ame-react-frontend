import { PersonIcon,ButtonIcon } from "@radix-ui/react-icons";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { MapIcon, MagnifyingGlassIcon,DocumentDuplicateIcon,ChatBubbleBottomCenterIcon ,Bars3Icon   } from "@heroicons/react/24/outline";
import { faWordpress, faFontAwesome, faShopify, } from '@fortawesome/free-brands-svg-icons'

export const menuItems = [
  // {
  //   category: "App Name Here",
  //   items: [
  //     {
  //       itemCategory: "AI Prolog",
  //       icon:   <PersonIcon className="h-4 w-4 text-white" />,
  //     },
  //     {
  //       itemCategory: "Carry",
  //       icon:   <PersonIcon className="h-4 w-4 text-white" />
  //       ,
  //     },
  //   ],
  // },
  {
    category: "Intellegence Engin",

    items: [
      {
        itemCategory: "AI API",
        icon:  <PersonIcon className="h-4 w-4 text-white" />,
        itemSubMenu: [{ name: "Create", route: "/create" }, { name: "Run", route: "/run"}, { name: "Manage", route: "/manage" }, { name: "Admin", route: "/admin" }],
      },
      // {
      //   itemCategory: "Chatbot",
      //   icon: <ChatBubbleBottomCenterIcon className="h-4 w-4 text-white" />,
      //   itemSubMenu: [
      //     "Open AI",
      //     "Google Gemini Pro",
      //     "AI infinity Matrix",
      //     "Chatbot Template",
      //     "Admin",
      //   ],
      // },
      // {
      //   itemCategory: "Workflows",
      //   icon: <PersonIcon className="h-4 w-4 text-white" />,
      //   itemSubMenu: [
      //     "Start Process(live)",
      //     "Build",
      //     "Builder 3",
      //     "Drag & Drop 1",
      //     "Tables",
      //   ],
      // },
      // {
      //   itemCategory: "Other Intellegence",
      //   icon: <PersonIcon className="h-4 w-4 text-white" />,
      //   itemSubMenu: ["Sub_Item 1", "Sub _Item 2", "Sub_Item 3"],
      // },
    ],
  },
  // {
  //   category: "Admin Development",

  //   items: [
  //     {
  //       itemCategory: "OAI App Dev",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: [
  //         "Sample Form Element",
  //         "Sample Tab Content",
  //         "Run",
  //         "Manage",
  //         "Admin",
  //       ],
  //     },
  //   ],
  // },
  // {
  //   category: "Static Menu",

  //   items: [
  //     {
  //       itemCategory: "Search Console",
  //       icon: <MagnifyingGlassIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Accordians", "BreadCrumbs", "Cards"],
  //     },
  //     {
  //       itemCategory: "Buttons",
  //       icon: <ButtonIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: [
  //         "Google Search",
  //         "ButtonGroups",
  //         "LoadingButton",
  //         "Dropdowns",
  //       ],
  //     },
  //     {
  //       itemCategory: "Keywords Search",
  //       icon: <MagnifyingGlassIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: [
  //         "Form Control",
  //         "Select",
  //         "MultiSelect",
  //         "Check & radios",
  //         "Range",
  //         "Input group",
  //         "Floating Labels",
  //         "Date Picker",
  //         "Date Range Picker",
  //         "Time Picker",
  //         "Layout",
  //         "Validation",
  //       ],
  //     },
  //     {
  //       itemCategory: "Content Generator",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: [
  //         "Core UI Icons",
  //         "Core UI Icons Brands",
  //         "Core UI Icons Flag",
  //       ],
  //     },
  //     {
  //       itemCategory: "Shopify",
  //      icon: <FontAwesomeIcon icon={faShopify} className="text-white h-4 w-4" />,
  //       itemSubMenu: ["Alert", "Badge", "Modals", "Toasts"],
  //     },
  //     {
  //       itemCategory: "WordPress",
  //       icon: <FontAwesomeIcon icon={faWordpress} className="text-white h-4 w-4" />,
  //     },
  //   ],
  // },
  // {
  //   category: "Knowledge",

  //   items: [
  //     {
  //       itemCategory: "Webscrapers",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //     },
  //     {
  //       itemCategory: "Crawler",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //     },
  //     {
  //       itemCategory: "Website Analyzer",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //     },
  //     {
  //       itemCategory: "Google Maps",
  //       icon: <MapIcon className="h-4 w-4 text-white" />,
  //     },
  //   ],
  // },
  // {
  //   category: "Extras",

  //   items: [
  //     {
  //       itemCategory: "Pages",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Login", "Register", "Error 404", "Error 500"],
  //     },
  //     {
  //       itemCategory: "Apps",
  //       icon: <PersonIcon className="h-4 w-4 text-white" />,
  //       itemSubMenu: [
  //         "Invoicing",
  //         "Email",
  //       ],
  //     },

  //     {
  //       itemCategory: "Actual UI Doc",
  //       icon: <DocumentDuplicateIcon  className="h-4 w-4 text-white" />,
  //     },
  //   ],
  // },
  // {
  //   category: "Section Title",

  //   items: [
  //     {
  //       itemCategory: "Parent Menu 1",
  //       icon: <Bars3Icon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
  //     },
  //     {
  //       itemCategory: "Parent Menu 2",
  //       icon: <Bars3Icon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
  //     },
  //     {
  //       itemCategory: "Parent Menu 3",
  //       icon: <Bars3Icon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
  //     },
  //     {
  //       itemCategory: "Parent Menu 4",
  //       icon: <Bars3Icon className="h-4 w-4 text-white" />,
  //       itemSubMenu: ["Sub-item 1", "Sub-item 2", "Sub-item 3"],
  //     },
  //   ],
  // },
];
