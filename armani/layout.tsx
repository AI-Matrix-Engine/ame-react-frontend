import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Main } from "@/components/Home/Main";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f2f5]`}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
