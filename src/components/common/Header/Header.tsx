"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, IconButton, Drawer, Typography, Avatar, Button as MuiButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@/components/common/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

type User = {
    name: string;
    title: string;
    avatar?: string;
};

type HeaderProps = {
    /** Arka plan resmi (opsiyonel — verilirse bgColor yerine kullanılır) */
    bgSrc?: string;
    bgSrcSet?: string;
    /** Arka plan rengi — varsayılan #4361ee, "transparent" verilirse dekoratif görseller gizlenir */
    bgColor?: string;
    /** Header yüksekliği — verilirse overflow: hidden ile kırpılır */
    bgHeight?: number | string;
    /** Logo gösterilsin mi — varsayılan true */
    showLogo?: boolean;
    /** Giriş yapmış kullanıcı — verilmezse AuthContext'ten okunur; yoksa Kayıt Ol / Giriş Yap gösterilir */
    user?: User;
};

export const Header: React.FC<HeaderProps> = ({
    bgSrc,
    bgSrcSet,
    bgColor = "#4361ee",
    bgHeight,
    showLogo = true,
    user: userProp,
}) => {
    const { t } = useLanguage();
    const { user: authUser, logout } = useAuth();
    const router = useRouter();
    const user = userProp ?? (authUser ? { name: `${authUser.firstname} ${authUser.lastname}`, title: authUser.title, avatar: authUser.avatar } : undefined);
    const showDecor = bgColor !== "transparent";
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const profileMenuOpen = Boolean(profileAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };
    const handleProfileClick = () => {
        handleProfileMenuClose();
        router.push("/profile");
    };
    const handleLogoutClick = () => {
        handleProfileMenuClose();
        setMenuOpen(false);
        logout();
        router.push("/");
    };

    return (
        <>
            <Box
                component="header"
                sx={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: bgColor,
                    height: bgHeight ?? 100,
                }}
            >
                {/* BG image (opsiyonel — verilirse renk üstüne biner) */}
                {bgSrc && (
                    <Box
                        component="img"
                        src={bgSrc}
                        srcSet={bgSrcSet}
                        alt=""
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            pointerEvents: "none",
                            zIndex: 0,
                        }}
                    />
                )}

                {/* Dekoratif görseller — sadece solid bg varken */}
                {showDecor && (
                    <>
                        <Box
                            component="img"
                            src="/group-27@3x.png"
                            srcSet="/group-27@2x.png 2x, /group-27@3x.png 3x"
                            alt=""
                            sx={{
                                position: "absolute",
                                left: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 178,
                                height: 100,
                                objectFit: "contain",
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />
                        <Box
                            component="img"
                            src="/group-20@3x.png"
                            srcSet="/group-20@2x.png 2x, /group-20@3x.png 3x"
                            alt=""
                            sx={{
                                position: "absolute",
                                left: "50%",
                                top: 0,
                                transform: "translateX(-50%)",
                                width: 82,
                                height: 70,
                                objectFit: "contain",
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />
                        <Box
                            component="img"
                            src="/group-22@3x.png"
                            srcSet="/group-22@2x.png 2x, /group-22@3x.png 3x"
                            alt=""
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 98,
                                height: 100,
                                objectFit: "contain",
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />
                    </>
                )}

                {/* Content row */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        pl: { xs: 2, md: showDecor ? "150px" : 4 },
                        pr: { xs: 2, md: showDecor ? "116px" : 4 },
                        py: 1,
                    }}
                >
                    {/* Spacer: sadece mobil ve tablette — logo ortalamak için */}
                    <Box sx={{ display: { xs: "block", sm: "block", md: "none" }, flex: 1, minWidth: 0 }} />

                    {/* Logo — mobil ve tablette ortada, masaüstünde solda */}
                    {showLogo && (
                        <Box
                            component={Link}
                            href="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: { xs: "center", sm: "center", md: "flex-start" },
                                textDecoration: "none",
                                flexShrink: 0,
                                flex: { xs: "none", sm: "none", md: "none" },
                            }}
                        >
                            <Box
                                component="img"
                                src="/logo@3x.png"
                                srcSet="/logo@2x.png 2x, /logo@3x.png 3x"
                                alt="Logo"
                                sx={{
                                    width: 190,
                                    height: 26,
                                    objectFit: "contain",
                                    mt: { xs: 1, md: 0 },
                                }}
                            />
                        </Box>
                    )}

                    {/* Right side: profile / auth — mobil/tablette flex:1 ile logo ortada kalır */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", flex: { xs: 1, sm: 1, md: 1 }, minWidth: 0 }}>
                    {user ? (
                        <>
                            {/* Desktop: Profil bilgisi — tıklanınca dropdown; hero'da (transparent) biraz solda */}
                            <Box
                                onClick={handleProfileMenuOpen}
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    alignItems: "center",
                                    gap: 1.5,
                                    cursor: "pointer",
                                }}
                                aria-controls={profileMenuOpen ? "profile-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={profileMenuOpen ? "true" : undefined}
                            >
                                <Box sx={{ textAlign: "right" }}>
                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            lineHeight: 1.3,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {user.name}
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                fontSize: 18,
                                                verticalAlign: "middle",
                                                ml: 0.3,
                                            }}
                                        />
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 12,
                                            lineHeight: 1.3,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {user.title}
                                    </Typography>
                                </Box>
                                <Avatar
                                    src={user.avatar}
                                    alt={user.name}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        border: "2px solid rgba(255,255,255,0.3)",
                                    }}
                                />
                            </Box>
                            <Menu
                                id="profile-menu"
                                anchorEl={profileAnchorEl}
                                open={profileMenuOpen}
                                onClose={handleProfileMenuClose}
                                disableScrollLock
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            minWidth: 180,
                                            mt: 1.5,
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                            border: "1px solid rgba(0,0,0,0.06)",
                                            py: 0.5,
                                        },
                                    },
                                }}
                                sx={{ "& .MuiList-root": { py: 0 } }}
                            >
                                <MenuItem
                                    onClick={handleProfileClick}
                                    sx={{
                                        gap: 1.5,
                                        py: 1.5,
                                        px: 2,
                                        fontSize: 14,
                                        "&:hover": { backgroundColor: "rgba(67, 97, 238, 0.08)" },
                                    }}
                                >
                                    <PersonOutlineIcon sx={{ fontSize: 20, color: "#4361ee" }} />
                                    Profil
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogoutClick}
                                    sx={{
                                        gap: 1.5,
                                        py: 1.5,
                                        px: 2,
                                        fontSize: 14,
                                        color: "#666",
                                        "&:hover": { backgroundColor: "rgba(214, 32, 32, 0.08)" },
                                    }}
                                >
                                    <LogoutIcon sx={{ fontSize: 20, color: "#666" }} />
                                    Çıkış yap
                                </MenuItem>
                            </Menu>

                            {/* Mobile: hamburger */}
                            <IconButton
                                onClick={() => setMenuOpen(true)}
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    color: "#fff",
                                }}
                                aria-label={t("header.openMenu")}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            {/* Desktop: Kayıt Ol / Giriş Yap */}
                            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, mr: "150px" }}>
                                <Button
                                    component={Link}
                                    href="/register"
                                    width="auto"
                                    height={36}
                                    padding="6px 20px"
                                    backgroundColor="transparent"
                                    color="#fff"
                                    borderColor="#fff"
                                    hoverBackgroundColor="rgba(255,255,255,0.1)"
                                >
                                    {t("header.signUp")}
                                </Button>
                                <Button
                                    component={Link}
                                    href="/login"
                                    width="auto"
                                    height={36}
                                    padding="6px 20px"
                                    backgroundColor="transparent"
                                    color="#fff"
                                    borderColor="#fff"
                                    hoverBackgroundColor="rgba(255,255,255,0.1)"
                                >
                                    {t("header.signIn")}
                                </Button>
                            </Box>

                            {/* Mobile: hamburger */}
                            <IconButton
                                onClick={() => setMenuOpen(true)}
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    color: "#fff",
                                }}
                                aria-label={t("header.openMenu")}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    )}
                    </Box>
                </Box>
            </Box>

            {/* Hamburger menü */}
            <Drawer
                anchor="right"
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                PaperProps={{
                    sx: { width: { xs: "100%", sm: 320 }, p: 3 },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                    <IconButton onClick={() => setMenuOpen(false)} aria-label={t("header.close")}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {user ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <Avatar
                            src={user.avatar}
                            alt={user.name}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Box sx={{ textAlign: "center" }}>
                            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                                {user.name}
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                                {user.title}
                            </Typography>
                        </Box>
                        <Button component={Link} href="/profile" sx={{ width: "100%" }}>
                            Profil
                        </Button>
                        <MuiButton
                            variant="outlined"
                            onClick={handleLogoutClick}
                            sx={{ width: "100%" }}
                        >
                            Çıkış yap
                        </MuiButton>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Button component={Link} href="/register" sx={{ width: "100%" }}>
                            {t("header.signUp")}
                        </Button>
                        <Button component={Link} href="/login" sx={{ width: "100%" }}>
                            {t("header.signIn")}
                        </Button>
                    </Box>
                )}
            </Drawer>
        </>
    );
};
