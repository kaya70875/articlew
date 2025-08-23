import { Inter } from "next/font/google";
import '../globals.css';
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="bg-main flex justify-center w-full py-12">
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
      </body>
    </html>
  )
}
