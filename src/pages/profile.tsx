import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Link, Typography } from "@mui/material";
import { Header } from "@/components/common/Header/Header";
import { MainContentWithDecor } from "@/components/common/MainContentWithDecor/MainContentWithDecor";
import { Footer } from "@/components/common/Footer/Footer";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Button } from "@/components/common/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar/ProfileSidebar";

export default function Profile() {
    const { t } = useLanguage();
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    const handleSearch = () => {
        // TODO: arama işlemi
    };

    if (isLoading || !user) {
        return null;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Header />

            <MainContentWithDecor>
                <Box
                    sx={{
                        width: "100%",
                        backgroundColor: "#f5f7ff",
                        padding: "20px 0",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "stretch", sm: "flex-start" },
                            justifyContent: "center",
                            gap: "clamp(8px, 1vw, 15px)",
                            width: "100%",
                            maxWidth: 734,
                            mx: "auto",
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
                                minWidth: 798,
                                flex: { sm: 1 },
                                height: "clamp(36px, 4vw, 56px)",
                                borderRadius: "clamp(18px, 2vw, 28px)",
                            }}
                        />

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button
                                onClick={handleSearch}
                                padding="0 40px"
                                backgroundColor="#fff"
                                borderColor="#fff"
                                hoverBackgroundColor="rgba(255,255,255,0.85)"
                                imgSrc="/group-6@3x.png"
                                imgSrcSet="/group-6@2x.png 2x, /group-6@3x.png 3x"
                                imgAlt={t("hero.searchAlt")}
                                imgHeight="clamp(14px, 1.8vw, 25px)"
                                sx={{
                                    width: { xs: "100%", sm: 160 },
                                    minHeight: "clamp(36px, 4vw, 56px)",
                                    borderRadius: "clamp(18px, 2vw, 28px)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100%",
                    maxWidth: { xs: 1200, md: "none" },
                    mx: "auto",
                    px: { xs: 2, md: "150px" },
                }}>
                    <Box sx={{ margin: "0 20px", py: { xs: 2, md: 3 } }}>
                        <ProfileSidebar />
                    </Box>

                </Box>

            </MainContentWithDecor>

            <Footer />
        </Box>
    );
}
