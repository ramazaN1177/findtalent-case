"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, TextField, Typography } from "@mui/material";
import { Header } from "@/components/common/Header/Header";
import { MainContentWithDecor } from "@/components/common/MainContentWithDecor/MainContentWithDecor";
import { Footer } from "@/components/common/Footer/Footer";
import { Button } from "@/components/common/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
    const { t } = useLanguage();
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/profile");
        }
    }, [isLoading, isAuthenticated, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email.trim() || !password) {
            setError("E-posta ve şifre gereklidir.");
            return;
        }
        const success = login(email.trim(), password);
        if (success) {
            router.push("/profile");
        } else {
            setError("E-posta veya şifre hatalı.");
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Header />

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 440,
                        mx: "auto",
                        px: 2,
                        py: { xs: 4, md: 6 },
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#333",
                            textAlign: "center",
                            mb: 3,
                        }}
                    >
                        {t("header.signIn")}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="E-posta"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            autoComplete="email"
                            error={!!error}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "14px",
                                },
                            }}
                        />
                        <TextField
                            label="Şifre"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            autoComplete="current-password"
                            error={!!error}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "14px",
                                },
                            }}
                        />
                        {error && (
                            <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            sx={{
                                mt: 1,
                                height: 48,
                                borderRadius: "14px",
                            }}
                            backgroundColor="#4361ee"
                            color="#fff"
                            borderColor="#4361ee"
                            hoverBackgroundColor="#3651c9"
                        >
                            {t("header.signIn")}
                        </Button>
                    </Box>

                    <Typography sx={{ textAlign: "center", mt: 3, fontSize: 14, color: "#666" }}>
                        Hesabınız yok mu?{" "}
                        <Link
                            href="/register"
                            style={{ color: "#4361ee", fontWeight: 600, textDecoration: "none" }}
                        >
                            {t("header.signUp")}
                        </Link>
                    </Typography>
                </Box>

        </Box>
    );
}
