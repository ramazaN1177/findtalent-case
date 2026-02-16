"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Header } from "@/components/common/Header/Header";
import { Button } from "@/components/common/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        transition: "background-color 0.2s, box-shadow 0.2s",
        "&:hover": {
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(67, 97, 238, 0.4)",
            },
        },
        "&.Mui-focused": {
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
                borderColor: "#4361ee",
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.08)",
        },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#4361ee" },
};

export default function Register() {
    const { t } = useLanguage();
    const { register, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/profile");
        }
    }, [isLoading, isAuthenticated, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const fn = firstname.trim();
        const ln = lastname.trim();
        const em = email.trim();
        if (!fn || !ln) {
            setError("Ad ve soyad gereklidir.");
            return;
        }
        if (!em) {
            setError("E-posta adresi gereklidir.");
            return;
        }
        if (!password) {
            setError("Şifre gereklidir.");
            return;
        }
        if (password.length < 6) {
            setError("Şifre en az 6 karakter olmalıdır.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            return;
        }
        const success = register(fn, ln, em, password);
        if (success) {
            router.push("/login?registered=1");
        } else {
            setError("Bu e-posta adresi zaten kayıtlı.");
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#4361ee" }}>
            <Header />

            <Box
                sx={{
                    minHeight: "calc(100vh - 100px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    py: 4,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        px: { xs: 2.5, sm: 4 },
                        py: 4,
                        transition: "box-shadow 0.2s ease",
                        "&:focus-within": {
                            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                        },
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#fff",
                            textAlign: "center",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.2,
                        }}
                    >
                        {t("header.signUp")}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 15,
                            color: "rgba(255, 255, 255, 0.85)",
                            textAlign: "center",
                            mt: 1,
                            mb: 3.5,
                        }}
                    >
                        Yeni hesap oluşturun
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    component="label"
                                    htmlFor="register-firstname"
                                    sx={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "rgba(255, 255, 255, 0.95)",
                                        mb: 0.75,
                                    }}
                                >
                                    Ad
                                </Typography>
                                <TextField
                                    id="register-firstname"
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    fullWidth
                                    autoComplete="given-name"
                                    error={!!error}
                                    placeholder="Adınız"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: "#4361ee", mr: 0.5 }}>
                                                    <PersonOutlinedIcon sx={{ fontSize: 22 }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputSx}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    component="label"
                                    htmlFor="register-lastname"
                                    sx={{
                                        display: "block",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "rgba(255, 255, 255, 0.95)",
                                        mb: 0.75,
                                    }}
                                >
                                    Soyad
                                </Typography>
                                <TextField
                                    id="register-lastname"
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    fullWidth
                                    autoComplete="family-name"
                                    error={!!error}
                                    placeholder="Soyadınız"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: "#4361ee", mr: 0.5 }}>
                                                    <PersonOutlinedIcon sx={{ fontSize: 22 }} />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputSx}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography
                                component="label"
                                htmlFor="register-email"
                                sx={{
                                    display: "block",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "rgba(255, 255, 255, 0.95)",
                                    mb: 0.75,
                                }}
                            >
                                E-posta adresi
                            </Typography>
                            <TextField
                                id="register-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                autoComplete="email"
                                error={!!error}
                                placeholder="ornek@firma.com"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: "#4361ee", mr: 0.5 }}>
                                                <EmailOutlinedIcon sx={{ fontSize: 22 }} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={inputSx}
                            />
                        </Box>

                        <Box>
                            <Typography
                                component="label"
                                htmlFor="register-password"
                                sx={{
                                    display: "block",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "rgba(255, 255, 255, 0.95)",
                                    mb: 0.75,
                                }}
                            >
                                Şifre
                            </Typography>
                            <TextField
                                id="register-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                autoComplete="new-password"
                                error={!!error}
                                placeholder="En az 6 karakter"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: "#4361ee", mr: 0.5 }}>
                                                <LockOutlinedIcon sx={{ fontSize: 22 }} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={inputSx}
                            />
                        </Box>

                        <Box>
                            <Typography
                                component="label"
                                htmlFor="register-confirm"
                                sx={{
                                    display: "block",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "rgba(255, 255, 255, 0.95)",
                                    mb: 0.75,
                                }}
                            >
                                Şifre tekrar
                            </Typography>
                            <TextField
                                id="register-confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                autoComplete="new-password"
                                error={!!error}
                                placeholder="Şifrenizi tekrar girin"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: "#4361ee", mr: 0.5 }}>
                                                <LockOutlinedIcon sx={{ fontSize: 22 }} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={inputSx}
                            />
                        </Box>

                        {error && (
                            <Box
                                sx={{
                                    backgroundColor: "rgba(244, 67, 54, 0.15)",
                                    borderRadius: "10px",
                                    px: 1.5,
                                    py: 1,
                                }}
                            >
                                <Typography sx={{ color: "#ffcdd2", fontSize: 13, fontWeight: 500 }}>
                                    {error}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            type="submit"
                            sx={{
                                mt: 0.5,
                                height: 52,
                                borderRadius: "14px",
                                width: "100%",
                                fontSize: 16,
                                fontWeight: 600,
                                textTransform: "none",
                            }}
                            backgroundColor="#fff"
                            color="#4361ee"
                            borderColor="#fff"
                            hoverBackgroundColor="rgba(255,255,255,0.9)"
                        >
                            Kayıt ol
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mt: 3,
                            pt: 3,
                            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                    >
                        <Typography sx={{ fontSize: 14, color: "rgba(255, 255, 255, 0.85)" }}>
                            Zaten hesabınız var mı?
                        </Typography>
                        <Link
                            href="/login"
                            style={{
                                color: "#fff",
                                fontWeight: 600,
                                textDecoration: "none",
                                fontSize: 14,
                            }}
                        >
                            {t("header.signIn")}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
