import { useState, useEffect, useRef } from "react";
import "./styles/Searchbar.css";

type SearchResult = {
  id: number;
  [key: string]: any;
};

type SearchBarProps<T extends SearchResult> = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  results?: T[];
  onSelect?: (item: T) => void;
  getLabel: (item: T) => string;
  placeholder?: string;
};

export const SearchBar = <T extends SearchResult>({
  value,
  onChange,
  onSearch,
  results = [],
  onSelect,
  getLabel,
  placeholder,
}: SearchBarProps<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowDropdown(results.length > 0);
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: T) => {
    onSelect?.(item);
    setShowDropdown(false);
  };

  const handleReset = () => {
    onChange("");       
    setShowDropdown(false); 
  };

  return (
    <div className="searchbar" ref={wrapperRef}>
      <div className="searchbar__input-group">
        <input
          type="text"
          value={value}
          placeholder={placeholder || "Search"}
          onChange={(e) => onChange(e.target.value)}
          className={showDropdown ? "searchbar__input searched" : "searchbar__input"}
        />

        {value && (
          <button
            type="button"
            className="searchbar__reset-button"
            onClick={handleReset}
          >
            ×
          </button>
        )}

        <button
          type="button"
          className={showDropdown ? "search__button-input searchedb" : "search__button-input"}
          onClick={onSearch}
        >
          <span className="text">Search</span>
          <span className="icon">🔍</span>
        </button>
      </div>

      {showDropdown && (
        <div className="searchbar__dropdown">
          {results.map((item) => (
            <div
              key={item.id}
              className="searchbar__dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {getLabel(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
