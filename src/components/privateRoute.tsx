// components/PrivateRoute.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(pathname);
    if (pathname == "/login" || pathname == "/signup" || pathname == "/") {
      setLoading(false)
    } else {
      if (!user) {
        setLoading(false)
        router.replace("/login"); // Redirect to login page if not logged in
      }
    }
  }, [pathname]);

  return !loading ? <>{children}</> : null;
};

export default PrivateRoute;
