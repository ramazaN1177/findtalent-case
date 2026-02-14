"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box } from "@mui/material";
import { Header } from "@/components/common/Header/Header";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Button } from "@/components/common/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        // TODO: arama işlemi
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* BG image — desktop: doğal akış, mobil: cover */}
            <Box
                component="img"
                src="/bg@3x.png"
                srcSet="/bg@2x.png 2x, /bg@3x.png 3x"
                alt=""
                sx={{
                    pointerEvents: "none",
                    display: { xs: "none", md: "block" },
                    width: "100%",
                    height: "auto",
                }}
            />
            <Box
                component="img"
                src="/bg.png"
                srcSet="/bg@2x.png 2x, /bg@3x.png 3x"
                alt=""
                aria-hidden="true"
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                }}
            />

            {/* Content — desktop: absolute, mobil: relative */}
            <Box
                sx={{
                    position: { xs: "relative", md: "absolute" },
                    top: { md: 0 },
                    left: { md: 0 },
                    right: { md: 0 },
                    bottom: { md: 0 },
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Header — sadece nav bar */}
                <Header bgColor="transparent" showLogo={false} />

                {/* Hero content */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        px: "clamp(12px, 3vw, 32px)",
                        pb: "clamp(12px, 1.5vw, 16px)",
                    }}
                >
                    {/* Logo */}
                    <Box
                        component="img"
                        src="/logo@3x.png"
                        srcSet="/logo@2x.png 2x, /logo@3x.png 3x"
                        alt="Logo"
                        sx={{
                            width: "min(100%, 706px)",
                            height: "auto",
                            maxHeight: "clamp(30px, 7vw, 96px)",
                            objectFit: "contain",
                            mb: "clamp(6px, 1.5vw, 20px)",
                        }}
                    />

                    {/* Header text */}
                    <Box
                        component="img"
                        src="/header-text@3x.png"
                        srcSet="/header-text@2x.png 2x, /header-text@3x.png 3x"
                        alt=""
                        sx={{
                            width: "min(100%, 460px)",
                            height: "auto",
                            maxHeight: "clamp(18px, 4vw, 50px)",
                            objectFit: "contain",
                            mb: "clamp(10px, 2vw, 24px)",
                        }}
                    />

                    {/* Search row */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "stretch", sm: "flex-start" },
                            gap: "clamp(8px, 1vw, 15px)",
                            width: "100%",
                            maxWidth: 734,
                        }}
                    >
                        <SearchBar
                            firstLabel={t("hero.searchJobs")}
                            placeholder={t("hero.placeholder")}
                            value={searchValue}
                            onChange={setSearchValue}
                            onSearch={handleSearch}
                            borderRadius={28}
                            padding="0 20px"
                            sx={{
                                flex: { sm: 1 },
                                height: "clamp(36px, 4vw, 56px)",
                                borderRadius: "clamp(18px, 2vw, 28px)",
                            }}
                        />
                        {/* Buton + Detaylı Arama */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button
                                onClick={handleSearch}
                                padding="0 40px"
                                backgroundColor="#fff"
                                borderColor="#fff"
                                hoverBackgroundColor="rgba(255,255,255,0.85)"
                                imgSrc="/group-6.png"
                                imgSrcSet="/group-6@2x.png 2x, /group-6@3x.png 3x"
                                imgAlt={t("hero.searchAlt")}
                                imgHeight="clamp(14px, 1.8vw, 25px)"
                                sx={{
                                    width: { xs: "100%", sm: 160 },
                                    minHeight: "clamp(36px, 4vw, 56px)",
                                    borderRadius: "clamp(18px, 2vw, 28px)",
                                }}
                            />
                            <Box
                                component={Link}
                                href="/detayli-arama"
                                sx={{
                                    mt: "clamp(4px, 0.5vw, 8px)",
                                    color: "#fff",
                                    fontSize: "clamp(10px, 1vw, 14px)",
                                    textDecoration: "underline",
                                    textUnderlineOffset: 3,
                                    cursor: "pointer",
                                    "&:hover": { opacity: 0.8 },
                                }}
                            >
                                {t("hero.detailedSearch")}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
