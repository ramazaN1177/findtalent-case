

import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { useLanguage } from "@/contexts/LanguageContext";

const linkSx = {
    color: "#8a8d90",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    textDecoration: "none",
    "&:hover": { color: "#6b7998", textDecoration: "underline" },
};

const listSx = {
    listStyle: "none",
    padding: 0,
    margin: "16px 0 0",
};

const columnTitleSx = {
    fontSize: 18,
    fontWeight: 900,
    color: "#666768",
    marginTop: 2,
};

export const Footer2: React.FC = () => {
    const { t, tArray } = useLanguage();

    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                px: { xs: 2, md: "150px" },
            }}
        >
            <Box sx={{ margin: "0 20px" }}>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: "#666768",
                        margin: "40px 0 0",
                    }}
                >
                    {t("home.jobListingsForYou")}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                        marginTop: 2,
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={columnTitleSx}>{t("home.popularCategories")}</Typography>
                        <Box component="ul" sx={listSx}>
                            {tArray("home.categories").map((label) => (
                                <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                                    <Link href="/search" sx={linkSx}>
                                        {label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={columnTitleSx}>{t("home.popularTitles")}</Typography>
                        <Box component="ul" sx={listSx}>
                            {tArray("home.titles").map((label) => (
                                <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                                    <Link href="/search" sx={linkSx}>
                                        {label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={columnTitleSx}>{t("home.popularLocations")}</Typography>
                        <Box component="ul" sx={listSx}>
                            {tArray("home.locations").map((label) => (
                                <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                                    <Link href="/search" sx={linkSx}>
                                        {label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={columnTitleSx}>{t("home.popularCompanyListings")}</Typography>
                        <Box component="ul" sx={listSx}>
                            {tArray("home.companies").map((label) => (
                                <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                                    <Link href="/search" sx={linkSx}>
                                        {label}
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
