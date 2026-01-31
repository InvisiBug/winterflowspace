import StyledComponentsRegistry from "./registry";
// import "./globals.css";
// import { GlobalStyles } from "@/lib/ui";

// TODO (Fix): Fix fonts [🌀-1]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" >
        {/* <GlobalStyles /> */}
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </>
  );
}
