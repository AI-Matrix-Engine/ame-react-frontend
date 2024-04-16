// src/register/index.tsx
import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "layouts";
import { useAuth } from "context/AuthContext";
import { toast } from "react-toastify";

const Register: NextPage = () => {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { register, logout } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!cpassword.trim()) {
      newErrors.cpassword = "Confirm password is required";
    } else if (password !== cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(fname, lname, email, password);
        await logout();
        await router.push("/login");
      } catch (error) {
        toast.warn("Already a registered user.");
      }
    }
  }

  return (
    <Layout>
      <main className="p-4 font-poppins">
        <div className="mx-auto mt-10 w-[384px] bg-[#fff] rounded-lg overflow-hidden">
          <h1 className="text-[18px] text-center py-[16px] bg-[#252b36] text-white font-poppins">AIDRM</h1>
          <form
            className="w-[384px] max-w-md mx-auto p-[20px]"
            onSubmit={onSubmit}
          >
            <div className="mb-4">
              <label htmlFor="fname" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#fff]-900 focus-visible:outline-none mt-1"
                name="fname"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              {errors.fname && <div className="text-red-500 text-sm mt-1">{errors.fname}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="lname" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Last Name:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#E4E4E7]-200 focus-visible:outline-none mt-1"
                name="lname"
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              {errors.lname && <div className="text-red-500 text-sm mt-1">{errors.lname}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Email:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#E4E4E7]-200 focus-visible:outline-none mt-1"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Password:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#E4E4E7]-200 focus-visible:outline-none mt-1"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="Cpassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Confirm Password:</label>
              <input
                className="flex h-9 rounded-md border w-full px-3 py-1 border-[#E4E4E7]-200 focus-visible:outline-none mt-1"
                name="Cpassword"
                type="password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              {errors.cpassword && <div className="text-red-500 text-sm mt-1">{errors.cpassword}</div>}
            </div>

            <div className="mb-4">
              <button
                className="w-full py-2 px-6 text-gray-50 mt-3 bg-gray-900 rounded-lg"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Register;