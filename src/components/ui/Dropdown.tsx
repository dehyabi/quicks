import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  /**
   * Array of items to display in the dropdown
   */
  items: DropdownItem[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Callback when an item is selected
   */
  onChange: (value: string) => void;
  /**
   * Placeholder text when no item is selected
   */
  placeholder?: string;
  /**
   * Additional CSS classes for the dropdown button
   */
  className?: string;
  /**
   * Additional CSS classes for the dropdown menu
   */
  dropdownMenuClass?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Custom renderer for the selected item
   */
  renderSelected?: (item: DropdownItem | undefined) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  dropdownMenuClass = '',
  disabled = false,
  renderSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(item => item.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    onChange(item.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef} style={{ width: '120px' }}>
      <div>
        <button
          type="button"
          className={`inline-flex items-center justify-between rounded-md border border-gray-300/70 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{ width: '120px', minWidth: '120px' }}
          onClick={toggleDropdown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {renderSelected ? ( 
            renderSelected(selectedItem)
          ) : (
            <span className="truncate">
              {selectedItem ? (
                <span className="flex items-center gap-2">
                  {selectedItem.icon}
                  {selectedItem.label}
                </span>
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </span>
          )}
          <ChevronDownIcon 
            className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
            aria-hidden="true" 
          />
        </button>
      </div>

      {isOpen && (
        <div 
          className={`absolute left-1/2 z-10 mt-1 rounded-md bg-white shadow-lg border border-gray-300/70 focus:outline-none ${dropdownMenuClass}`}
          role="listbox"
          aria-orientation="vertical"
          aria-labelledby="listbox-label"
          style={{ 
            width: '200px', 
            minWidth: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            marginLeft: '0'
          }}
        >
          <div className="py-1 max-h-60 overflow-auto">
            {items.map((item, index) => (
              <React.Fragment key={item.value}>
                {index > 0 && <div className="border-t border-gray-300/70" />}
                <div
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis ${
                    value === item.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                  onClick={() => handleItemClick(item)}
                  role="option"
                  aria-selected={value === item.value}
                  style={{ maxWidth: '100%' }}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </div>
              </React.Fragment>
            ))}
            {items.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">No options available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
