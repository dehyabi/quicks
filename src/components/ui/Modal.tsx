import React from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  width = 734,
  height = 737,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed z-50 bg-white rounded-[5px] transition-all duration-300 ease-out transform ${
        isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      } ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        bottom: '110px',
        right: '34px',
        // Ensure the modal is always in the same stacking context
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
