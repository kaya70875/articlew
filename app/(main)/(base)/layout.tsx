import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-main h-full flex">
            <Sidebar />
            <article className={`ml-0 md:ml-[12%] p-4 lg:ml-sidebar-width 2xl:px-24 xl:px-16 lg:px-12 md:px-8 py-12 w-full flex items-center justify-center`}>
                {children}
            </article>
        </main>
    );
}