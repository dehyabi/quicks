import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onUpdate?: (id: string, updates: Partial<Omit<TaskProps, 'id' | 'onToggleComplete' | 'onUpdate' | 'onDelete'>>) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  dueDate,
  isCompleted,
  onToggleComplete,
  onUpdate,
  onDelete,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(!title || title === 'Type Task Title');
  const [showOptions, setShowOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const isNewTask = !title || title === 'Type Task Title';
  const [dueDatePicker, setDueDatePicker] = useState<Date | null>(isNewTask ? null : dueDate);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(!title || title === 'Type Task Title');
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedTitle, setEditedTitle] = useState(title);
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>(['Important ASAP']);
  const [showBookmarkDropdown, setShowBookmarkDropdown] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (bookmarkLabel: string) => {
    setSelectedBookmarks(prev => {
      if (prev.includes(bookmarkLabel)) {
        // If it's the last bookmark, don't remove it
        if (prev.length === 1) return prev;
        return prev.filter(label => label !== bookmarkLabel);
      }
      // Don't allow duplicates
      if (!prev.includes(bookmarkLabel)) {
        return [...prev, bookmarkLabel];
      }
      return prev;
    });
  };

  const bookmarks = [
    { label: 'Important ASAP', bgColor: '#e9f3ff' },
    { label: 'Offline Meeting', bgColor: '#fdcfa4' },
    { label: 'Virtual Meeting', bgColor: '#f9e9c3' },
    { label: 'ASAP', bgColor: '#AFEBDB' },
    { label: 'Client Related', bgColor: '#cbf1c2' },
    { label: 'Self Task', bgColor: '#cfcef9' },
    { label: 'Appointments', bgColor: '#f9e0fd' },
    { label: 'Court Related', bgColor: '#9DD0ED' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target as Node)) {
        setShowBookmarkDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus the description input when editing starts
  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
      // Move cursor to the end of the text
      const length = descriptionInputRef.current.value.length;
      descriptionInputRef.current.setSelectionRange(length, length);
    }
  }, [isEditingDescription]);

  // Close date picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthChange = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    setDueDatePicker(selectedDate);
    setShowDatePicker(false);
    
    // Only update the parent if it's not a new task
    if (!isNewTask && onUpdate) {
      onUpdate(id, { dueDate: selectedDate });
    }
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    if (onUpdate && editedDescription !== description) {
      onUpdate(id, { description: editedDescription });
    }
  };

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    if (onUpdate && editedTitle !== title) {
      onUpdate(id, { title: editedTitle });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Adjust firstDayOfMonth to make Monday (1) the first day of the week
    // Convert Sunday (0) to 6, Monday (1) to 0, Tuesday (2) to 1, etc.
    const firstDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOffset; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = dueDatePicker && 
                        dueDatePicker.getDate() === day && 
                        dueDatePicker.getMonth() === currentMonth && 
                        dueDatePicker.getFullYear() === currentYear;
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            isSelected 
              ? 'border-2 border-blue-500 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = () => {
    onToggleComplete(id);
  };

  // Calculate days left
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  const isOverdue = daysLeft < 0;
  const isDueSoon = daysLeft <= 2 && daysLeft >= 0;

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-[30px] right-[30px] bottom-0 h-px bg-[#4f4f4f] last:opacity-0 z-10"></div>
      <div className="flex items-start px-[30px] py-4 hover:bg-gray-50 relative z-0">
        <div className="flex items-center h-6 mt-0.5 mr-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveTitle();
                  } else if (e.key === 'Escape') {
                    setEditedTitle(title);
                    setIsEditingTitle(false);
                  }
                }}
                className="w-[300px] h-[36px] px-2 text-base font-medium text-gray-900 bg-white border border-[#E0E0E0] rounded-[5px] focus:outline-none focus:border-[#E0E0E0]"
                autoFocus
              />
            ) : (
              <h3 
                className={`text-base font-medium text-gray-900 ${
                  isCompleted ? 'line-through text-gray-500' : ''
                } cursor-text`}
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h3>
            )}
            
            <div className="ml-4 flex items-center">
              <div className="flex items-center">
                {!isNewTask && (
                  <div className="text-sm mr-3">
                    <span 
                      className={`${isOverdue || isDueSoon ? 'text-[#EB5757]' : 'text-gray-500'}`}
                    >
                      {isOverdue 
                        ? `${Math.abs(daysLeft)} Days Overdue` 
                        : daysLeft === 0 
                          ? 'Due Today' 
                          : `${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'} left`}
                    </span>
                  </div>
                )}
                {dueDatePicker && (
                  <div className="ml-3 text-sm text-gray-500">
                    {formatDate(dueDatePicker)}
                  </div>
                )}
              </div>

              <div className="flex items-center ml-4">
                <button 
                  onClick={toggleExpand}
                  className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
                
                <div className="relative ml-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowOptions(!showOptions);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none w-[15px]"
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                  
                  {showOptions && (
                    <div className="absolute right-0 z-[99999] mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg border border-[#828282] focus:outline-none" style={{ backgroundColor: 'white' }}>
                      <div className="py-1">
                        <button 
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-[20px] pb-4 pt-2 bg-gray-50">
          <div className="mb-3 flex items-center ml-11 relative">
            <svg width="20" height="20" viewBox="0 0 31 31" fill="none" className={`mr-2 ${!dueDatePicker ? 'text-[#4f4f4f]' : 'text-[#2f80ed]'}`}>
              <path fillRule="evenodd" clipRule="evenodd" d="M15.2508 2.51465C8.31048 2.51465 2.69031 8.1474 2.69031 15.0877C2.69031 22.0281 8.31048 27.6608 15.2508 27.6608C22.2038 27.6608 27.8365 22.0281 27.8365 15.0877C27.8365 8.1474 22.2038 2.51465 15.2508 2.51465ZM15.2637 25.1462C9.70636 25.1462 5.20519 20.6451 5.20519 15.0878C5.20519 9.53045 9.70636 5.02928 15.2637 5.02928C20.821 5.02928 25.3221 9.53045 25.3221 15.0878C25.3221 20.6451 20.821 25.1462 15.2637 25.1462ZM14.0061 8.80121H15.8921V15.4021L21.55 18.7591L20.607 20.3056L14.0061 16.3451V8.80121Z" fill="currentColor"/>
            </svg>
            <div className="relative" ref={datePickerRef}>
              <div 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-[200px] pl-3 pr-8 py-2 text-sm border border-gray-300 hover:border-blue-500 rounded-md relative cursor-pointer"
              >
                <span className={!dueDatePicker ? 'text-gray-400' : ''}>
                  {dueDatePicker ? formatDate(dueDatePicker) : 'Set Date'}
                </span>
                <CalendarIcon className="h-4 w-4 text-[#4f4f4f] absolute right-2 top-1/2 transform -translate-y-1/2" />
              </div>
              
              {showDatePicker && (
                <div 
                  className="absolute z-50 mt-1 w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 p-4" 
                  style={{ 
                    top: '100%',
                    left: 'calc(100% - 22px)' // Align left edge with calendar icon + 6px to the left
                  }}
                >
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex-1 flex justify-start">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMonthChange(-1);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="flex-1 text-center">
                      <div className="text-sm font-medium">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex justify-end">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMonthChange(1);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                    {['M', 'T', 'W', 'Th', 'F', 'S', 'S'].map((day, index) => (
                      <div key={index} className="w-8 h-6 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start ml-11 mr-[30px] mb-3">
            <svg width="20" height="20" viewBox="0 0 24 23" fill="none" className={`mr-2 flex-shrink-0 ${description && description !== 'No Description' ? 'text-[#2f80ed]' : 'text-[#4f4f4f]'}`}>
              <path fillRule="evenodd" clipRule="evenodd" d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z" fill="currentColor"/>
            </svg>
            {isEditingDescription ? (
              <div className="flex-1">
                <textarea
                  ref={descriptionInputRef}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  onBlur={handleSaveDescription}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      setIsEditingDescription(false);
                      // Here you would typically update the task description in your state management
                    } else if (e.key === 'Escape') {
                      setEditedDescription(description);
                      setIsEditingDescription(false);
                    }
                  }}
                  className="w-full p-2 text-sm text-gray-700 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            ) : (
              <div 
                className="flex-1 p-2 text-sm text-gray-700 border border-transparent rounded-md hover:border-gray-300 cursor-text"
                onClick={() => setIsEditingDescription(true)}
              >
                {editedDescription && editedDescription !== 'No Description' ? (
                  editedDescription
                ) : (
                  <span className="text-gray-400">No Description</span>
                )}
              </div>
            )}
          </div>
          
          {/* Bookmark Section */}
          <div className="flex items-center ml-11 mr-[30px] mb-3 relative" ref={bookmarkRef}>
            <div className="mr-2">
              <svg width="20" height="22" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23.005 1.25732H11.116C9.80952 1.25732 8.75246 2.3889 8.75246 3.77194H20.6295C21.936 3.77194 23.005 4.90352 23.005 6.28656V22.6316L25.3804 23.8889V3.77194C25.3804 2.3889 24.3114 1.25732 23.005 1.25732ZM18.2543 8.80118V25.1085L13.254 22.8328L12.3157 22.4053L11.3774 22.8328L6.37719 25.1085V8.80118H18.2543ZM6.37712 6.28655H18.2542C19.5607 6.28655 20.6296 7.41813 20.6296 8.80117V28.9181L12.3157 25.1462L4.00171 28.9181V8.80117C4.00171 7.41813 5.07065 6.28655 6.37712 6.28655Z" fill="#2F80ED"/>
              </svg>
            </div>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBookmarkDropdown(!showBookmarkDropdown);
                }}
                className="text-sm text-[#4f4f4f] hover:bg-gray-100 px-2 py-1 rounded"
              >
                <div className="flex flex-wrap gap-2.5">
                  {selectedBookmarks.map(bookmarkLabel => {
                    const bookmark = bookmarks.find(b => b.label === bookmarkLabel);
                    return bookmark ? (
                      <span 
                        key={bookmark.label}
                        className="px-2 py-0.5 rounded text-xs whitespace-nowrap"
                        style={{ backgroundColor: bookmark.bgColor }}
                      >
                        {bookmark.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </button>
              
              {showBookmarkDropdown && (
                <div className="absolute z-50 mt-1 w-[277px] h-[323px] bg-white rounded-md shadow-lg border border-gray-200 p-4 overflow-y-auto">
                  <div className="flex flex-col items-center space-y-2.5">
                    {bookmarks.map((bookmark) => (
                      <button
                        key={bookmark.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(bookmark.label);
                        }}
                        onDoubleClick={() => setShowBookmarkDropdown(false)}
                        className={`w-[246px] h-[28px] rounded flex items-center text-sm text-[#4f4f4f] hover:opacity-90 transition-opacity pl-3 ${selectedBookmarks.includes(bookmark.label) ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
                        style={{ backgroundColor: bookmark.bgColor }}
                      >
                        {bookmark.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
