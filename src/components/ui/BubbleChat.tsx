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
    <circle cx="2.5" cy="2.5" r="2.5" fill="#828282" />
    <circle cx="12" cy="2.5" r="2.5" fill="#828282" />
    <circle cx="21" cy="2.5" r="2.5" fill="#828282" />
  </svg>
);

interface ReplyTo {
  sender: string;
  content: string;
  senderColor: string;
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
  alignRight?: boolean;
  showSenderName?: boolean;
  showReplyPreview?: boolean;
  replyTo?: ReplyTo;
  onMenuClick?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
  onReply?: (e: React.MouseEvent, message: string) => void;
  onCancelReply?: () => void;
}

// Helper to convert "hh:mm AM/PM" to "HH:mm"
function convertTo24Hour(timeStr: string): string {
  const [time, modifier] = timeStr.trim().split(' ');

  if (!time || !modifier) return timeStr;

  const minutes = time.split(':')[1];
  let hours = time.split(':')[0];

  if (hours === '12') {
    hours = '00';
  }

  if (modifier.toLowerCase() === 'pm') {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
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
  showReplyPreview = false,
  replyTo,
  onMenuClick,
  onShare,
  onReply,
  // onCancelReply is intentionally unused but kept for API compatibility
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCancelReply,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
    setShowContextMenu(false);
    onMenuClick?.(e);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
    setShowMenu(false);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContextMenu(false);
    onShare?.(e);
  };

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContextMenu(false);
    onReply?.(e, content);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    console.log('Edit clicked');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    console.log('Delete clicked');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node) &&
        !bubbleRef.current?.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative flex ${alignRight ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className={`flex flex-col ${alignRight ? 'items-end' : 'items-start'} w-full`}>
        {/* Sender name */}
        {showSenderName && (
          <div
            className={`font-medium mb-1 px-2 ${alignRight ? 'text-right' : 'text-left'}`}
            style={{
              color: senderColor,
              fontSize: '12px',
              width: '100%',
            }}
          >
            {alignRight ? 'You' : sender}
          </div>
        )}

        {/* Reply preview */}
        {replyTo && (
          <div
            className="p-3 rounded-lg bg-gray-100 text-sm text-gray-700 overflow-hidden relative mb-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs line-clamp-2">{replyTo.content}</div>
          </div>
        )}

        {/* Main message + menu */}
        <div className={`flex items-start gap-[5px] ${alignRight ? 'flex-row]' : 'flex-row-reverse'} w-[400px]`}>
          {/* Menu icon */}
          <div ref={menuRef} className="relative mt-1.5">
            <button
              onClick={handleMenuClick}
              className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ThreeDotsIcon />
            </button>

            {showMenu && (
              <div
                className={`absolute z-50 mt-1 w-40 bg-white rounded-md shadow-lg py-1 border border-gray-200 ${
                  alignRight ? 'left-0' : 'right-0'
                }`}
              >
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-4 py-2 text-sm text-[#2f80ed] hover:bg-gray-100"
                >
                  Edit
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Bubble */}
          <div
            ref={bubbleRef}
            className="bubble-chat p-3 rounded-lg cursor-context-menu flex-1"
            style={{
              backgroundColor,
              borderRadius,
              color: textColor,
              maxWidth: '100%',
              userSelect: 'none',
            }}
            onContextMenu={handleContextMenu}
          >
            {content}
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {convertTo24Hour(time)}
              </div>
              {showReplyPreview && (
                <div className="text-xs text-gray-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z"
                      fill="#4F4F4F"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right-click context menu */}
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="absolute z-50 mt-2 w-40 bg-white rounded-md shadow-lg py-1 border border-gray-200"
          style={{
            top: '100%',
            left: alignRight ? 'auto' : '0',
            right: alignRight ? '0' : 'auto',
          }}
        >
          <button
            onClick={handleShare}
            className="block w-full text-left px-4 py-2 text-sm text-[#2f80ed] hover:bg-gray-100"
          >
            Share
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            onClick={handleReply}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-[#2f80ed] hover:bg-gray-100"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

BubbleChat.displayName = 'BubbleChat';

export default BubbleChat;
