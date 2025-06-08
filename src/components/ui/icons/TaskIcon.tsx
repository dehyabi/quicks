import React from 'react';

interface TaskIconProps {
  /**
   * Width of the icon
   * @default 26
   */
  width?: number;
  /**
   * Height of the icon
   * @default 20
   */
  height?: number;
  /**
   * Color of the icon
   * @default '#F8B76B'
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const TaskIcon: React.FC<TaskIconProps> = ({
  width = 26,
  height = 20,
  color = '#F8B76B',
  className = '',
  ...props
}) => (
  <svg 
    width={width}
    height={height}
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.11114 0.666687H23.1111C24.3334 0.666687 25.3334 1.66669 25.3334 2.88891V17.3334C25.3334 18.5556 24.3334 19.5556 23.1111 19.5556H3.11114C1.88892 19.5556 0.888916 18.5556 0.888916 17.3334V2.88891C0.888916 1.66669 1.88892 0.666687 3.11114 0.666687ZM3.11114 2.88891V17.3334H12V2.88891H3.11114ZM23.1111 17.3334H14.2222V2.88891H23.1111V17.3334ZM22 6.7778H15.3334V8.44446H22V6.7778ZM15.3334 9.55558H22V11.2222H15.3334V9.55558ZM22 12.3334H15.3334V14H22V12.3334Z"
      fill={color}
    />
  </svg>
);

export default TaskIcon;
