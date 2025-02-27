import MobileNavbar from "@/components/mobile/MobileNavbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-main h-full flex">
            <Sidebar />
            <article className={`ml-0 md:ml-[12%] p-4 lg:ml-sidebar-width 2xl:px-24 xl:px-16 lg:px-12 md:px-8 pt-4 md:pt-12 pb-12 w-full flex flex-col md:flex-row items-stretch md:items-center justify-normal md:justify-center`}>
                <div className="block md:hidden bg-main">
                    <MobileNavbar />
                </div>
                {children}
            </article>
        </main>
    );
}