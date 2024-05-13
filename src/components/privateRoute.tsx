// components/PrivateRoute.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    if (pathname == "/login" || pathname == "/signup" || pathname == "/") {
    } else {
      if (!user) {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default PrivateRoute;
