import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

interface SearchableItem {
  id?: string | number;
  name?: string;
  title?: string;
  description?: string;
  category?: string;
  [key: string]: any;
}

interface UseSearchProps<T extends SearchableItem> {
  items: T[];
  searchFields?: (keyof T)[];
  debounceMs?: number;
  maxSuggestions?: number;
}

export function useSearch<T extends SearchableItem>({
  items,
  searchFields = ['name', 'description'],
  debounceMs = 300,
  maxSuggestions = 5,
}: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  
  // Create search results
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return items;
    }

    const normalizedSearch = debouncedSearchTerm.toLowerCase().trim();
    
    return items.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(normalizedSearch);
        }
        return false;
      });
    });
  }, [items, debouncedSearchTerm, searchFields]);

  // Create search suggestions based on partial matches
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      return [];
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const suggestionSet = new Set<string>();
    
    // Extract words from names that start with the search term
    items.forEach(item => {
      const name = (item.name || item.title || '').toLowerCase();
      const words = name.split(/\s+/);
      
      words.forEach(word => {
        if (word.startsWith(normalizedSearch) && word !== normalizedSearch) {
          suggestionSet.add(word);
        }
      });
      
      // Also add full names that contain the search term
      if (name.includes(normalizedSearch) && !name.startsWith(normalizedSearch)) {
        suggestionSet.add(item.name || item.title || '');
      }
    });

    return Array.from(suggestionSet).slice(0, maxSuggestions);
  }, [items, searchTerm, maxSuggestions]);

  // Highlight search terms in text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? `<mark class="bg-seltronik-yellow/30 px-1 rounded">${part}</mark>`
        : part
    ).join('');
  };

  // Handle search term change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(true);
    
    // Reset searching state after debounce
    setTimeout(() => {
      setIsSearching(false);
    }, debounceMs + 50);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    searchResults,
    suggestions,
    isSearching,
    setSearchTerm: handleSearchChange,
    clearSearch,
    highlightText,
    hasResults: searchResults.length > 0,
    hasSearch: debouncedSearchTerm.trim().length > 0,
  };
}