import type { Metadata } from "next";
import "./globals.css";
import { OrderContextProvider } from "./components/OrderContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?display=swap&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,logout,remove" />
      </head>
      <body className="bg-blue-50 dark:bg-gray-900 ">
        <OrderContextProvider>
          {children}
        </OrderContextProvider>
      </body>
    </html>
  );
}
