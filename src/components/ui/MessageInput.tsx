import React from 'react';
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
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the button
   */
  buttonClassName?: string;
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
  buttonClassName = 'px-6 ml-2 h-auto rounded-lg border border-[#4f4f4f] bg-white text-[#4f4f4f] hover:bg-gray-100 transition-colors',
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
      <div className="border-t-0 pt-0 w-full">
        <form onSubmit={handleSubmit} className="flex items-stretch w-full">
          <div className={`flex-1 px-4 py-3 border border-[#4f4f4f] ${className.includes('rounded-tr-none') ? 'rounded-bl-lg rounded-br-[5px]' : 'rounded-tl-[5px] rounded-b-lg rounded-tr-lg'}`} style={{ borderTopLeftRadius: className.includes('rounded-tr-none') ? '0' : '5px' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none text-sm text-[#4f4f4f] placeholder:text-[#828282]"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit"
            disabled={!message.trim() || loading}
            className={buttonClassName}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
