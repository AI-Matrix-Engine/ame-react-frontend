    "use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/UI/navigation-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/UI/avatar"

export const Header = ()=> {
  return (
    <div className="flex py-1 px-4 bg-[#252b36] items-center justify-center ">
       <h2 className="flex-1 text-2xl text-white font-arimo font-semibold">NoCodeNest</h2>
         
        <div className="flex">
    <NavigationMenu >
      <NavigationMenuList className=" bg-[#252b36] ">
        <NavigationMenuItem >
          <NavigationMenuTrigger className="gap-2 justify-center items-center text-white">
          <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
             <p> Armani Siddiqui</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-3 p-2 w-[200px]  ">
              <li >
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md hover:bg-[#EFF1F4]"
                    href="/"
                  >
                  New Profile 
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
              <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md hover:bg-[#EFF1F4]"
                    href="/"
                  >
                Log Out
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    </div>
  )
}

