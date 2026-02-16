import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Box, InputBase, Paper, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import jobsData from '@/mock/jobs.json'
import type { JobItem } from '@/components/search/JobList/JobList'
import { useSearchContext } from '@/contexts/SearchContext'
import { useRouter } from 'next/router'

const MAX_SUGGESTIONS = 8

function filterJobs(jobs: JobItem[], query: string): JobItem[] {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  return jobs.filter(
    (job) =>
      job.jobName.toLowerCase().includes(q) ||
      job.companyName.toLowerCase().includes(q) ||
      job.jobLocation.toLowerCase().includes(q)
  ).slice(0, MAX_SUGGESTIONS)
}

type SearchBarProps = {
    placeholder?: string;
    firstLabel?: string;
    width?: number | string;
    height?: number | string;
    padding?: number | string;
    margin?: number | string;
    borderRadius?: number | string;
    border?: string;
    borderColor?: string;
    backgroundColor?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    sx?: object;
};

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    firstLabel,
    width = '100%',
    height = 56,
    padding = '12px 20px',
    margin = '0',
    borderRadius = 28,
    border,
    borderColor,
    backgroundColor = '#fff',
    value = '',
    onChange,
    onSearch,
    sx,
}) => {
    const router = useRouter()
    const { setSelectedJob } = useSearchContext()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const jobs = useMemo(() => jobsData as JobItem[], [])
    const suggestions = useMemo(() => filterJobs(jobs, value), [jobs, value])
    const showDropdown = dropdownOpen && value.trim().length > 0 && suggestions.length > 0

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSuggestionClick = (job: JobItem) => {
        setSelectedJob(job)
        setDropdownOpen(false)
        onChange?.('')
        router.push('/search')
    }

    return (
        <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%' }}>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch?.(value);
                }}
                sx={{
                    width,
                    height,
                    padding,
                    margin,
                    borderRadius,
                    ...(border && { border }),
                    ...(borderColor && { borderColor }),
                    backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    ...(sx as Record<string, unknown>),
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 24, height: 24, color: '#808285' }}>
                    <SearchIcon />
                </Box>
                {firstLabel != null && firstLabel !== '' && (
                    <Box
                        component="span"
                        sx={{
                            flexShrink: 0,
                            margin: '1px 10px 0 20px',
                            fontFamily: 'MarkPro, sans-serif',
                            fontSize: 18,
                            fontWeight: 'normal',
                            lineHeight: 'normal',
                            color: '#808285',
                            whiteSpace: 'nowrap',
                        }}>
                        {firstLabel}
                    </Box>
                )}
                {firstLabel != null && firstLabel !== '' && (
                    <Box
                        sx={{
                            width: '1px',
                            height: 24,
                            flexShrink: 0,
                            margin: '0 9px 0 10px',
                            border: 'solid 1px #808285',
                        }}
                    />
                )}

                <InputBase
                    placeholder={placeholder}
                    value={value}
                    onFocus={() => setDropdownOpen(true)}
                    onChange={(e) => {
                        onChange?.(e.target.value);
                        setDropdownOpen(true);
                    }}
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        fontFamily: 'MarkPro, sans-serif',
                        fontSize: 16,
                        color: '#212121',
                        '& .MuiInputBase-input': {
                            padding: 0,
                            '&::placeholder': {
                                color: '#808285',
                                opacity: 1,
                            },
                        },
                    }}
                    inputProps={{ 'aria-label': 'search', 'aria-expanded': showDropdown }}
                />
            </Box>

            {showDropdown && (
                <Paper
                    elevation={4}
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        mt: 0.5,
                        maxHeight: 320,
                        overflowY: 'auto',
                        borderRadius: 2,
                        zIndex: 1300,
                        '&::-webkit-scrollbar': { width: 6 },
                        '&::-webkit-scrollbar-thumb': { borderRadius: 3, backgroundColor: '#d4dae6' },
                    }}
                >
                    {suggestions.map((job) => (
                        <Box
                            key={job.id}
                            onClick={() => handleSuggestionClick(job)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(job)}
                            sx={{
                                px: 2,
                                py: 1.5,
                                cursor: 'pointer',
                                borderBottom: '1px solid rgba(107, 121, 152, 0.15)',
                                transition: 'background-color 0.2s',
                                '&:last-of-type': { borderBottom: 'none' },
                                '&:hover': { backgroundColor: '#f0f3ff' },
                            }}
                        >
                            <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#4361ee' }}>
                                {job.jobName}
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: '#6b7998' }}>
                                {job.companyName} · {job.jobLocation}
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            )}
        </Box>
    )
}
