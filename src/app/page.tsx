import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";
import InboxIcon from "@/components/ui/icons/InboxIcon";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <div className="w-[1px] bg-[#F2F2F2]" />
      <main className="flex-1">
        <SearchBar />
        {/* Main content goes here */}
        <div className="flex flex-row-reverse items-end gap-6">
          <FloatingCircle 
            className="cursor-pointer hover:opacity-90 transition-opacity relative"
          >
            <ThunderIcon width={18} height={32} />
          </FloatingCircle>
          <FloatingCircle 
            className="cursor-pointer hover:opacity-90 transition-opacity relative"
            title="Inbox"
            right="128px"
            bgColor="#F2F2F2"
            width={60}
            height={60}
          >
            <InboxIcon width={24} height={23} />
          </FloatingCircle>
        </div>
      </main>
    </div>
  );
}