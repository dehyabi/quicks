"use client";

import { useState, useEffect } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/ui/SearchBar";
import MessageInput from "@/components/ui/MessageInput";
import FloatingCircle from "@/components/ui/FloatingCircle";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import BubbleChat from "@/components/ui/BubbleChat";
import Task from "@/components/ui/Task";
import ChatComponent from "@/components/ui/ChatComponent";
import DateSeparator from "@/components/ui/DateSeparator";
import InboxIcon from "@/components/ui/icons/InboxIcon";
import TaskIcon from "@/components/ui/icons/TaskIcon";
import ThunderIcon from "@/components/ui/icons/ThunderIcon";

// Helper function to format date to YYYY-MM-DD for grouping
const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

type ActiveCircle = 'task' | 'inbox' | null;

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCircle, setActiveCircle] = useState<ActiveCircle>(null);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState('');
  
  // Tasks state
  const [tasks, setTasks] = useState([]);

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      setIsTaskLoading(true);
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: taskId,
          updates: { isCompleted: !tasks.find(task => task.id === taskId)?.isCompleted }
        })
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const addNewTask = async () => {
    try {
      setIsTaskLoading(true);
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Type Task Title',
          description: '',
          dueDate: new Date()
        })
      });
      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const updateTask = async (taskId: string, updates: any) => {
    try {
      setIsTaskLoading(true);
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: taskId,
          updates
        })
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setIsTaskLoading(true);
      await fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId })
      });
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsTaskLoading(false);
    }
  };
  
  // Chat reply state
  const [replyingTo, setReplyingTo] = useState<{
    messageId: string;
    sender: string;
    content: string;
    senderColor: string;
  } | null>(null);

  // Fetch chat data from API
  const [chats, setChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setIsTaskLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsTaskLoading(false);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/inbox');
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsChatsLoading(false);
      }
    };
    
    const initializeData = async () => {
      await Promise.all([
        fetchChats(),
        fetchTasks()
      ]);
    };
    
    initializeData();
  }, []);

  const handleInboxClick = () => {
    const isCurrentlyActive = activeCircle === 'inbox';
    const newActiveCircle = isCurrentlyActive ? null : 'inbox';
    
    setActiveCircle(newActiveCircle);
    setIsInboxModalOpen(!isCurrentlyActive);
    
    // Close task modal if it's open
    if (activeCircle === 'task') {
      setIsTaskModalOpen(false);
    }
    
    if (newActiveCircle === 'inbox') {
      setIsLoading(true);
      // Simulate loading for 1 second
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleTaskClick = () => {
    const isCurrentlyActive = activeCircle === 'task';
    const newActiveCircle = isCurrentlyActive ? null : 'task';
    
    setActiveCircle(newActiveCircle);
    const willOpenModal = !isCurrentlyActive;
    setIsTaskModalOpen(willOpenModal);
    
    if (willOpenModal) {
      setIsTaskLoading(true);
      // Simulate loading for 1 second
      setTimeout(() => {
        setIsTaskLoading(false);
      }, 1000);
    }
    
    // Close inbox modal if it's open
    if (activeCircle === 'inbox') {
      setIsInboxModalOpen(false);
    }
    
    if (newActiveCircle === 'task') {
      setIsTaskLoading(true);
      // Simulate loading for 1 second
      setTimeout(() => {
        setIsTaskLoading(false);
      }, 1000);
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
            {!selectedChat && (
              <>
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
                
                <div className="w-full h-[calc(100%-52px)] relative">
                  {isLoading ? (
                    <Loading text='Loading Chats ...' />
                  ) : (
                    <div className="p-6 overflow-y-auto h-full">
                      <div className="space-y-0">
                        {isLoading ? (
                          <div className="flex justify-center p-4">
                            <Loading text="Loading chats..." />
                          </div>
                        ) : chats.length > 0 ? (
                          chats.map((chat, index) => (
                            <div key={chat.id} className="relative">
                              {index > 0 && (
                                <div className="h-px bg-[#828282] mx-6 my-4"></div>
                              )}
                              <div 
                                onClick={() => {
                                  // Find the full chat data from the chats array
                                  const fullChat = chats.find(c => c.id === chat.id);
                                  if (fullChat) {
                                    setSelectedChat(fullChat);
                                    if (fullChat.title === 'FastVisa Support') {
                                      setIsConnecting(true);
                                      setTimeout(() => setIsConnecting(false), 3000);
                                    }
                                  }
                                }}
                                className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                              >
                                <ChatComponent
                                  title={chat.title}
                                  name={chat.name}
                                  content={chat.content}
                                  unreadCount={chat.messages.filter(m => !m.read && !m.isCurrentUser).length}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No chats available
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {selectedChat && (
              <div className="h-full">
                <div className="w-full">
                  <div className="flex items-start justify-between p-4 pb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <button 
                          onClick={() => setSelectedChat(null)}
                          className="text-[#2F80ED] hover:no-underline flex items-center"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M18 12H6M12 6L6 12L12 18" stroke="#4f4f4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="font-medium">{selectedChat.title}</span>
                        </button>
                      </div>
                      {selectedChat.participants && (
                        <div className="text-sm text-gray-500 ml-8">
                          {selectedChat.participants.length} participants
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => setIsInboxModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 mt-1"
                      aria-label="Close modal"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="h-px w-full bg-[#E0E0E0] absolute left-0"></div>
                </div>
                <div className="bg-white rounded-lg p-6 flex flex-col" style={{ height: 'calc(90% - 80px)' }}>
                  <div className="flex-1 overflow-y-auto pr-2 pb-24">
                    {selectedChat.messages ? (
                      (() => {
                        // Group messages by date
                        const groupedMessages: Record<string, Array<typeof selectedChat.messages[0] & { date: Date }>> = {};
                        const today = new Date();
                        
                        selectedChat.messages.forEach(message => {
                          // For demo purposes, we'll use the current date minus message id to simulate different days
                          // In a real app, you would use the actual message timestamp
                          const messageDate = new Date();
                          messageDate.setDate(today.getDate() - (message.id % 3)); // Simulate messages from different days
                          
                          const dateKey = formatDateKey(messageDate);
                          if (!groupedMessages[dateKey]) {
                            groupedMessages[dateKey] = [];
                          }
                          // Add date to message for rendering
                          groupedMessages[dateKey].push({
                            ...message,
                            date: messageDate
                          });
                        });
                        
                        // Sort dates in descending order (newest first)
                        const sortedDates = Object.keys(groupedMessages).sort().reverse();
                        
                        return sortedDates.flatMap((dateKey) => {
                          const messages = groupedMessages[dateKey];
                          const messageDate = new Date(dateKey);
                          
                          return [
                            <DateSeparator key={`date-${dateKey}`} date={messageDate} />,
                            ...messages.map((message) => {
                              // Determine background color and sender color based on sender
                              let backgroundColor = '#FFFFFF';
                              let senderColor = '#4F4F4F';
                              
                              if (message.isCurrentUser) {
                                backgroundColor = '#EEDCFF'; // Current user (You)
                                senderColor = '#9B51E0';     // Purple for You
                              } else if (message.sender === 'Jamie Smith') {
                                backgroundColor = '#D2F2EA';  // Light mint green for Jamie
                                senderColor = '#43B78D';      // Teal for Jamie
                              } else {
                                // For other senders, use a consistent color based on their name
                                const senderIndex = selectedChat.participants?.findIndex(p => p.name === message.sender) || 0;
                                const bgColors = ['#FCEED3', '#E5F3FF', '#FFE5E5', '#F0F0F0'];
                                const nameColors = ['#E5A443', '#43B78D', '#4F4F4F', '#000000'];
                                
                                backgroundColor = bgColors[senderIndex % bgColors.length];
                                senderColor = nameColors[senderIndex % nameColors.length];
                              }

                              return (
                                <div 
                                  key={message.id} 
                                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                                >
                                  <BubbleChat
                                    sender={message.sender}
                                    content={message.content}
                                    time={message.time}
                                    senderColor={senderColor}
                                    className="max-w-[80%]"
                                    alignRight={message.isCurrentUser}
                                    backgroundColor={backgroundColor}
                                    showSenderName={true}
                                    showReplyPreview={replyingTo?.messageId === message.id}
                                    onReply={(e, content) => {
                                      setReplyingTo({
                                        messageId: message.id,
                                        sender: message.sender,
                                        content: content,
                                        senderColor: senderColor
                                      });
                                    }}
                                    onCancelReply={() => setReplyingTo(null)}
                                  />
                                </div>
                              );
                            })
                          ];
                        });
                      })()
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <BubbleChat
                          sender={selectedChat.name}
                          content={selectedChat.content}
                          time={new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          senderColor="#4F4F4F"
                          className="bg-gray-100 w-full max-w-[80%]"
                        />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-full">
                    <div className="relative">
                      {replyingTo && (
                        <div className="absolute bottom-full left-0 mb-0 bg-white border border-[#4f4f4f] rounded-t-lg border-b-0 w-[607px]">
                          <div className="flex justify-between items-center p-3">
                            <div className="text-[14px] font-lato font-bold text-[#4f4f4f]">
                              Replying to {replyingTo.sender}
                            </div>
                            <button 
                              onClick={() => setReplyingTo(null)}
                              className="text-gray-500 hover:text-gray-700"
                              aria-label="Cancel reply"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          <div className="text-sm text-[#4f4f4f] px-3 pb-2 break-words whitespace-pre-wrap">{replyingTo.content}</div>
                        </div>
                      )}
                    </div>
                    <MessageInput 
                      className={replyingTo ? 'rounded-tr-none' : ''}
                      buttonClassName="px-6 ml-2 h-auto rounded-lg border border-[#2f80ed] bg-[#2f80ed] text-white hover:bg-[#1a6ed8] transition-colors"
                      onSend={async (message: string) => {
                        if (!selectedChat) return;
                        
                        try {
                          const response = await fetch('/api/inbox', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              chatId: selectedChat.id,
                              message: message,
                              replyTo: replyingTo ? replyingTo.messageId : null
                            }),
                          });
                          
                          if (!response.ok) {
                            throw new Error('Failed to send message');
                          }
                          
                          const data = await response.json();
                          
                          // Update the chat with the new message
                          setChats(chats.map(chat => 
                            chat.id === selectedChat.id ? data.chat : chat
                          ));
                          
                          // Update the selected chat if it's open
                          if (selectedChat) {
                            setSelectedChat(data.chat);
                          }
                          
                          // Clear the reply state
                          setReplyingTo(null);
                        } catch (error) {
                          console.error('Error sending message:', error);
                          // You might want to show an error message to the user here
                        }
                      }} 
                      placeholder={replyingTo ? 'Type a reply...' : 'Type a message...'}
                    />
                  </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
        
        {/* Task Modal */}
        <Modal 
          isOpen={isTaskModalOpen}
          width={734}
          height={737}
          className="bg-[#F2F2F2]"
        >
          <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6">
              <div className="w-48 ml-[80px]">
                <Dropdown
                  items={[
                    { label: 'Personal Errands', value: 'personal' },
                    { label: 'Urgent To-Do', value: 'urgent' },
                  ]}
                  value={selectedTaskType}
                  onChange={(value) => setSelectedTaskType(value)}
                  placeholder="My Tasks"
                  className="w-full"
                />
              </div>
              <Button 
                onClick={addNewTask}
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                New Task
              </Button>
            </div>
            
            {/* Task List */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {isTaskLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loading text="Loading Task List ..." />
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  {tasks.length > 0 ? (
                    <div>
                      {tasks.map((task) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                          dueDate={new Date(task.dueDate)}
                          isCompleted={task.isCompleted}
                          onToggleComplete={toggleTaskCompletion}
                          onUpdate={updateTask}
                          onDelete={deleteTask}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-600 text-center py-8">No tasks yet. Click 'New Task' to get started.</p>
                    </div>
                  )}
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
