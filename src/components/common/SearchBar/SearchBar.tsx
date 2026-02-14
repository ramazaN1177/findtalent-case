import React from 'react'
import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

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
    return (
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
                onChange={(e) => onChange?.(e.target.value)}
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
                inputProps={{ 'aria-label': 'search' }}
            />
        </Box>
    )
}
