import Sidebar from "@/components/Sidebar";
import { Open_Sans } from "next/font/google";

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
                <main className="bg-main h-full flex">
                    <Sidebar />
                    <article className="ml-sidebar-width px-24 py-12 w-full">
                        {children}
                    </article>
                </main>
            </body>
        </html>
    );
}