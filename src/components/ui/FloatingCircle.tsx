import { ReactNode } from 'react';

interface FloatingCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Optional title to display above the circle
   */
  title?: string;
  /**
   * Color of the title text
   * @default 'white'
   */
  titleColor?: string;
  /**
   * Background color of the circle
   * @default '#2F80ED'
   */
  bgColor?: string;
  /**
   * Width of the circle
   * @default '68px'
   */
  width?: string | number;
  /**
   * Height of the circle
   * @default '68px'
   */
  height?: string | number;
  /**
   * Position from bottom
   * @default '27px'
   */
  bottom?: string | number;
  /**
   * Position from right
   * @default '34px'
   */
  right?: string | number;
  /**
   * Optional icon to display inside the circle
   */
  icon?: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

export default function FloatingCircle({
  bgColor = '#2F80ED',
  width = '68px',
  height = '68px',
  bottom = '0px',
  right = '0px',
  title = '',
  titleColor = 'white',
  className = '',
  onClick,
  children,
  ...props
}: FloatingCircleProps) {
  return (
    <div className="absolute flex flex-col items-center" 
         style={{
           bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
           right: typeof right === 'number' ? `${right}px` : right,
         }}
    >
      {title && (
        <div 
          className="text-sm font-medium mb-2 whitespace-nowrap"
          style={{ color: titleColor }}
        >
          {title}
        </div>
      )}
      <div 
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{
          backgroundColor: bgColor,
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
  