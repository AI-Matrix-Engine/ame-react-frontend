"use client";
import { redirect, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      // Redirect to login page if user is not logged in
      if (!user) {
        // router.replace('/login');
        redirect("/login");
      }
    }, [user, router]);

    // If user is logged in, render the wrapped component
    return user ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
