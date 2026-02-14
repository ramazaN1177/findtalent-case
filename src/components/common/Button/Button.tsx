import React from 'react'
import MuiButton from '@mui/material/Button';

type ButtonProps = {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    padding?: number | string;
    margin?: number | string;
    borderRadius?: number | string;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    className?: string;
    hoverColor?: string;
    hoverBorderColor?: string;
    hoverBackgroundColor?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    component?: React.ElementType;
    href?: string;
    /** Buton içi görsel (text yerine) */
    imgSrc?: string;
    imgSrcSet?: string;
    imgAlt?: string;
    imgWidth?: number | string;
    imgHeight?: number | string;
} & Omit<React.ComponentProps<typeof MuiButton>, 'color'>;

export const Button: React.FC<ButtonProps> = ({
    children,
    width = 160,
    height = 56,
    padding = '16px 50px 15px',
    margin,
    borderRadius = '50px',
    color = '#4361ee',
    borderColor = '#4361ee',
    backgroundColor = 'transparent',
    hoverColor,
    hoverBorderColor,
    hoverBackgroundColor,
    className = '',
    imgSrc,
    imgSrcSet,
    imgAlt = '',
    imgWidth = 'auto',
    imgHeight = '100%',
    sx,
    ...rest
}) => {
    return (
        <MuiButton
            variant="contained"
            className={className}
            sx={{
                width,
                minHeight: height,
                padding,
                margin,
                borderRadius,
                border: `solid 1px ${borderColor}`,
                color,
                backgroundColor,
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                '&:hover': {
                    boxShadow: 'none',
                    ...(hoverColor && { color: hoverColor }),
                    ...(hoverBorderColor && { borderColor: hoverBorderColor }),
                    ...(hoverBackgroundColor && { backgroundColor: hoverBackgroundColor }),
                },
                ...sx,
            }}
            {...rest}
        >
            {imgSrc ? (
                <img
                    src={imgSrc}
                    srcSet={imgSrcSet}
                    alt={imgAlt}
                    style={{
                        width: imgWidth,
                        height: imgHeight,
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            ) : (
                children
            )}
        </MuiButton>
    )
}
