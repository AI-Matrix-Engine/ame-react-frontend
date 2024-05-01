"use client";

import { Suspense } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NavigationEvents } from "@/components/navigation-events";
import Spinner from "@/components/Spinner";
import { Main } from "@/components/home/Main";
import { menuItems } from "@/components/home/Data";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>AI Matrix Engine</title>
      </Head>
      <body className={`${inter.className} bg-[#f0f2f5]`}>
        <Suspense fallback={<Spinner />}>
          <NavigationEvents />
          {/* <Main>{children}</Main> */}
        </Suspense>
        <Main navItems={menuItems}>{children}</Main>
      </body>
    </html>
  );
}
