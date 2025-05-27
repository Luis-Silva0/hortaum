import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: 'Dashboard',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
        <Sidebar />
        <div className="flex flex-col bg-[#F7F7F7] w-[90vw] h-screen">
            <Header />
            {children}
        </div>
    </div>
  );
}
