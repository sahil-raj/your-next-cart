import TanstackProvider from "@/providers/TanstackProvider";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-fuchsia-100 bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:20px_20px]">
        <TanstackProvider>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </TanstackProvider>
      </body>
    </html>
  );
}
