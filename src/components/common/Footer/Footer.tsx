
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Link, Typography, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/contexts/LanguageContext";

const divider = (
    <Box
        component="span"
        sx={{
            width: "1px",
            height: "14px",
            backgroundColor: "rgba(255,255,255,0.5)",
            mx: 1,
            display: "inline-block",
            verticalAlign: "middle",
        }}
    />
);

export const Footer: React.FC = () => {
    const router = useRouter();
    const { locale, setLocale, t } = useLanguage();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isProfilePage = router.pathname === "/profile";

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageSelect = (newLocale: Locale) => {
        setLocale(newLocale);
        setAnchorEl(null);
    };

    return (
        <Box
            component="footer"
            sx={{
                position: "relative",
                width: "100%",
                marginTop: "40px",
                backgroundColor: "#626160",
                borderBottom: "3px solid #e67e22",
            }}
        >
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
                            flexDirection: { xs: "column", md: "row" },
                            flexWrap: "wrap",
                            alignItems: { xs: "flex-start", md: "center" },
                            justifyContent: { md: "space-between" },
                            gap: { xs: 2, md: 0 },
                            fontSize: { xs: 12, md: 14 },
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        <Box>
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
                                ©2020 Finddeveloper.net
                            </Link>
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.privacyCenter")}
                            </Link>
                            {divider}
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.cookies")}
                            </Link>
                            {divider}
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.privacy")}
                            </Link>
                            {divider}
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.terms")}
                            </Link>
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.workAtFinddeveloper")}
                            </Link>
                            {divider}
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.aboutUs")}
                            </Link>
                            {divider}
                            <Link href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: "inherit" }}>
                                {t("footer.helpCenter")}
                            </Link>
                        </Box>

                        <Box
                            onClick={handleLanguageClick}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                color: "inherit",
                                fontSize: "inherit",
                            }}
                            aria-haspopup="true"
                            aria-controls="language-menu"
                            aria-expanded={anchorEl ? "true" : "false"}
                        >
                            {t("footer.language")}
                            <ExpandMoreIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                        </Box>
                    </Box>

                    <Menu
                        id="language-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        disableScrollLock
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                        PaperProps={{
                            sx: {
                                mt: 1.5,
                                minWidth: 140,
                                "& .MuiMenuItem-root": { fontSize: 14 },
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleLanguageSelect("tr")} selected={locale === "tr"}>
                            Türkçe
                        </MenuItem>
                        <MenuItem onClick={() => handleLanguageSelect("en")} selected={locale === "en"}>
                            English
                        </MenuItem>
                    </Menu>

                    {!isProfilePage && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "center", sm: "flex-start" },
                                gap: 2,
                                mt: { xs: 2, md: 3 },
                                pt: { xs: 2, md: 3 },
                                borderTop: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            <Box
                                component="img"
                                src="/iskur-logo@3x.png"
                                alt={t("footer.iskurAlt")}
                                sx={{
                                    width: { xs: 64, md: 80 },
                                    height: { xs: 64, md: 80 },
                                    flexShrink: 0,
                                    objectFit: "contain",
                                }}
                            />
                            <Typography
                                component="span"
                                sx={{
                                    width: { xs: "100%", sm: 450 },
                                    maxWidth: "100%",
                                    margin: { xs: "0", sm: "0 0 0 16px" },
                                    fontSize: { xs: "10px", sm: "8px" },
                                    fontWeight: "normal",
                                    fontStretch: "normal",
                                    fontStyle: "normal",
                                    lineHeight: 1.75,
                                    letterSpacing: "normal",
                                    color: "#fff",
                                    textAlign: { xs: "center", sm: "left" },
                                }}
                            >
                                {t("footer.iskurText").split("\n").map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i === 0 && <br />}
                                    </React.Fragment>
                                ))}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
