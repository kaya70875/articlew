import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToastProvider } from "@/context/ToastContext";
import { Analytics } from "@vercel/analytics/next";
import icon from '@/public/images/logo.svg'

export const metadata: Metadata = {
  title: "learnwitharticles",
  description: "Learn English and write better with articles",
  icons: {
    icon: icon.src,
  }
};

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`} suppressHydrationWarning
      >
        <main className="bg-main min-h-screen">
          <SessionProvider session={session}>
            <ToastProvider>
              {children}
              <Analytics />
            </ToastProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}