import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import ClerkWrapper from "@/provider/clerkPorvider";
import ToasterProvider from "@/provider/toasterProvider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFIleRouter } from "./api/uploadthing/core";
import { ConfettiProvider } from "@/provider/confettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn.ing | Upgrade you're skills with us",
  icons: "/icon.svg",
  description:
    "Learn.ing is platform to buy and sell course for learn or upgrade new skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFIleRouter)} />
        <ClerkWrapper>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </ClerkWrapper>
      </body>
    </html>
  );
}
