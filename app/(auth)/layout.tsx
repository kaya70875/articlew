import { Open_Sans } from "next/font/google";
import '../globals.css';
import { ToastProvider } from "@/context/ToastContext";

const openSans = Open_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <main className="bg-main flex justify-center w-full py-12">
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
      </body>
    </html>
  )
}
