import React from "react";
import { Box } from "@mui/material";

const LOGOS = [
    { src: "/1-acibadem@3x.png" },
    { src: "/2-akbank@3x.png" },
    { src: "/3-akcansa@3x.png" },
    { src: "/4-akkim@3x.png" },
    { src: "/5-akkok@3x.png" },
    { src: "/7-aktif-bank@3x.png" },
    { src: "/8-allianz@3x.png" },
    { src: "/9-anadolu-sigorta@3x.png" },
    { src: "/10-anel-grup@3x.png" },
    { src: "/arc-elik@3x.png" },
    { src: "/1280-px-bsh-bosch-und-siemens-hausgera-te-logo-svg-copy@3x.png" },
    { src: "/bezmia-lem-vak-f-u-niversitesi-logosu@3x.png" },
    { src: "/ronesans-holding@3x.jpg" },
    { src: "/1280-px-tav-airports-holding-logo-svg@3x.png" },
];

export const CompanyLogos: React.FC = () => {
    return (
        <Box>
            <Box sx={{
                width: "100%",
                maxWidth: { xs: 1200, md: "none" },
                mx: "auto",
                px: { xs: 2, md: "150px" },
                margin: "40px 0 0",
            }}>
                <Box
                    sx={{
                        margin: "0 20px",
                        borderRadius: "20px",
                        backgroundColor: "#f7f6f6",
                        padding: "30px 18px",
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",  
                            sm: "repeat(4, 1fr)",  
                            md: "repeat(7, 1fr)",  
                        },
                        gap: { xs: 2, sm: 2, md: 3 }, 
                        alignItems: "center",
                        justifyItems: "center",
                    }}
                >
                    {LOGOS.map((logo) => (
                        <Box
                            key={logo.src}
                            component="img"
                            src={logo.src}
                            alt=""
                            sx={{
                                width: "100%",
                                maxWidth: { xs: "120px", sm: "140px", md: "180px" },
                                height: "auto",
                                maxHeight: "95px",
                                objectFit: "contain",
                            }}
                        />
                    ))}
                </Box>

            </Box>
        </Box>
    );
};