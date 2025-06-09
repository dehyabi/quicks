"use client";

import { useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";
import InboxIcon from "@/components/ui/icons/InboxIcon";
import TaskIcon from "@/components/ui/icons/TaskIcon";

type ActiveCircle = 'task' | 'inbox' | null;

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCircle, setActiveCircle] = useState<ActiveCircle>(null);

  const handleCircleClick = (circle: ActiveCircle) => {
    setActiveCircle(prev => prev === circle ? null : circle);
  };

  const toggleExpand = () => {
    setActiveCircle(null);
    setIsExpanded(!isExpanded);
  };

  // Show titles only when expanded and no circle is active
  const showTitles = isExpanded && !activeCircle;

  return (
    <div className="flex min-h-screen bg-[#4F4F4F]">
      <Sidebar />
      <div className="w-[1px] bg-[#F2F2F2]" />
      <main className="flex-1">
        <SearchBar />

        <div className="fixed bottom-0 right-0 z-50">
          {/* Inbox Button - Appears first */}
          <div
            className={`transition-all duration-300 ease-out ${
              isExpanded || activeCircle === 'inbox' 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none translate-x-8'
            } ${
              activeCircle === 'inbox' 
                ? 'fixed bottom-0 right-0 mb-[27px] mr-[34px]' 
                : 'absolute bottom-[27px] right-[128px]'
            }`}
            style={{
              transitionDelay: isExpanded ? '0ms' : '150ms'
            }}
          >
            {/* Shadow Circle */}
            {activeCircle === 'inbox' && (
              <FloatingCircle
                className="absolute -z-10 opacity-30"
                bgColor="#828282"
                width={68}
                height={68}
                right={49}
                bottom={68}
                showTitle={false}
              />
            )}
            <FloatingCircle
              className={`cursor-pointer hover:opacity-90 transition-all duration-200 relative ${
                activeCircle === 'inbox' ? 'shadow-lg' : ''
              }`}
              title="Inbox"
              bgColor={activeCircle === 'inbox' ? '#8785FF' : '#F2F2F2'}
              width={activeCircle === 'inbox' ? 68 : 60}
              height={activeCircle === 'inbox' ? 68 : 60}
              titleColor="#F2F2F2"
              showTitle={showTitles}
              onClick={() => handleCircleClick('inbox')}
            >
              <InboxIcon 
                width={24} 
                height={23} 
                color={activeCircle === 'inbox' ? '#F2F2F2' : '#8785FF'} 
              />
            </FloatingCircle>
          </div>

          {/* Task Button - Appears second */}
          <div
            className={`transition-all duration-300 ease-out ${
              isExpanded || activeCircle
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none translate-x-8'
            } ${
              activeCircle === 'task'
                ? 'fixed bottom-0 right-0 mb-[27px] mr-[34px]'
                : activeCircle === 'inbox'
                  ? 'absolute bottom-[27px] right-[128px]'
                  : 'absolute bottom-[27px] right-[214px]'
            }`}
            style={{
              transitionDelay: isExpanded ? '150ms' : '0ms'
            }}
          >
            {/* Shadow Circle - Task */}
            {activeCircle === 'task' && (
              <FloatingCircle
                className="absolute -z-10 opacity-30"
                bgColor="#828282"
                width={68}
                height={68}
                right={49}
                bottom={68}
                showTitle={false}
              />
            )}
            <FloatingCircle
              className={`cursor-pointer hover:opacity-90 transition-all duration-200 relative ${
                activeCircle === 'task' ? 'shadow-lg' : ''
              }`}
              title="Task"
              bgColor={activeCircle === 'task' ? '#F8B76B' : '#F2F2F2'}
              width={activeCircle === 'task' ? 68 : 60}
              height={activeCircle === 'task' ? 68 : 60}
              titleColor="#F2F2F2"
              showTitle={showTitles}
              onClick={() => handleCircleClick('task')}
            >
              <TaskIcon 
                width={24} 
                height={23} 
                color={activeCircle === 'task' ? '#F2F2F2' : '#F8B76B'}
              />
            </FloatingCircle>
          </div>

          {/* Main Thunder Button - Hidden when any circle is active */}
          {!activeCircle && (
            <FloatingCircle
              className="cursor-pointer hover:opacity-90 transition-opacity mb-[27px] mr-[34px]"
              bgColor="#2F80ED"
              onClick={toggleExpand}
              showTitle={false}
            >
              <ThunderIcon width={18} height={32} />
            </FloatingCircle>
          )}
        </div>
      </main>
    </div>
  );
}
