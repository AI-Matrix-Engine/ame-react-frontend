"use client";
import React, { useState, useEffect } from "react";
import { NavigationBar } from "../home/NavigationBar";
import { iLeftSidebarExpand, childrenProp, iSecondNavbarProps } from "@/utils/types";
import { TbMinusVertical } from "react-icons/tb";
import { BsChevronCompactRight } from "react-icons/bs";

export const FirstNavBar = ({ navItems }: iSecondNavbarProps) => {
    const [isExpand, setIsExpand] = useState<iLeftSidebarExpand>({
        command: true,
        app: true,
    });

    return (
        <>
            <div className="flex">
                <div
                    className={`bg-[#252b36] relative ${isExpand.command && "w-[300px]"
                        } flex dark:bg-[#18181b] dark:border-r dark:border-r-[#ffffff1a]`}
                >
                    {isExpand.command && (
                        <div className="flex-1 py-[16px] pl-[16px] [transition:all_.3s_ease-in-out]">
                            <h1 className="text-white font-semibold text-xl mb-[10px]">
                                Command Center
                            </h1>
                            <div className="overflow-y-auto pr-[.35rem]">
                                <NavigationBar textColor="text-gray-400" hoverColor="text-gray-500" navItems={navItems} />
                            </div>
                        </div>
                    )}
                    <div className="flex items-center">
                        {isExpand.command ? (
                            <TbMinusVertical
                                className="text-white cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                                onClick={() =>
                                    setIsExpand((prev) => ({
                                        ...prev,
                                        command: !prev.command,
                                    }))
                                }
                            />
                        ) : (
                            <BsChevronCompactRight
                                className="text-white cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                                onClick={() =>
                                    setIsExpand((prev) => ({
                                        ...prev,
                                        command: !prev.command,
                                    }))
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
