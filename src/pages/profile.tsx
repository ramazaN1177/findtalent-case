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
                        {/* Buton + Detaylı Arama */}
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
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: { xs: 1200, md: "none" },
                        mx: "auto",
                        px: { xs: 2, md: "150px" },
                    }}
                >
                    <Box sx={{ margin: "0 20px", py: { xs: 2, md: 3 } }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center", // veya "flex-start"
                                gap: 98,
                                width: "100%",
                            }}
                        >
                            <Box sx={{ width: 260, flexShrink: 0 }}>
                                <Box
                                    sx={{
                                        width: 260,
                                        height: 260,
                                        backgroundColor: "#eff1f6",
                                        borderRadius: "12px",
                                        border: "1px solid #4361ee",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box component="img" src={user.avatar} alt={`${user.firstname} ${user.lastname}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#333", mb: 1 }}>
                                    {user.firstname} {user.lastname}
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>{user.title}</Typography>
                                <Typography sx={{ fontSize: 13, color: "#666", mb: 1 }}>{user.company} · {user.location}</Typography>
                                <Typography sx={{ fontSize: 13, color: "#666", mb: 2 }}>{user.email} · {user.phone}</Typography>
                                {user.profileContent?.map((block) => (
                                    <Box key={block.id} sx={{ mb: 2 }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#333", mb: 0.5 }}>
                                            {block.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, color: "#555", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                                            {block.content}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                    </Box>



                </Box>
            </MainContentWithDecor>

            <Footer />
        </Box>
    );
}
