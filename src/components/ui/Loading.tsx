import React from 'react';

interface LoadingProps {
  /**
   * Size of the loading spinner in pixels
   * @default 60
   */
  size?: number;
  /**
   * Color of the loading spinner
   * @default '#C4C4C4'
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 8.54,
  color = '#C4C4C4',
  className = '',
}) => {
  const circleStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: `8.5px solid ${color}20`,
    borderTop: `8.5px solid ${color}`,
    borderRight: `8.5px solid ${color}`,
    animation: 'spin 1s linear infinite',
  };

  return (
    <div 
      className={`flex items-center justify-center w-full h-full ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="flex flex-col items-center justify-center" style={{ gap: '34px' }}>
        <div style={circleStyle}></div>
        <span className="text-[#4F4F4F] text-sm">Loading Charts ...</span>
      </div>
    </div>
  );
};

export default Loading;
