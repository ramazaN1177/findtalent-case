import React, { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import { useLanguage } from "@/contexts/LanguageContext";

const FilterPanel = () => {
    const { t } = useLanguage();
    const [panelOpen, setPanelOpen] = useState(false);

    const triggerButton = (
        <Box
            onClick={() => setPanelOpen((o) => !o)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "12px 16px",
                border: "1px solid rgba(107, 121, 152, 0.3)",
                borderRadius: "8px",
                backgroundColor: "#fff",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(67, 97, 238, 0.04)" },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box component="img" src="/icon-filled-filter@3x.png" alt="filter" sx={{ width: 24, height: 24 }} />
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#6b7998" }}>{t("search.filter")}</Typography>
            </Box>
            <Box
                component="img"
                src="/icon-filled-angle-down@3x.png"
                alt=""
                sx={{ width: 16, height: 16, transform: panelOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
        </Box>
    );

    const desktopContent = (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box component="img" src="/icon-filled-filter@3x.png" alt="filter" sx={{ width: 24, height: 24 }} />
                    <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#6b7998" }}>{t("search.filter")}</Typography>
                    <Box component="img" src="/icon-filled-angle-down@3x.png" alt="arrow-down" sx={{ width: 16, height: 16 }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#6b7998" }}>{t("search.lastSearches")}</Typography>
                    <Box component="img" src="/icon-filled-angle-down@3x.png" alt="arrow-down" sx={{ width: 16, height: 16 }} />
                </Box>
                <Box sx={{ width: "1px", height: "24px", margin: "0 5px", border: "solid 1px rgba(107, 121, 152, 0.5)" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-start" }}>
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#4361ee" }}>Desing (0 {t("search.jobPostingFound")})</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#6b7998" }}>{t("search.isThisWhatYouMeant?")}</Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "#0d1822", textDecoration: "underline" }}>Design</Typography>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#fff",
                padding: "40px 0",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: { xs: 1200, md: "none" },
                    mx: "auto",
                    px: { xs: 1.5, sm: 2, md: "150px" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", md: "flex-start" },
                    gap: { xs: 2, md: 0 },
                    margin: { xs: "0 8px", sm: "0 20px", md: "0 20px" },
                }}
            >
                {/* Mobil/tablet: açılır panel */}
                <Box sx={{ display: { xs: "block", md: "none" }, width: "100%" }}>
                    {triggerButton}
                    <Collapse in={panelOpen}>
                        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#6b7998" }}>{t("search.lastSearches")}</Typography>
                                    <Box component="img" src="/icon-filled-angle-down@3x.png" alt="" sx={{ width: 16, height: 16 }} />
                                </Box>
                                <Box sx={{ width: "1px", height: "24px", border: "solid 1px rgba(107, 121, 152, 0.5)" }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#4361ee" }}>Desing (0 {t("search.jobPostingFound")})</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#6b7998" }}>{t("search.isThisWhatYouMeant?")}</Typography>
                                    <Typography sx={{ fontSize: 12, fontWeight: "bold", color: "#0d1822", textDecoration: "underline" }}>Design</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </Box>

                {/* Masaüstü: her zaman açık */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>{desktopContent}</Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center"} }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 500, color: "#6b7998" }}>{t("search.informMe")}</Typography>
                    <Box component="img" src="/noun-notification-1594276@3x.png" alt="" sx={{ width: 22, height: 24 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default FilterPanel