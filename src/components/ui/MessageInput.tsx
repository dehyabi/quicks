import React from 'react';

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
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder = 'Type a new message',
  onSend,
  className = '',
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
    <div className={`border-t border-gray-200 pt-4 ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="flex-1 rounded-md px-4 py-3 border border-gray-300">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
        <button 
          type="submit"
          className="bg-[#2F80ED] text-white text-sm font-medium px-6 py-[12px] rounded-md hover:opacity-90 transition-opacity"
          disabled={!message.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
