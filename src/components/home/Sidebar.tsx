import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { menuItems } from "./Data";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);

  const Menus = menuItems;

  return (
    <div className="flex">
      <div
        className={`bg-[#252b36] h-full p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-4 border border-solid cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        {/* <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-red-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Tailwind
          </h1>
        </div> */}

        <h1
          className={`text-white font-semibold text-base mb-[10px] ${
            !open && "hidden"
          }`}
        >
          Command Center
        </h1>

        {/* <div
          className={`flex items-center rounded-md bg-green-400 mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />
        </div> */}

        <ul className="pt-10">
          {Menus.map((item, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 p-2`}
              >
                {/* <span className="text-2xl block float-left">
                  <RiDashboardFill />
                </span> */}
                <span
                  className={`text-sm font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {item.category}
                </span>
              </li>

              {item.items.length > 0 && (
                <ul>
                  {item.items.map((menu, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm flex justify-between items-center gap-x-4 cursor-pointer py-2 px-5 mb-2 hover-bg-white rounded-md"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          {menu.icon}
                          {menu.itemCategory}
                        </div>

                        {/* @ts-ignore */}
                        {menu?.itemSubMenu?.length > 0 && !subMenuOpen && (
                          <BsChevronDown
                            className=""
                            onClick={() => setSubMenuOpen((prev) => !prev)}
                          />
                        )}

                        {subMenuOpen &&
                          menu.itemSubMenu?.map((subMenuItem, Index) => (
                            <div className="flex items-center gap-3">
                              {subMenuItem.icon}
                              {subMenuItem.name}
                            </div>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
