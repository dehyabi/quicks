import React, { useState, useRef, useEffect } from 'react';

const ThreeDotsIcon = ({ className = '' }) => (
  <svg 
    className={className}
    width="15" 
    height="6" 
    viewBox="0 0 24 6" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="2.5" 
      cy="2.5" 
      r="2.5" 
      fill="#828282"
    />
    <circle 
      cx="12" 
      cy="2.5" 
      r="2.5" 
      fill="#828282"
    />
    <circle 
      cx="21" 
      cy="2.5" 
      r="2.5" 
      fill="#828282"
    />
  </svg>
);

interface BubbleChatProps {
  /**
   * Background color of the bubble
   */
  backgroundColor?: string;
  /**
   * Border radius of the bubble
   */
  borderRadius?: string;
  /**
   * Text color of the message
   */
  textColor?: string;
  /**
   * Time of the message
   */
  time: string;
  /**
   * Name of the sender
   */
  sender: string;
  /**
   * Color of the sender name
   */
  senderColor?: string;
  /**
   * Content of the message
   */
  content: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

interface BubbleChatProps {
  backgroundColor?: string;
  borderRadius?: string;
  textColor?: string;
  time: string;
  sender: string;
  senderColor?: string;
  content: string;
  className?: string;
  /**
   * Align the bubble to the right (for current user's messages)
   */
  alignRight?: boolean;
  /**
   * Whether to show the sender's name
   * @default true
   */
  showSenderName?: boolean;
  /**
   * Callback when the menu button is clicked
   */
  onMenuClick?: (e: React.MouseEvent) => void;
}

const BubbleChat: React.FC<BubbleChatProps> = ({
  backgroundColor = '#FFFFFF',
  borderRadius = '5px',
  textColor = '#000000',
  time,
  sender,
  senderColor = '#2F80ED',
  content,
  className = '',
  alignRight = false,
  showSenderName = true,
  onMenuClick,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    onMenuClick?.(e);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    // Add your edit logic here
    console.log('Edit clicked');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    // Add your delete logic here
    console.log('Delete clicked');
  };

  return (
    <div className={`relative flex ${alignRight ? 'flex-row-reverse' : 'flex-row'} items-start ${className}`}>
      <div className={`flex flex-col ${alignRight ? 'items-end' : 'items-start'}`}>
        {showSenderName && (
          <div 
            className={`font-medium mb-1 px-2 ${alignRight ? 'text-right' : 'text-left'}`} 
            style={{ 
              color: senderColor, 
              fontSize: '12px',
              width: '100%',
              paddingRight: alignRight ? '0.5rem' : '0',
              paddingLeft: !alignRight ? '0.5rem' : '0'
            }}
          >
            {alignRight ? 'You' : sender}
          </div>
        )}
        <div 
          className="bubble-chat p-3 rounded-lg w-full"
          style={{
            backgroundColor,
            borderRadius,
            color: textColor,
            alignSelf: alignRight ? 'flex-end' : 'flex-start',
          }}
        >
          <div className="flex flex-col">
            <div className="mb-1">{content}</div>
            <div className="text-xs text-gray-500">{time}</div>
          </div>
        </div>
      </div>
      <div className="relative" ref={menuRef}>
        <button 
          onClick={handleMenuClick}
          className={`flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors ${alignRight ? 'ml-2' : 'mr-2'}`}
          style={{
            marginTop: showSenderName ? '1.5rem' : '0.5rem',
            alignSelf: 'flex-start'
          }}
        >
          <ThreeDotsIcon />
        </button>
        
        {showMenu && (
          <div 
            className={`absolute z-50 mt-1 w-40 bg-white rounded-md shadow-lg py-1 ${alignRight ? 'right-0' : 'left-0'}`}
            style={{
              border: '1px solid #E5E7EB',
            }}
          >
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-sm text-[#2f80ed] hover:bg-gray-100"
            >
              Edit
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

BubbleChat.displayName = 'BubbleChat';

export default BubbleChat;
