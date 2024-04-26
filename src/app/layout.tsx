"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Main } from "@/components/Home/Main";
import { useEffect, useState } from "react";
import Router from "next/router";
const inter = Inter({ subsets: ["latin"] });

import Spinner from "@/components/Spinner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);
    const handleError = (error: string) => setError(error);

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", endLoading);
    Router.events.on("routeChangeError", handleError);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", endLoading);
      Router.events.off("routeChangeError", handleError);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f2f5]`}>
        {error ? (
          <div>{error}</div>
        ) : (
          <>
            {loading && <Spinner />}
            <Main>{children}</Main>
          </>
        )}
      </body>
    </html>
  );
}
