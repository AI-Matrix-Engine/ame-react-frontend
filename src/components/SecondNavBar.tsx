"use client";
import { iSecondNavbarProps, iLeftSidebarExpand } from "@/utils/types";
import React, { useState } from "react";
import { NavigationBar } from "@/components/home/NavigationBar";
import { usePathname } from "next/navigation";
import { TbMinusVertical } from "react-icons/tb";
import { BsChevronCompactRight } from "react-icons/bs";

export const SecondNavbar = ({ navItems }: iSecondNavbarProps) => {
    const currentUrl = usePathname();
    const [isExpand, setIsExpand] = useState<iLeftSidebarExpand>({
        command: true,
        app: true,
    });

    return (
        <>
            <div className={`bg-[#F8F9FB] flex`}>
                {isExpand.app && (
                    <div className="flex-1 py-[16px] pl-[16px]">
                        <h1 className="text-black font-semibold text-lg mb-[20px]">
                            {(navItems[0].items.find((item) => item.route === currentUrl)?.itemCategory || "Matrix Apps") + ' Controls'}
                        </h1>
                        <NavigationBar textColor="text-gray-400" hoverColor="text-gray-500" navItems={navItems} />
                    </div>
                )}
                <div className="flex items-center px-2">
                    {isExpand.app ? (
                        <TbMinusVertical
                            className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                            onClick={() =>
                                setIsExpand((prev) => ({
                                    ...prev,
                                    app: !prev.app,
                                }))
                            }
                        />
                    ) : (
                        <BsChevronCompactRight
                            className="text-gray-500 cursor-pointer [transition:all_.3s_ease-in-out] hover:scale-150"
                            onClick={() =>
                                setIsExpand((prev) => ({
                                    ...prev,
                                    app: !prev.app,
                                }))
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
};


