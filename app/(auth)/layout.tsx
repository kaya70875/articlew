import { Open_Sans } from "next/font/google";
import '../globals.css';

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
          {children}
        </main>
      </body>
    </html>
  )
}
