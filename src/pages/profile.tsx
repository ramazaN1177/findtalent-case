import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "@/components/common/Header/Header";
import { MainContentWithDecor } from "@/components/common/MainContentWithDecor/MainContentWithDecor";
import { Footer } from "@/components/common/Footer/Footer";

export default function Profile() {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Header
                user={{
                    name: "Eray Karakullukçu",
                    title: "findtalent'de Kurucu",
                    avatar: "/avatar.png",
                }}
            />

            <MainContentWithDecor>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5">Profil Sayfası</Typography>
                </Box>
            </MainContentWithDecor>

            <Footer />
        </Box>
    );
}
