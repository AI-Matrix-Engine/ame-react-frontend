import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Main } from "@/component/home/Main";
import { menuItems } from "@/component/home/Data";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f2f5]`}>
        <Main navItems={menuItems}>{children}</Main>
      </body>
    </html>
  );
}
