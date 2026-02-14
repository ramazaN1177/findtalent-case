import React from "react";
import { Box } from "@mui/material";

type MainContentWithDecorProps = {
  children: React.ReactNode;
};

/**
 * Navbar/Hero ile Footer arasında kalan ana içerik alanı.
 * Tüm sayfalarda bu alanda 3 dekoratif arka plan görseli gösterilir (scroll ile birlikte).
 */
export const MainContentWithDecor: React.FC<MainContentWithDecorProps> = ({
  children,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        src="/group-12@3x.png"
        srcSet="/group-12@2x.png 2x, /group-12@3x.png 3x"
        alt=""
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "-40px",
          left: 0,
          width: { xs: "min(410px, 85vw)", md: 410 },
          height: { xs: "auto", md: 368 },
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/group-13@3x.png"
        srcSet="/group-13@2x.png 2x, /group-13@3x.png 3x"
        alt=""
        aria-hidden
        sx={{
          position: "absolute",
          top: { xs: "clamp(112px, 18vw, 200px)", md: "clamp(160px, 14vw, 220px)" },
          left: 0,
          width: { xs: "min(263px, 70vw)", md: 263 },
          height: { xs: "auto", md: 338 },
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/group-19@3x.png"
        srcSet="/group-19@2x.png 2x, /group-19@3x.png 3x"
        alt=""
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 0, md: 24 },
          transform: "translateY(-50%)",
          width: { xs: "min(202px, 50vw)", md: 202 },
          height: { xs: "auto", md: 701 },
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
};
