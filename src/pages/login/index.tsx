// src/login/index.tsx
import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "layouts";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { SiApple } from "react-icons/si";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import Modal from "react-modal";

// firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (typeof window !== "undefined") {
  Modal.setAppElement("#__next");
}

const Login: NextPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [isSentCode, setIsSentCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [code, setCode] = useState<string>("");
  // const [verificationId, setVerificationId] = useState<string | null>(null);

  const [phoneModalIsOpen, setPhoneIsOpen] = useState<boolean>(false);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(email, password);
        await router.push("/");
      } catch (error) {
        toast.error("Invalid credential");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      await router.push("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      await router.push("/");
    } catch (error) {
      console.error("Facebook sign-in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      await router.push("/");
    } catch (error) {
      console.error("Apple sign-in error:", error);
    }
  };

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved - allow signInWithPhoneNumber.
          handlePhoneSignIn(response);
        },
      });
      window.recaptchaVerifier.render();
    }
  };

  const handlePhoneSignIn = (number: string): void => {
    setUpRecaptcha();
    const phoneNumberWithCode = number;
    if (window.recaptchaVerifier) {
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumberWithCode, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // setVerificationId(confirmationResult.verificationId);
          setIsSentCode(true);
        })
        .catch((error) => {
          console.error("SMS not sent", error);
        });
    }
  };

  const onSubmitCode = (code: string) => {
    if (window.confirmationResult) {
      const credential = window.confirmationResult.confirm(code);
      credential
        .then(async (result) => {
          const user = result.user;
          console.log("User is signed in", user);
          await router.push('/');
          await setIsSentCode(false);
          await setPhoneIsOpen(false);
          await setPhoneNumber('');
          await setCode('');
        })
        .catch((error) => {
          console.error("Code not valid", error);
        });
    }
  };

  return (
    <Layout>
      <main className="p-4 font-poppins">
        <div className="mx-auto mt-10 w-[384px] bg-[#fff] rounded-lg overflow-hidden">
          <h1 className="text-[18px] text-center py-[16px] bg-[#252b36] text-white">AIDRM</h1>
          <form className="w-[384px] max-w-md mx-auto p-[20px]" onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email:
              </label>
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
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password:
              </label>
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
              <button className="w-full py-2 px-6 text-gray-50 bg-gray-900 rounded-lg" type="submit">
                Login
              </button>
            </div>
            <div className="relative border-t border-[#F3F3F3]-200 mb-6 mt-10 flex justify-center">
              <p className="bg-white absolute w-[26px] h-[26px] rounded-full border border-[#F3F3F3]-200 flex justify-center items-center -top-[13px] text-xs">
                or
              </p>
            </div>
            <div className="grid grid-cols-[1fr_1fr] rounded-lg">
              <div
                className="text-white flex flex-1 justify-center items-center cursor-pointer text-base bg-[#349933] p-2 mr-[2px] mb-1"
                onClick={() => handleGoogleSignIn()}
              >
                Google <FaGoogle className="ml-2" />
              </div>
              <div
                className="text-white flex flex-1 justify-center items-center cursor-pointer text-base bg-[#3F3BA4] p-2 ml-[2px] mb-1"
                onClick={() => handleFacebookSignIn()}
              >
                Facebook <FaFacebookF className="ml-2" />
              </div>
              <div
                className="text-white flex flex-1 justify-center items-center cursor-pointer text-base bg-[#64CCF1] p-2 mr-[2px]"
                onClick={() => handleAppleSignIn()}
              >
                Apple <SiApple className="ml-2 text-xl" />
              </div>
              <div
                className="text-white flex flex-1 justify-center items-center cursor-pointer text-base bg-[#3B5998] p-2 ml-[2px]"
                onClick={() => setPhoneIsOpen(true)}
              >
                Phone <MdOutlinePhoneAndroid className="ml-2 text-xl" />
              </div>
            </div>
            <p className="text-center mt-4 text-sm text-[#f3f3f3]-400">
              Need an account?{" "}
              <Link href="/register" className="font-semibold">
                Register
              </Link>
            </p>
            <button id="sign-in-button" type="submit" style={{ display: "none" }}>
              Verify Phone Number
            </button>

            <Modal
              isOpen={phoneModalIsOpen}
              style={customStyles}
              onRequestClose={() => setPhoneIsOpen(false)}
              contentLabel="Phone verify"
            >
              <div className="flex flex-col items-center">
                <h2 className="font-extrabold text-xl mb-10">Phone Verify</h2>
                {isSentCode ? (
                  <input type="number" className="text-center flex h-9 rounded-md border w-full px-3 py-1 border-[#fff]-900 focus-visible:outline-none mt-1" autoFocus value={code} onChange={(e) => setCode(e.target.value)} />
                ) : (
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e: string) => setPhoneNumber(e)}
                  />
                )}
                <button
                  className="p-2 rounded-md bg-[#2DA44E] text-white mt-7 w-full [transition:all_.3s_ease-in-out] hover:[box-shadow:rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  onClick={() => {
                    if(isSentCode) {
                      onSubmitCode(code);
                    } else {
                      handlePhoneSignIn(phoneNumber);
                    }
                  }}
                >
                  {isSentCode ? "Verify" : "Send code"}
                </button>
              </div>
            </Modal>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Login;
