import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/_shared/Accordion";
import { menuItems } from "../Data";
import Link from "next/link";

export const NavigationBar = ({ textColor, hoverColor, text = null }: any) => {
  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index}>
          <h4 className="text-[#92959b] text-left text-xs font-bold ">
            {text ? text : item.category}
          </h4>
          <Accordion
            type="single"
            collapsible
            className="w-full border-none border-[1px]"
          >
          </Accordion>
        </div>
      ))}
    </div>
  );
};
