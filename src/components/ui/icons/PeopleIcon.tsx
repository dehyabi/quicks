import React from 'react';

interface PeopleIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Color of the icon
   * @default 'currentColor'
   */
  color?: string;
  /**
   * Width and height of the icon
   * @default 12
   */
  size?: number;
}

const PeopleIcon: React.FC<PeopleIconProps> = ({
  color = 'currentColor',
  size = 12,
  ...props
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0ZM7.5 3C7.5 2.175 6.825 1.5 6 1.5C5.175 1.5 4.5 2.175 4.5 3C4.5 3.825 5.175 4.5 6 4.5C6.825 4.5 7.5 3.825 7.5 3ZM10.5 10.5C10.35 9.9675 8.025 9 6 9C3.9825 9 1.6725 9.96 1.5 10.5H10.5ZM0 10.5C0 8.505 3.9975 7.5 6 7.5C8.0025 7.5 12 8.505 12 10.5V12H0V10.5Z" 
        fill={color}
      />
    </svg>
  );
};

export default PeopleIcon;
