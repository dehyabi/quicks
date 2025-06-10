"use client";

import { useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import FloatingCircle from "@/components/ui/FloatingCircle";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import ChatComponent from "@/components/ui/ChatComponent";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";
import InboxIcon from "@/components/ui/icons/InboxIcon";
import TaskIcon from "@/components/ui/icons/TaskIcon";

type ActiveCircle = 'task' | 'inbox' | null;

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCircle, setActiveCircle] = useState<ActiveCircle>(null);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample chat data
  const [chats] = useState([
    {
      id: 1,
      title: 'New Message',
      name: 'John Doe',
      content: 'Hi there! Just wanted to check in about the project timeline. Do you think we can have the first draft ready by Friday?'
    },
    {
      id: 2,
      title: 'Team Update',
      name: 'Sarah Wilson',
      content: 'The design assets have been uploaded to the shared drive. Let me know if you need any adjustments.'
    },
    {
      id: 3,
      title: 'Meeting Reminder',
      name: 'Alex Johnson',
      content: 'Just a reminder about our 2pm sync tomorrow. We\'ll be discussing the Q2 marketing strategy.'
    }
  ]);

  const handleInboxClick = () => {
    const newActiveCircle = activeCircle === 'inbox' ? null : 'inbox';
    setActiveCircle(newActiveCircle);
    setIsInboxModalOpen(!!newActiveCircle);
    
    if (newActiveCircle === 'inbox') {
      setIsLoading(true);
      // Simulate loading for 1 second
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsInboxModalOpen(false);
    }
  };

  const handleTaskClick = () => {
    const newActiveCircle = activeCircle === 'task' ? null : 'task';
    setActiveCircle(newActiveCircle);
    
    if (newActiveCircle === 'task') {
      // Add any task-specific logic here
    }
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
        {/* Inbox Modal */}
        <Modal 
          isOpen={isInboxModalOpen}
          width={734}
          height={737}
          className="bg-[#F2F2F2]"
        >
          <div className="w-full h-full relative">
            {/* Always show Search Bar */}
            <div className="relative flex justify-center">
              <SearchBar
                absolute={false}
                className="mt-[20px]"
                width={666}
                height={32}
                bgColor="white"
                textColor="#333"
                borderColor="#828282"
                placeholder="Search"
                iconColor="#828282"
                iconRightMargin={55}
              />
            </div>
            
            {/* Show loading or content */}
            <div className="w-full h-[calc(100%-52px)] relative">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="p-6 overflow-y-auto h-full">
                  <div className="space-y-0">
                    {chats.map((chat, index) => (
                      <div key={chat.id} className="relative">
                        {index > 0 && (
                          <div className="h-px bg-[#828282] mx-6 my-4"></div>
                        )}
                        <ChatComponent
                          title={chat.title}
                          name={chat.name}
                          content={chat.content}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
        <SearchBar iconPosition="left" iconLeftMargin={28} borderRadius={0}/>

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
                : 'absolute bottom-[30px] right-[128px]'
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
                right={47}
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
              onClick={handleInboxClick}
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
                  ? 'absolute bottom-[30px] right-[128px]'
                  : 'absolute bottom-[30px] right-[214px]'
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
                right={47}
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
              onClick={handleTaskClick}
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
