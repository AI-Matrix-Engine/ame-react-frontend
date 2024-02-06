import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import { menuItems } from "./Data";
import Link from "next/link";

export const NavigationBar = ({textColor}) => {
  console.log("Menu Items **", menuItems);
  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index}>
          <h4 className="text-[#92959b] text-left text-xs font-bold">{item.category}</h4>
          <Accordion type="single" collapsible className="w-full border-none border-[1px]">
            {item.items.map((menuItem, subIndex) => (
              <AccordionItem key={subIndex} value={menuItem.itemCategory}>
              { menuItem.itemSubMenu ?  <>
               <AccordionTrigger className={`${textColor}` } iconStyle={textColor}>{menuItem.itemCategory}</AccordionTrigger><AccordionContent className={`${textColor}`}>
                    {menuItem.itemSubMenu.map((subMenu, subMenuIndex) => (
                      <Link key={subMenuIndex} href="#" className="flex mb-4">
                        {subMenu}
                      </Link>
                    ))}
                  </AccordionContent> </> :  <Link key={subIndex} href="#" className={`flex mb-4 ${textColor}`}>
                        {menuItem.itemCategory}
                      </Link>}
               
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};
