import React from 'react';

interface SearchIconProps {
  /**
   * Width and height of the icon
   * @default 20
   */
  size?: number;
  /**
   * Color of the icon
   * @default '#F2F2F2'
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({
  size = 20,
  color = '#F2F2F2',
  className = '',
  ...props
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 31" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M21.1856 18.9783H22.5486L31.1579 27.6047L28.5872 30.1754L19.9607 21.5662V20.2032L19.4949 19.7201C17.528 21.4109 14.9746 22.4289 12.1968 22.4289C6.00304 22.4289 0.982422 17.4082 0.982422 11.2144C0.982422 5.02061 6.00304 0 12.1968 0C18.3907 0 23.4113 5.02061 23.4113 11.2144C23.4113 13.9922 22.3934 16.5456 20.7026 18.5124L21.1856 18.9783ZM4.433 11.2145C4.433 15.5104 7.90084 18.9783 12.1968 18.9783C16.4928 18.9783 19.9607 15.5104 19.9607 11.2145C19.9607 6.91846 16.4928 3.45062 12.1968 3.45062C7.90084 3.45062 4.433 6.91846 4.433 11.2145Z" 
      fill={color}
    />
  </svg>
);

export default SearchIcon;
