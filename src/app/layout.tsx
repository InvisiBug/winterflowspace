import StyledComponentsRegistry from "../lib/registry";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalStyles } from "@/lib/ui";
import { Inter, Roboto } from "next/font/google";

// TODO (Fix): Fix fonts [🌀-1]
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto({ subsets: ["latin"], weight: "400", variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Winter Flow Space",
  description: "A little timetable app that shows the times the studio is free in a Pure gym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={inter.className}>
        <GlobalStyles />
        <body>
          {/* <StyledComponentsRegistry>{children}</StyledComponentsRegistry> */}
          {children}
        </body>
      </html>
    </>
  );
}
