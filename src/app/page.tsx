import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <div className="w-[1px] bg-[#E0E0E0]" />
      <main className="flex-1">
        <SearchBar />
        {/* Main content goes here */}
        <FloatingCircle />
      </main>
    </div>
  );
}