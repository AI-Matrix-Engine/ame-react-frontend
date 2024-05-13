"use client";

// import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Main } from "@/components/home/Main";
import { menuItems } from "@/components/home/Data";
import PrivateRoute from "@/components/privateRoute";
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
        <Main navItems={menuItems}>
          <PrivateRoute>{children}</PrivateRoute>
        </Main>
      </body>
    </html>
  );
}
