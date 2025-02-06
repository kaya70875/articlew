'use client';

import Sidebar from "@/components/Sidebar";
import useScreenSize from "@/hooks/useScreenSize";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isBelow: isTablet } = useScreenSize(1024);

    return (
        <main className="bg-main h-full flex">
            <Sidebar />
            <article className={`${isTablet ? 'ml-[12%]' : 'ml-sidebar-width'} 2xl:px-24 xl:px-16 lg:px-12 md:px-8 py-12 w-full flex items-center justify-center`}>
                {children}
            </article>
        </main>
    );
}