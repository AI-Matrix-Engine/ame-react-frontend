import { FC, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { GridIcon } from "@radix-ui/react-icons";
import { TfiHeadphoneAlt, TfiHeadphone } from "react-icons/tfi";
import { BiGrid } from "react-icons/bi";
import { VscVmRunning } from "react-icons/vsc";
import { TbMessageChatbot } from "react-icons/tb";
import { LuCodesandbox } from "react-icons/lu";
import {
  MdCreateNewFolder,
  MdManageAccounts,
  MdAdminPanelSettings,
} from "react-icons/md";
import Link from "next/link";

const sidebarStructure = [
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

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ setExpand }) => {
  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const [activeName, setActiveName] = useState("");
  const activeLink = window.location.pathname;

  const listRef = useRef<Record<string, HTMLUListElement | null>>({});

  const [isExpand, setIsExpand] = useState(true);
  const [isExpandOnHover, setIsExpandOnHover] = useState(false);

  const handleHoverExpand = (value: boolean) => {
    // if (!isExpand) {
    //   setIsExpandOnHover(value);
    // }
  };

  const handleNavigate = (path: string) => {
    setActiveName(path);
  };

  const handleToggle = (name: string) => {
    const rootEl = name.split(".")[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: "0px",
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) -
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`,
        },
        [rootEl]: {
          open: true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) +
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    }
  };

  const generateMenu = (item: any, index: number, recursive: number = 0) => {
    if (activeName === "" && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? "active" : "";

    return (
      <li key={index}>
        <Link
          tabIndex={0}
          id={item.id}
          href={item.link}
          onClick={() => {
            if ("child" in item) {
              handleToggle(item.name);
            } else if ("link" in item) {
              handleNavigate(item.name);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Space") {
              if ("child" in item) {
                handleToggle(item.name);
              } else if ("link" in item) {
                handleNavigate(item.name);
              }
            }
          }}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.name || activeName.split(".")[0] === item.name
              ? `text-white font-semibold ${
                  item.parent ? "bg-slate-300/10 " : "bg-transparent"
                }`
              : `text-white/70 ${item.parent && ""}`,
            "hover:bg-slate-300/10 hover:text-white",
            classesActive,
          ].join(" ")}
        >
          <div className="flex items-center gap-6">
            {item.icon ? (
              item.icon === "dot" ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                      "bg-current rounded-full transition duration-200",
                    ].join(" ")}
                  ></div>
                </div>
              ) : (
                <div className="pl-1">{item.icon}</div>
              )
            ) : null}
            <div
              className={`truncate ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              {item.title}
            </div>
          </div>
          {"child" in item ? (
            <div
              className={`rotate-90 ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </Link>

        {"child" in item ? (
          <ul
            // @ts-ignore
            ref={(el) => (listRef.current[item.name] = el)}
            className={[
              "transition-max-height overflow-hidden duration-300 ease-in-out",
              isExpand ? "" : isExpandOnHover ? "" : "h-0",
            ].join(" ")}
            style={{ maxHeight: `${openedMenu[item.name]?.height || "0px"}` }}
            key={item.name}
          >
            {item.child.map((value: any, idx: number) =>
              generateMenu(value, idx, recursive + 1)
            )}
          </ul>
        ) : (
          false
        )}
      </li>
    );
  };

  return (
    <nav
      role="navigation"
      className={[
        "border-r border-slate-100 shadow-sm absolute inset-y-0 left-0",
        "transition-all duration-300 ease-in-out",
        `${
          isExpand
            ? "bg-slate-50 w-72"
            : isExpandOnHover
            ? "bg-slate-50/70 w-72 backdrop-blur-md"
            : "bg-slate-50 w-20"
        }`,
      ].join(" ")}
    >
      {/* Collapse Button */}
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            isExpand ? "rotate-0" : "rotate-180"
          } transform transition duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        onMouseEnter={() => handleHoverExpand(true)}
        onMouseLeave={() => handleHoverExpand(false)}
        className={`relative h-screen overflow-hidden bg-[#252b36] dark:bg-[#18181b]`}
      >
        <SimpleBar style={{ height: "100%" }} autoHide timeout={100}>
          <div className="mb-0 list-none">
            <div className="mt-4 mb-10 p-0 leading-10">
              {isExpand && (
                <h1 className="text-white font-semibold text-lg pl-4 mb-[20px]">
                  Command Center
                </h1>
              )}
              <ul className="list-none text-[12px] px-3">
                {sidebarStructure.map((item, index) => {
                  return (
                    <>
                      {isExpandOnHover ||
                        (isExpand && (
                          <div className="text-[#92959b] pl-2 text-left text-[12px] font-bold">
                            {item.category}
                          </div>
                        ))}
                      {item.items.map((el, idx) => generateMenu(el, idx))}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};

export default Sidebar;
