import React, { useState, useRef, useEffect } from "react";

// 1. ADDED 'selectedValue' to the destructured props
function CustomDropdown({ dropdownData, onSelect, selectedValue }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const dropdownContainerRef = useRef(null);

  // 2. UPDATED to respect the parent's selectedValue or a defaultValue
  useEffect(() => {
    const initialValues = {};
    dropdownData.forEach((dropdown) => {
      // Prioritize the parent's state, then a defaultValue, then fallback to "Select..."
      initialValues[dropdown.name] = selectedValue || dropdown.defaultValue || `Select ${dropdown.name}`;
    });
    setSelectedValues(initialValues);
  }, [dropdownData, selectedValue]); // Added selectedValue as a dependency so it updates if parent changes

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelectOption = (name, option) => {
    // Update internal state
    setSelectedValues((prev) => ({ ...prev, [name]: option }));

    // Pass the value back up to the parent
    if (onSelect) {
      onSelect(name, option);
    }

    // Close dropdown
    setOpenDropdown(null);
  };

  return (
    <div className="dropdowns w-100" ref={dropdownContainerRef}>
      {dropdownData.map((dropdown) => {
        const isOpen = openDropdown === dropdown.name;
        const currentDisplayValue = selectedValues[dropdown.name];

        return (
          <div
            className="text-start position-relative"
            key={dropdown.name}
          >
            {/* The Dropdown Trigger (The Box) */}
            <div
              className={`p-3 py-2 border rounded-3 d-flex justify-content-between align-items-center cursor-pointer bg-white transition-all ${isOpen ? "border-primary shadow-sm" : ""}`}
              role="button"
              onClick={() => handleToggleDropdown(dropdown.name)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              {/* 3. FIXED text color: It changes from muted to dark when a real option is selected */}
              <span
                className={`fw-medium ${currentDisplayValue?.startsWith("Select") ? "text-muted" : "text-dark"}`}
              >
                {currentDisplayValue}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down text-muted"
                style={{
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>

            {/* The Dropdown Menu */}
            {isOpen && (
              <div
                className="border mt-2 p-2 rounded-3 bg-white position-absolute w-100 shadow-sm z-3"
                style={{ 
                  top: "100%", 
                  left: 0, 
                  maxHeight: "160px",
                  overflowY: "auto",
                  scrollbarWidth:"thin"
                }}
                role="listbox"
              >
                {dropdown.options.map((option) => {
                  const isSelected = option === currentDisplayValue;

                  return (
                    <div
                      key={option}
                      className={`m-1 p-2 rounded-3 d-flex justify-content-between align-items-center ${isSelected ? "bg-success bg-opacity-10" : ""}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectOption(dropdown.name, option)}
                      style={{
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span className={isSelected ? "fw-bold text-success" : "text-dark"}>
                        {option}
                      </span>

                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="#0a8805"
                          className="bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CustomDropdown;