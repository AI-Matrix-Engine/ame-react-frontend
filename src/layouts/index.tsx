import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Main } from "components/main";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-[#F0F2F5] min-h-[100vh]">
      <Main>{children}</Main>
      <ToastContainer autoClose={2000}/>
    </div>
  );
};