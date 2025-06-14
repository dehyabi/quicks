import React from 'react';

interface DateSeparatorProps {
  date: Date;
}

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  let dateText: string;
  
  if (isToday) {
    dateText = `Today, ${formattedDate}`;
  } else if (isYesterday) {
    dateText = `Yesterday, ${formattedDate}`;
  } else {
    dateText = formattedDate;
  }

  return (
    <div className="relative flex items-center my-4">
      <div className="flex-grow border-t border-[#4f4f4f]"></div>
      <span className="flex-shrink mx-4 text-xs text-[#4f4f4f] font-medium">
        {dateText}
      </span>
      <div className="flex-grow border-t border-[#4f4f4f]"></div>
    </div>
  );
};

export default DateSeparator;
