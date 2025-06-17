import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, PencilIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
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
  const datePickerRef = useRef<HTMLDivElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

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
            <ClockIcon className={`h-4 w-4 ${!dueDatePicker ? 'text-[#4f4f4f]' : 'text-[#2f80ed]'} mr-2`} />
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
          <div className="flex items-start ml-11 mr-[30px]">
            <PencilIcon className={`h-4 w-4 ${description && description !== 'No Description' ? 'text-[#2f80ed]' : 'text-[#4f4f4f]'} mt-0.5 mr-2 flex-shrink-0`} />
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
        </div>
      )}
    </div>
  );
};

export default Task;
