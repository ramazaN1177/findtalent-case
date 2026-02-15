"use client";

import React from "react";
import { Box } from "@mui/material";
import { HeroSection } from "@/components/home/HeroSection/HeroSection";
import { PopularSearches } from "@/components/home/PopularSearches/PopularSearches";
import { FeaturedJobs } from "@/components/home/FeaturedJobs/FeaturedJobs";
import { CompanyLogos } from "@/components/home/CompanyLogos/CompanyLogos";
import { Footer2 } from "@/components/common/Footer/Footer-2";
import { Footer } from "@/components/common/Footer/Footer";
import { MainContentWithDecor } from "@/components/common/MainContentWithDecor/MainContentWithDecor";

export default function Home() {

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
      <Footer2 />
      </MainContentWithDecor>
    <Footer />
    </Box>
  );
}
