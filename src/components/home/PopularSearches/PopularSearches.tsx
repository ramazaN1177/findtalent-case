"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getPopularSearches, type PopularSearchItem } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export const PopularSearches: React.FC = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<PopularSearchItem[]>([]);

  useEffect(() => {
    getPopularSearches().then(setItems).catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(107, 121, 152, 0.05)",
        py: 3,
        overflow: "hidden",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            overflow: "hidden",
            margin: "0 20px",
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              fontSize: 20,
              fontWeight: 900,
              color: "#666768",
            }}
          >
            {t("popularSearches.title")}
          </Box>

          <Box
            sx={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
              "& > *": {
                WebkitMaskImage: "none",
                maskImage: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                animation: "scrollRight 40s linear infinite",
                animationIterationCount: "infinite",
              }}
            >
              {[...items, ...items, ...items, ...items].map((item, index) => (
                <Box
                  key={`${item.id}-${item.label}-${index}`}
                  component="button"
                  sx={{
                    flexShrink: 0,
                    width: 150,
                    height: 50,
                    margin: "0 17px 0 0",
                    padding: "15px 26px 15px 30px",
                    borderRadius: 28,
                    border: "solid 1px rgba(191, 191, 191, 0.7)",
                    backgroundColor: "#e9e9e9",
                    color: "#666768",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "#d8d8d8",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
