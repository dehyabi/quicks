import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar"
import FloatingCircle from "@/components/ui/FloatingCircle";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <main className="flex-1 p-6 relative">
        <SearchBar />
        {/* Main content goes here */}
        <FloatingCircle />
      </main>
    </div>
  );
}
