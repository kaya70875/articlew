import type { Metadata } from "next";
import "../globals.css";
import { Open_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Learn With Articles",
  description: "Learn English and write better with articles",
};

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
      >
        <main className="bg-main h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
