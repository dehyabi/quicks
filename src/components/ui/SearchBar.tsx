import { SearchIcon } from './icons/SearchIcon';

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
   * Icon color
   * @default '#F2F2F2'
   */
  iconColor?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export default function SearchBar({
  bgColor = '#828282',
  textColor = 'white',
  iconColor = '#F2F2F2',
  className = '',
  ...props
}: SearchBarProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon color={iconColor} />
      </div>
      <input
        type="text"
        className={`w-full pl-10 py-2 text-${textColor} bg-[${bgColor}] focus:outline-none`}
        style={{
          backgroundColor: bgColor,
          color: textColor
        }}
        {...props}
      />
    </div>
  );
}
  