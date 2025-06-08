import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <div className="w-[1px] bg-[#F2F2F2]" />
      <main className="flex-1">
        <SearchBar />
        {/* Main content goes here */}
        <FloatingCircle className="cursor-pointer hover:opacity-90 transition-opacity">
          <ThunderIcon width={18} height={32} />
        </FloatingCircle>
      </main>
    </div>
  );
}