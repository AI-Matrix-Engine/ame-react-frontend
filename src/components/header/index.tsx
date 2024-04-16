"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/UI/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "components/UI/avatar";
import Link from "next/link";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "assets/img/logo.png";

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex py-1 px-4 bg-[#252b36] items-center justify-between h-[64px] font-poppins">
      <Image src={Logo} draggable={false} width={50} height={50} alt='logo' className="cursor-pointer"/>

      <div className="flex">
        {user ? (
          <NavigationMenu>
            <NavigationMenuList className=" bg-[#252b36] ">
              <NavigationMenuItem className="w-full">
                <NavigationMenuTrigger className="gap-2 justify-center items-center text-white border border-red-50 w-full">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{user.displayName}</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col gap-3 px-3 py-2 w-full">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md hover:bg-[#EFF1F4]"
                          href="/"
                        >
                          Profile
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="whitespace-nowrap flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md hover:bg-[#EFF1F4]"
                          onClick={async () => {
                            try {
                              await logout();
                              await router.push("/login");
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          Log out
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link href="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
