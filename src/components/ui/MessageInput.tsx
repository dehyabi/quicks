import React, { useState } from 'react';
import Button from './Button';

interface MessageInputProps {
  /**
   * Placeholder text for the input
   * @default 'Type a new message'
   */
  placeholder?: string;
  /**
   * Callback when the send button is clicked
   */
  onSend?: (message: string) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Loading text to display
   * @default 'Please wait while we connect you with our team...'
   */
  loadingText?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder = 'Type a new message',
  onSend,
  className = '',
  loading = false,
  loadingText = 'Please wait while we connect you with our team...',
}) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className={className}>
      {loading && (
        <div className="flex items-center gap-3 p-3 mb-4 bg-[#d2f2ea] rounded-lg">
          <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-[#4F4F4F] rounded-full animate-spin" />
          <span className="text-sm text-[#4F4F4F]">{loadingText}</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="flex-1 rounded-md px-4 py-2 border border-gray-300">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-sm"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit"
            disabled={!message.trim() || loading}
            className="px-5"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
