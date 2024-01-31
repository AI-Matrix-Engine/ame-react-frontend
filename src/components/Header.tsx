
// 'use client'
// import * as Avatar from '@radix-ui/react-avatar';
// import * as Menubar from '@radix-ui/react-menubar';
// import React from 'react'
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';

// import { CaretDownIcon } from '@radix-ui/react-icons';

// export const  Header = () => {
//   return (
//     <div className="flex py-1 px-4 bg-[#F8F9FB] items-center justify-center ">
//      <h2 className="flex-1 text-2xl text-[#212B36] font-arimo font-semibold">NoCodeNest</h2>
     
//       <div className="flex">

//     <NavigationMenu.Root className="relative z-[1] flex  ">
//       <NavigationMenu.List className="center  m-0 flex list-none rounded-[6px] bg-[#F8F9FB] p-2 border-[1px] border-[#DFE1E4] hover:bg-[#EFF1F4]  ">
//         <NavigationMenu.Item>
//           <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3  group flex select-none items-center justify-between gap-[6px] rounded-[4px]  text-[15px] font-medium leading-none outline-none hover:bg-grey ">
//           <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-[40px] h-[40px] rounded-full bg-black-a3">
//       <Avatar.Image
//        className="w-full h-full object-cover rounded-full"
//         src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
//         alt="Colm Tuite"
//       />
//       <Avatar.Fallback className="AvatarFallback" delayMs={600}>
//         CT
//       </Avatar.Fallback>
//     </Avatar.Root>
//             Armani Siddiqui
//             <CaretDownIcon
//               className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
//               aria-hidden
//             />
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 sm:w-auto">
//             <ul className="one m-0 grid list-none gap-x-[10px]  sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
//               <li className="">
//                 <NavigationMenu.Link asChild>
//                   <a
//                     className="flex
//                      w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[12px] no-underline outline-none "
//                     href="/"
//                   >
//                   New Profile
//                   </a>
//                 </NavigationMenu.Link>
//                 <a
//                     className="flex
//                      w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[12px] no-underline outline-none "
//                     href="/"
//                   >
//                   Log out
//                   </a>
//               </li>

             
//             </ul>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

      

      

//         <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
//           <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
//         </NavigationMenu.Indicator>
//       </NavigationMenu.List>

//       <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
//         <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
//       </div>
//     </NavigationMenu.Root>
    "use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
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
    <div className="flex py-1 px-4 bg-[#F8F9FB] items-center justify-center ">
       <h2 className="flex-1 text-2xl text-[#212B36] font-arimo font-semibold">NoCodeNest</h2>
         
        <div className="flex">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2 justify-center items-center">
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

