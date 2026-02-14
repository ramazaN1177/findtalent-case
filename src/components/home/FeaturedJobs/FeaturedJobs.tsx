"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getFeaturedJobs, type FeaturedJobItem } from "@/services/api";
import { Box, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLanguage } from "@/contexts/LanguageContext";

const SCROLL_THRESHOLD = 2;

export const FeaturedJobs: React.FC = () => {
    const { t } = useLanguage();
    const [items, setItems] = useState<FeaturedJobItem[]>([]);
    const [atStart, setAtStart] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const visibleCount = isPhone ? 1 : isTablet ? 3 : items.length;

    useEffect(() => {
        getFeaturedJobs().then(setItems);
    }, []);

    const updateAtStart = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;
        setAtStart(container.scrollLeft <= SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        updateAtStart();
        container.addEventListener("scroll", updateAtStart, { passive: true });
        return () => container.removeEventListener("scroll", updateAtStart);
    }, [items, visibleCount, updateAtStart]);

    const scroll = useCallback(
        (direction: "left" | "right") => {
            if (!scrollRef.current) return;
            const container = scrollRef.current;
            const cardWidth = container.clientWidth / visibleCount;
            const amount = cardWidth * visibleCount;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            if (direction === "right") {
                if (container.scrollLeft >= maxScrollLeft - 2) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: amount, behavior: "smooth" });
                }
            } else {
                container.scrollBy({ left: -amount, behavior: "smooth" });
            }
        },
        [visibleCount]
    );

    const cardWidthSx = {
        xs: "100%",
        sm: `${100 / 3}%`,
        md: `${100 / items.length}%`,
    };

    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                px: { xs: 2, md: "150px" },
            }}
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#666768",
                    margin: "40px 20px 0",
                }}
            >
                {t("featuredJobs.title")}
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    margin: "15px 20px 0",
                }}
            >
                <IconButton
                    disabled={atStart}
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        left: -20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        width: 40,
                        height: 40,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "#f5f5f5",
                            color: "#bbb",
                            borderColor: "#e0e0e0",
                        },
                    }}
                >
                    <ChevronLeftIcon sx={{ color: "#6b7998" }} />
                </IconButton>

                <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                        position: "absolute",
                        right: -20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        width: 40,
                        height: 40,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                    }}
                >
                    <ChevronRightIcon sx={{ color: "#6b7998" }} />
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        minHeight: "140px",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "solid 1px #ccc",
                        display: "flex",
                        alignItems: "stretch",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        scrollSnapType: "x mandatory",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {items.map((item, index) => (
                        <Box
                            key={`featured-job-${index}`}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                width: cardWidthSx,
                                px: "20px",
                                py: "15px",
                                boxSizing: "border-box",
                                scrollSnapAlign: "start",
                                borderRight:
                                    index < items.length - 1
                                        ? "1px solid rgba(107, 121, 152, 0.2)"
                                        : "none",
                            }}
                        >
                            <Typography
                                sx={{
                                    width: "100%",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#666768",
                                    lineHeight: 1.3,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                    mb: 0.5,
                                }}
                            >
                                {t(`featuredJobs.jobs.${index}.jobTitle`)}
                            </Typography>
                            <Typography
                                sx={{
                                    width: "100%",
                                    fontSize: 13,
                                    fontWeight: "normal",
                                    color: "#6b7998",
                                    lineHeight: 1.3,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                    mb: 2,
                                }}
                            >
                                {t(`featuredJobs.jobs.${index}.companyName`)}
                            </Typography>
                            <Box
                                component="img"
                                src={item.logoPaths[2]}
                                alt={t(`featuredJobs.jobs.${index}.companyName`)}
                                sx={{
                                    maxWidth: "100%",
                                    height: 30,
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};