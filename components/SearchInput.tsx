import React, { useRef, useEffect, useState } from 'react';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  suggestions?: string[];
  isSearching?: boolean;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  animatedPlaceholders?: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  suggestions = [],
  isSearching = false,
  placeholder = 'Cari...',
  className = '',
  showSuggestions = true,
  animatedPlaceholders = [],
}) => {
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Animate placeholder if animatedPlaceholders are provided and input is empty
  useEffect(() => {
    if (animatedPlaceholders.length > 0 && !value && !isFocused) {
      const interval = setInterval(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % animatedPlaceholders.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [animatedPlaceholders.length, value, isFocused]);

  // Show suggestions when user is typing and there are suggestions
  useEffect(() => {
    setShowSuggestionsList(
      showSuggestions && 
      value.length > 1 && 
      suggestions.length > 0 && 
      document.activeElement === inputRef.current
    );
  }, [value, suggestions.length, showSuggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestionsList) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          onChange(suggestions[selectedSuggestionIndex]);
          setShowSuggestionsList(false);
          setSelectedSuggestionIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setSelectedSuggestionIndex(-1);
  };

  // Handle clear
  const handleClear = () => {
    onClear();
    setShowSuggestionsList(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestionsList(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base z-10" />
        
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (value.length > 1 && suggestions.length > 0) {
                setShowSuggestionsList(true);
              }
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            placeholder={value || animatedPlaceholders.length === 0 ? placeholder : ''}
            className="w-full pl-10 md:pl-12 pr-12 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base transition-colors"
          />
          
          {/* Animated Placeholder */}
          {!value && animatedPlaceholders.length > 0 && !isFocused && (
            <div className="absolute left-10 md:left-12 top-1/2 transform -translate-y-1/2 pointer-events-none overflow-hidden h-5 md:h-6 w-[calc(100%-3rem)] md:w-[calc(100%-4rem)]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPlaceholderIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400 text-sm md:text-base whitespace-nowrap block"
                >
                  Search for &quot;{animatedPlaceholders[currentPlaceholderIndex]}&quot;
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Loading/Clear Button */}
        <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <FaSpinner className="animate-spin text-gray-400 text-sm md:text-base" />
          ) : value ? (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm md:text-base transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                index === selectedSuggestionIndex
                  ? 'bg-gray-100 dark:bg-gray-600'
                  : ''
              } ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${
                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <FaSearch className="inline mr-2 text-xs text-gray-400" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;