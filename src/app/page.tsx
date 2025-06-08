"use client";

import { useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";
import InboxIcon from "@/components/ui/icons/InboxIcon";
import TaskIcon from "@/components/ui/icons/TaskIcon";

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <div className="w-[1px] bg-[#F2F2F2]" />
      <main className="flex-1">
        <SearchBar />

        <div className="fixed bottom-0 right-0 z-50">
          {/* Task Button */}
          <div
            className={`absolute bottom-[27px] transition-all duration-500 ease-in-out ${
              isExpanded ? 'right-[214px] opacity-100' : 'right-[34px] opacity-0 pointer-events-none'
            }`}
          >
            <FloatingCircle
              className="cursor-pointer hover:opacity-90 transition-opacity"
              title="Task"
              bgColor="#F2F2F2"
              width={60}
              height={60}
              titleColor="#F2F2F2"
              onClick={() => console.log('Task clicked')}
            >
              <TaskIcon width={24} height={23} color="#F8B76B" />
            </FloatingCircle>
          </div>

          {/* Inbox Button */}
          <div
            className={`absolute bottom-[27px] transition-all duration-500 ease-in-out ${
              isExpanded ? 'right-[128px] opacity-100' : 'right-[34px] opacity-0 pointer-events-none'
            }`}
          >
            <FloatingCircle
              className="cursor-pointer hover:opacity-90 transition-opacity"
              title="Inbox"
              bgColor="#F2F2F2"
              width={60}
              height={60}
              titleColor="#F2F2F2"
              onClick={() => console.log('Inbox clicked')}
            >
              <InboxIcon width={24} height={23} color="#8785ff" />
            </FloatingCircle>
          </div>

          {/* Main Thunder Button */}
          <FloatingCircle
            className="cursor-pointer hover:opacity-90 transition-opacity mb-[27px] mr-[34px]"
            bgColor="#2F80ED"
            onClick={toggleExpand}
          >
            <ThunderIcon width={18} height={32} />
          </FloatingCircle>
        </div>
      </main>
    </div>
  );
}
