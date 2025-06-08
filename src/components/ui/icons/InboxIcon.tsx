import React from 'react';

interface InboxIconProps {
  /**
   * Width of the icon
   * @default 24
   */
  width?: number;
  /**
   * Height of the icon
   * @default 23
   */
  height?: number;
  /**
   * Color of the icon
   * @default '#8885FF'
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const InboxIcon: React.FC<InboxIconProps> = ({
  width = 24,
  height = 23,
  color = '#8885FF',
  className = '',
  ...props
}) => (
  <svg 
    width={width}
    height={height}
    viewBox="0 0 24 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.4443 0.110657H1.9999C1.38879 0.110657 0.888794 0.610657 0.888794 1.22177V16.7773L5.33324 12.3329H16.4443C17.0555 12.3329 17.5555 11.8329 17.5555 11.2218V1.22177C17.5555 0.610657 17.0555 0.110657 16.4443 0.110657ZM15.3332 2.3328V10.1106H4.41103L3.75547 10.7661L3.11103 11.4106V2.3328H15.3332ZM19.7777 4.55512H21.9999C22.611 4.55512 23.111 5.05512 23.111 5.66623V22.3329L18.6666 17.8885H6.44435C5.83324 17.8885 5.33324 17.3885 5.33324 16.7773V14.5551H19.7777V4.55512Z"
      fill={color}
    />
  </svg>
);

export default InboxIcon;
