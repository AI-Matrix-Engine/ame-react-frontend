"use client";

// import { Suspense } from "react";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import { NavigationEvents } from "@/components/navigation-events";
import "../styles/globals.css";
import { Main } from "@/components/home/Main";
import { menuItems } from "@/components/home/Data";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";
import PrivateRoute from "@/components/privateRoute";
import Spinner from "@/components/Spinner";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>AI Matrix Engine</title>
      </Head>
      <body className={`${inter.className} bg-[#f0f2f5] dark:bg-[#18181b]`}>
        {/* {loading ? (
          <Spinner />
        ) : ( */}
        <AuthProvider>
          <Main navItems={menuItems}>
            {children}
            {/* <PrivateRoute></PrivateRoute> */}
          </Main>
        </AuthProvider>
        {/* )} */}
      </body>
    </html>
  );
}
