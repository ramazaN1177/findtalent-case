"use client";

import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { PopularSearches } from "@/components/home/PopularSearches/PopularSearches";
import { FeaturedJobs } from "@/components/home/FeaturedJobs/FeaturedJobs";
import { CompanyLogos } from "@/components/home/CompanyLogos/CompanyLogos";
import { Footer } from "@/components/common/Footer/Footer";
import { MainContentWithDecor } from "@/components/common/MainContentWithDecor/MainContentWithDecor";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, tArray } = useLanguage();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <HeroSection />
      <MainContentWithDecor>
      <PopularSearches />
      <FeaturedJobs />
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 1200, md: "none" },
          mx: "auto",
          px: { xs: 2, md: "150px" },
          margin: "40px 0 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: "32px",
            alignItems: { xs: "stretch", sm: "stretch" },
            margin: "0 20px",
          }}
        >
          <Box
            component="img"
            src={"/ara@3x.png"}
            sx={{
              flex: { xs: "none", sm: 1 },
              width: { xs: "100%", sm: "auto" },
              minWidth: 0,
              height: "auto",
              objectFit: "contain",
              objectPosition: { xs: "center", sm: "left center" },
            }}
          />
          <Box
            component="img"
            src={"/veren@3x.png"}
            sx={{
              flex: { xs: "none", sm: 1 },
              width: { xs: "100%", sm: "auto" },
              minWidth: 0,
              height: "auto",
              objectFit: "contain",
              objectPosition: { xs: "center", sm: "right center" },
            }}
          />
        </Box>
      </Box>
      <CompanyLogos />
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
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#666768",
                  marginTop: 2,
                }}
              >
                {t("home.popularCategories")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0 0",
                }}
              >
                {tArray("home.categories").map((label) => (
                  <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                    <Link
                      href="/search"
                      sx={{
                        color: "#8a8d90",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textDecoration: "none",
                        "&:hover": { color: "#6b7998", textDecoration: "underline" },
                      }}
                    >
                      {label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#666768",
                  marginTop: 2,
                }}
              >
                {t("home.popularTitles")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0 0",
                }}
              >
                {tArray("home.titles").map((label) => (
                  <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                    <Link
                      href="/search"
                      sx={{
                        color: "#8a8d90",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textDecoration: "none",
                        "&:hover": { color: "#6b7998", textDecoration: "underline" },
                      }}
                    >
                      {label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#666768",
                  marginTop: 2,
                }}
              >
                {t("home.popularLocations")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0 0",
                }}
              >
                {tArray("home.locations").map((label) => (
                  <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                    <Link
                      href="/search"
                      sx={{
                        color: "#8a8d90",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textDecoration: "none",
                        "&:hover": { color: "#6b7998", textDecoration: "underline" },
                      }}
                    >
                      {label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#666768",
                  marginTop: 2,
                }}
              >
                {t("home.popularCompanyListings")}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0 0",
                }}
              >
                {tArray("home.companies").map((label) => (
                  <Box key={label} component="li" sx={{ padding: "6px 0" }}>
                    <Link
                      href="/search"
                      sx={{
                        color: "#8a8d90",
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textDecoration: "none",
                        "&:hover": { color: "#6b7998", textDecoration: "underline" },
                      }}
                    >
                      {label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      </MainContentWithDecor>
    <Footer />
    </Box>
  );
}
