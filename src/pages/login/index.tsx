// src/login/index.tsx
import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "layouts";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";


const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password);
        await router.push("/");
      } catch (error) {
        toast.error("Invalid credential");
      }
    }
  }

  return (
    <Layout>
      <main className="p-4">
        <div className="mx-auto mt-10 w-[384px] bg-[#fff] rounded-lg overflow-hidden">
          <h1 className="text-[18px] text-center py-[16px] bg-[#252b36] text-white">AIDRM</h1>
          <form
            className="w-[384px] max-w-md mx-auto p-[20px]"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#fff]-900 focus-visible:outline-none mt-1"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#fff]-900 focus-visible:outline-none mt-1"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <div className="mb-4">
              <button
                className="w-full py-2 px-6 text-gray-50 bg-gray-900 rounded-lg"
                type="submit"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Need an account?{" "}
              <Link href="/register" className="font-semibold">Register</Link>
            </p>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Login;