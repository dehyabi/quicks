import { ReactNode } from 'react';

interface FloatingCircleProps {
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
  bottom = '27px',
  right = '34px',
  icon,
  className = '',
  onClick,
  ...props
}: FloatingCircleProps) {
  return (
    <div 
      className={`absolute flex items-center justify-center rounded-full ${className}`}
      style={{
        backgroundColor: bgColor,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
        right: typeof right === 'number' ? `${right}px` : right,
      }}
      onClick={onClick}
      {...props}
    >
      {icon}
    </div>
  );
}
  