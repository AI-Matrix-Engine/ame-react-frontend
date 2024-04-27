import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Main } from "@/components/home/Main";
import { menuItems } from "@/components/home/Data";
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
