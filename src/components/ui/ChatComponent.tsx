import React from 'react';
import FloatingCircle from './FloatingCircle';
import PeopleIcon from './icons/PeopleIcon';

interface ChatComponentProps {
  /**
   * Title of the chat component
   */
  title: string;
  /**
   * Name of the sender
   */
  name: string;
  /**
   * Content of the message
   */
  content: string;
  /**
   * Background color of the title
   * @default 'transparent'
   */
  titleBgColor?: string;
  /**
   * Text color of the title
   * @default '#2F80ED'
   */
  titleTextColor?: string;
  /**
   * Maximum length of the content to show before truncating
   * @default 100
   */
  maxContentLength?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  title,
  name,
  content,
  titleBgColor = '',
  titleTextColor = '#2F80ED',
  maxContentLength = 100,
  className = '',
}) => {
  // Truncate content if it's longer than maxContentLength
  const truncatedContent = content.length > maxContentLength 
    ? `${content.substring(0, maxContentLength)}...`
    : content;

  return (
    <div className={`bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors duration-200 ${className} relative`}>
      {/* Floating Circle - Aligned with title */}
      <div className="absolute left-14 top-15">
        <FloatingCircle
          bgColor="#e0e0e0"
          width="35px"
          height="35px"
          className="shadow-none flex items-center justify-center"
        >
          <PeopleIcon color="#4f4f4f" size={12} />
        </FloatingCircle>
      </div>
      <div className="absolute left-19.5 top-15">
        <FloatingCircle
          bgColor="#2F80ED"
          width="35px"
          height="35px"
          className="shadow-none flex items-center justify-center"
        >
          <PeopleIcon color="white" size={12} />
        </FloatingCircle>
      </div>
      <div className="ml-[70px]">
        {/* Title Bar */}
        <div 
          className="px-4 py-2"
          style={{
            backgroundColor: titleBgColor || 'transparent',
            color: titleTextColor,
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        >
          <div className="flex items-center">
            <span className="font-bold">{title}</span>
            <span className="text-xs opacity-70 ml-[30px] text-[#4f4f4f]">01/06/2025 10:40</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-4 pb-4">
          <div className="text-sm font-bold text-gray-900 mb-0.5" style={{ fontSize: '14px', lineHeight: '1.25' }}>{name}</div>
          <p className="text-sm text-gray-600" style={{ lineHeight: '1.25' }}>
            {truncatedContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
