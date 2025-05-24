import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: 'Dashboard',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-[#F7F7F7]">
            <Header />
            {children}
        </div>
    </div>
  );
}
