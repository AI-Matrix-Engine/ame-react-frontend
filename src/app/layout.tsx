"use client";

// import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NavigationEvents } from "@/components/navigation-events";
import Spinner from "@/components/Spinner";
import { Main } from "@/components/home/Main";
import { menuItems } from "@/components/home/Data";
import PrivateRoute from "@/components/privateRoute";
import { useEffect, useState } from "react";
// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [pathname]);

  return (
    <html lang="en">
      <Head>
        <title>AI Matrix Engine</title>
      </Head>
      <body className={`bg-[#f0f2f5]`}>
        {loading ? (
          <Spinner />
        ) : (
          <Main navItems={menuItems}>
            <PrivateRoute>{children}</PrivateRoute>
          </Main>
        )}
      </body>
    </html>
  );
}
