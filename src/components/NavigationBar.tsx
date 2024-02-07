import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import { menuItems } from "./Data";
import Link from "next/link";

export const NavigationBar = ({textColor,hoverColor,text=null}) => {
  console.log("Menu Items **", menuItems);
  
  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index}>
          <h4 className="text-[#92959b] text-left text-xs font-bold ">{text? text : item.category}</h4>
          <Accordion type="single" collapsible className="w-full border-none border-[1px]">
            {item.items.map((menuItem, subIndex) => (
              <AccordionItem key={subIndex} value={menuItem.itemCategory}>
              { menuItem.itemSubMenu ?  <>
               <AccordionTrigger className={`${textColor}` } iconStyle={!text && textColor}><div className="flex gap-8"><div>{menuItem.icon}</div>{!text && <h4>{menuItem.itemCategory}</h4>}</div></AccordionTrigger><AccordionContent className={`${textColor}`}>
                    {menuItem.itemSubMenu.map((subMenu, subMenuIndex) => (
                      <Link key={subMenuIndex} href="#" className={`flex mb-4 p-2 hover:rounded-lg hover:${hoverColor}`}>
                        {subMenu}
                      </Link>
                    ))}
                  </AccordionContent> </> : <AccordionTrigger className="flex gap-8" ><div>{menuItem.icon}</div> <Link key={subIndex} href="#" className={` flex-1 text-left ${textColor}`}>
                        {!text && menuItem.itemCategory}
                      </Link>   </AccordionTrigger> }
                   
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};
