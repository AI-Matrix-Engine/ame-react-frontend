import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/_shared/Accordion";
import Link from "next/link";
import { iNavigationBar } from "@/utils/types";
import { useAuth } from "@/context/AuthContext";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/_shared/Avatar";

export const NavigationBar = ({
  navItems,
  textColor,
  hoverColor,
  text = null,
  opacity,
}: iNavigationBar) => {
  const [active, setActive] = useState("");
  const { user } = useAuth();
  return (
    <div className="far-sidebar-height flex flex-col justify-between">
      <div>
        {navItems.map((item, index) => (
          <div key={index}>
            <h4
              className={`${opacity} text-[#92959b] pl-2  text-left text-xs font-bold mt-[15px]`}
            >
              {text ? text : item.category}
            </h4>
            <Accordion
              type="single"
              collapsible
              className="w-full border-none border-[1px]"
            >
              {item.items.map((menuItem, subIndex) => (
                <AccordionItem key={subIndex} value={menuItem.itemCategory}>
                  {menuItem.itemSubMenu ? (
                    <>
                      <AccordionTrigger
                        className={`${
                          active === "/matrix-apps"
                            ? `bg-gray-800 text-white`
                            : `text-gray-400 hover:bg-gray-800 hover:text-white`
                        } rounded-lg my-2`}
                        iconStyle={!text && textColor}
                      >
                        <div className="flex gap-8 ">
                          <div className="pl-2">{menuItem.icon}</div>
                          <Link
                            key={subIndex}
                            href="/matrix-apps"
                            onClick={() => {
                              setActive("/matrix-apps");
                            }}
                            className={`flex-1 text-left`}
                          >
                            {!text && menuItem.itemCategory}
                          </Link>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className={`${textColor}`}>
                        {menuItem.itemSubMenu.map(
                          ({ name, route, icon }, subMenuIndex) => (
                            <div
                              className={`flex m-2 ${
                                active === route
                                  ? `bg-gray-800 text-white rounded-lg`
                                  : `text-gray-400 hover:bg-gray-800 hover:text-white`
                              } rounded-lg hover:rounded-lg`}
                            >
                              <div className="ml-4 py-4">{icon}</div>
                              <Link
                                key={subMenuIndex}
                                href={route}
                                onClick={() => {
                                  setActive(route);
                                }}
                                className={`flex p-4`}
                              >
                                {name}
                              </Link>
                            </div>
                          )
                        )}
                      </AccordionContent>{" "}
                    </>
                  ) : (
                    <AccordionTrigger
                      className={`flex gap-8 my-1 ${
                        active === menuItem.route
                          ? `bg-gray-800 text-white`
                          : `text-gray-400 hover:bg-gray-800 hover:text-white`
                      }  rounded-lg`}
                    >
                      <div className="pl-2">{menuItem.icon}</div>
                      <Link
                        key={subIndex}
                        href={menuItem.route || "#"}
                        onClick={() => {
                          setActive(menuItem.route || "#");
                        }}
                        className={`flex-1 text-left`}
                      >
                        {!text && menuItem.itemCategory}
                      </Link>
                    </AccordionTrigger>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
      {user && (
        <div className="mt-4">
          <Link
            href="/profile"
            onClick={() => {
              setActive("/profile");
            }}
            className={`flex items-center gap-x-4 pl-2 py-3 text-sm font-semibold leading-6 ${
              active === "/pr0file"
                ? `bg-gray-800 text-white`
                : `text-gray-400 hover:bg-gray-800 hover:text-white`
            } rounded-lg`}
          >
            <Avatar>
              <AvatarImage src={(user && user?.photoURL) || ""} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Your profile</span>
            <span aria-hidden="true">{user && user.displayName}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
