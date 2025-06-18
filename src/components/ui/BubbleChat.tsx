import React, { useState, useRef, useEffect, forwardRef } from 'react';

interface ReplyPreviewProps {
  sender: string;
  content: string;
  onClose: () => void;
  senderColor: string;
}

const ReplyPreview = ({ sender, content, onClose, senderColor }: ReplyPreviewProps) => (
  <div className="bg-[#f0f2f5] p-2 rounded-t-lg border-l-4" style={{ borderColor: senderColor }}>
    <div className="flex justify-between items-center mb-1">
      <div className="text-xs font-medium" style={{ color: senderColor }}>
        Replying to {sender}
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Cancel reply"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
    <div className="text-sm text-gray-700 truncate">{content}</div>
  </div>
);

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
  onMenuClick?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
  onReply?: (e: React.MouseEvent, message: string) => void;
  onCancelReply?: () => void;
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
  onMenuClick,
  onShare,
  onReply,
  onCancelReply,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyPreview, setReplyPreview] = useState<ReplyPreviewProps | null>(null);
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
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
    <div
      className={`relative flex ${alignRight ? 'flex-row-reverse' : 'flex-row'} items-start ${className}`}
      onContextMenu={(e) => {
        e.preventDefault();
        handleContextMenu(e);
      }}
    >
      <div className={`flex flex-col ${alignRight ? 'items-end' : 'items-start'}`}>
        {showSenderName && (
          <div
            className={`font-medium mb-1 px-2 ${alignRight ? 'text-right' : 'text-left'}`}
            style={{
              color: senderColor,
              fontSize: '12px',
              width: '100%',
              paddingRight: alignRight ? '0.5rem' : '0',
              paddingLeft: !alignRight ? '0.5rem' : '0',
            }}
          >
            {alignRight ? 'You' : sender}
          </div>
        )}
        <div
          ref={bubbleRef}
          className="bubble-chat p-3 rounded-lg w-full cursor-context-menu"
          style={{
            backgroundColor,
            borderRadius,
            color: textColor,
            alignSelf: alignRight ? 'flex-end' : 'flex-start',
            userSelect: 'none',
          }}
          onContextMenu={handleContextMenu}
        >
          <div className="flex flex-col w-full">
            <div className="mb-1">{content}</div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">{time}</div>
              {showReplyPreview && (
                <div className="text-xs text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z" fill="#4F4F4F" fillOpacity="0.5"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

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
      </div>

      {/* Three-dot menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleMenuClick}
          className={`flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors ${
            alignRight ? 'ml-2' : 'mr-2'
          }`}
          style={{
            marginTop: showSenderName ? '1.5rem' : '0.5rem',
            alignSelf: 'flex-start',
          }}
        >
          <ThreeDotsIcon />
        </button>

        {showMenu && (
          <div
            className={`absolute z-50 mt-1 w-40 bg-white rounded-md shadow-lg py-1 border border-gray-200 ${
              alignRight ? 'right-0' : 'left-0'
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
    </div>
  );
};

BubbleChat.displayName = 'BubbleChat';

export default BubbleChat;
