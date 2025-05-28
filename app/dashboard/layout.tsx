import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: 'Dashboard',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full hide-scroll">
        <Sidebar />
        <div className="flex flex-col bg-[#F7F7F7] flex-1 h-screen no-scrollbar">
            <Header />
            {children}
        </div>
    </div>
  );
}
