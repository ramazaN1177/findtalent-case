'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { JobItem } from '@/components/search/JobList/JobList';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedJob: JobItem | null;
  setSelectedJob: (job: JobItem | null) => void;
  clearSelectedJob: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  const clearSelectedJob = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedJob,
        setSelectedJob,
        clearSelectedJob,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return ctx;
}
