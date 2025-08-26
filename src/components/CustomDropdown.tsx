import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./CustomDropdown.scss";

interface DropdownOption {
  value: string;
  label: string;
  subLabel?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  infoBoxColor: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  infoBoxColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (option.subLabel &&
        option.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <span className="selected-text">
          {selectedOption ? <>{selectedOption.label}</> : placeholder}
        </span>
        <ChevronDown
          className={`chevron ${isOpen ? "rotated" : ""}`}
          size={20}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div
            className="options-container"
            style={{ backgroundColor: infoBoxColor }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`dropdown-option ${
                    option.value === value ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span className="option-label">{option.label}</span>
                  {option.subLabel && (
                    <span className="option-sub-label">
                      ({option.subLabel})
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="no-options">No regions found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
