import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNavBar from "@/components/ui/BottomNavBar";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Kwuote App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        
        <BottomNavBar />
        </body>
     
    </html>
  );
}
