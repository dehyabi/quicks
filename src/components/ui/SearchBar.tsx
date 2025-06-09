import { SearchIcon } from './icons/SearchIcon';
import { ReactNode } from 'react';

interface SearchBarProps {
  /**
   * Background color of the search bar
   * @default '#828282'
   */
  bgColor?: string;
  /**
   * Text color
   * @default 'white'
   */
  textColor?: string;
  /**
   * Border color
   * @default 'transparent'
   */
  borderColor?: string;
  /**
   * Icon color
   * @default '#F2F2F2'
   */
  iconColor?: string;
  /**
   * Custom search icon component
   */
  searchIcon?: ReactNode;
  /**
   * Position of the search icon
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Margin for the icon when on the left
   * @default '12px'
   */
  iconLeftMargin?: string | number;
  /**
   * Margin for the icon when on the right
   * @default '12px'
   */
  iconRightMargin?: string | number;
  /**
   * Margin from top (only applies when position is absolute)
   * @default '0'
   */
  marginTop?: string | number;
  /**
   * Width of the search bar
   * @default '100%'
   */
  width?: string | number;
  /**
   * Height of the search bar
   * @default '58px'
   */
  height?: string | number;
  /**
   * Whether to use absolute positioning
   * @default false
   */
  absolute?: boolean;
  /**
   * Border radius in pixels
   * @default 5
   */
  borderRadius?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export default function SearchBar({
  bgColor = '#828282',
  textColor = 'white',
  borderColor = 'transparent',
  iconColor = '#F2F2F2',
  searchIcon,
  marginTop = 0,
  width = '100%',
  height = '58px',
  absolute = false,
  className = '',
  style,
  ...props
}: SearchBarProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const containerClasses = [
    'relative',
    className,
    absolute ? 'absolute' : '',
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...(absolute ? { top: typeof marginTop === 'number' ? `${marginTop}px` : marginTop } : {}),
    ...style,
  };

  const {
    iconPosition = 'right',
    iconLeftMargin = '12px',
    iconRightMargin = '12px',
    borderRadius = 5,
    ...inputProps
  } = props;
  
  // Convert number margins to pixel strings
  const leftMargin = typeof iconLeftMargin === 'number' ? `${iconLeftMargin}px` : iconLeftMargin;
  const rightMargin = typeof iconRightMargin === 'number' ? `${iconRightMargin}px` : iconRightMargin;
  
  const inputStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    borderColor: borderColor,
    borderWidth: borderColor !== 'transparent' ? '1px' : 0,
    borderRadius: `${borderRadius}px`,
    height: '100%',
    width: '100%',
    paddingLeft: iconPosition === 'left' ? `calc(${leftMargin} + 22px)` : '55px',
    paddingRight: iconPosition === 'right' ? `calc(${rightMargin} + 22px)` : '55px',
  };
  
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  } as const;
  
  if (iconPosition === 'left') {
    iconStyle.left = leftMargin;
  } else {
    iconStyle.right = rightMargin;
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className="relative w-full h-full">
        <input
          type="text"
          className={`w-full h-full focus:outline-none rounded-[5px] ${iconPosition === 'left' ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
          style={inputStyle}
          {...inputProps}
        />
        <div style={iconStyle}>
          {searchIcon || <SearchIcon color={iconColor} size={16} />}
        </div>
      </div>
    </div>
  );
}