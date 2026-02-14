import React from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const WEBSITE_ICONS: Record<string, React.ComponentType<{ sx?: object }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export const ProfileSidebar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <Box sx={{ maxWidth: "260px", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "260px",
          height: "260px",
          borderRadius: "12px",
          border: "1px solid #4361ee",
          backgroundColor: "#eff1f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="img" src={user?.avatar ?? "/group-3@3x.png"} alt="" sx={{ width: "100px", height: "auto" }} />
      </Box>
      <Box sx={{ margin: "15px 0", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "5px", width: "100%" }}>
          {/* Profil bilgileri */}
          <Typography variant="h6" sx={{ fontSize: "24px", color: "#4361ee" }}>
            {user ? `${user.firstname} ${user.lastname}` : ""}
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#6b7998" }}>
              {user ? `${user.title}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#6b7998" }}>
              {user ? `${user.location}` : ""}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontSize: "17px", color: "#6b7998" }}>
              {user ? `${user.email}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#6b7998" }}>
              {user ? `${user.phone}` : ""}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "9px", margin: "18px 9px 16px 1px" }}>
            <Box component="img" src="/shape@3x.png" alt="" sx={{ width: "16px", height: "auto", flexShrink: 0 }} />
            <Link
              href="#"
              underline="always"
              onClick={(e) => e.preventDefault()}
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontSize: "12px",
                fontWeight: 700,
                color: "#0d1822",
                textDecorationColor: "#6b7998",
                "&:hover": { color: "#4361ee", textDecorationColor: "#6b7998" },
              }}
            >
              {t("profile.downloadCv")}
            </Link>
          </Box>
          <Box>
            <Link
              href="#"
              underline="always"
              onClick={(e) => e.preventDefault()}
              sx={{
                fontFamily: '"Nunito", sans-serif',
                fontSize: "14px",
                fontWeight: 700,
                color: "#4361ee",
                textDecorationColor: "#6b7998",
                "&:hover": { color: "#4361ee", textDecorationColor: "#6b7998" },
              }}
            >
              {t("profile.editProfile")}
            </Link>
          </Box>
          <Box
            sx={{
              margin: "29.5px 0",
              width: "100%",
              height: "1px",
              border: "solid 1px rgba(107, 121, 152, 0.3)",
            }}
          />
          {/* Websites */}
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: "#4361ee",
                }}
              >
                {t("profile.website")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {(user?.websites ?? []).map((site) => {
                  const IconComponent = WEBSITE_ICONS[site.name] ?? LanguageIcon;
                  return (
                    <Link
                      key={site.id}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={site.name}
                      sx={{ color: "#6b7998", "&:hover": { color: "#4361ee" } }}
                    >
                      <IconButton size="small" aria-label={site.name} sx={{ padding: 0.5 }}>
                        <IconComponent sx={{ fontSize: 24 }} />
                      </IconButton>
                    </Link>
                  );
                })}
              </Box>
              <Box>
                <Link
                  href="#"
                  underline="always"
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#4361ee",
                    textDecorationColor: "#6b7998",
                    "&:hover": { color: "#4361ee", textDecorationColor: "#6b7998" },
                  }}
                >
                  {t("profile.edit")}
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              margin: "29.5px 0",
              width: "100%",
              height: "1px",
              border: "solid 1px rgba(107, 121, 152, 0.3)",
            }}
          />
          {/* Dokümanlar */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: "#4361ee",
                }}
              >
                {t("profile.documents")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
                {(user?.documents ?? []).map((doc) => {
                  const isPdf = doc.name.toLowerCase().endsWith(".pdf");
                  const FileIcon = isPdf ? PictureAsPdfIcon : DescriptionIcon;
                  return (
                    <Box
                      key={doc.id}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                      }}
                    >
                      <FileIcon sx={{ fontSize: 26, color: "#6b7998", flexShrink: 0 }} />
                      <Link
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: "18px",
                          color: "#6b7998",
                          margin: "0 8px 0 16px",
                          "&:hover": { color: "#4361ee" },
                        }}
                      >
                        {doc.name}
                      </Link>
                      <IconButton
                        size="small"
                        aria-label={t("profile.removeDocument")}
                        onClick={(e) => e.preventDefault()}
                        sx={{
                          padding: 0.25,
                          minWidth: 0,
                          flexShrink: 0,
                          marginLeft: "auto",
                          "&:hover": {
                            backgroundColor: "rgba(67, 97, 238, 0.08)",
                            "& img": { opacity: 0.9 },
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src="/icon-filled-cross@3x.png"
                          alt=""
                          sx={{ width: 16, height: 16, display: "block", transition: "opacity 0.2s" }}
                        />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
              <Box>
                <Link
                  href="#"
                  underline="always"
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#4361ee",
                    textDecorationColor: "#6b7998",
                    "&:hover": { color: "#4361ee", textDecorationColor: "#6b7998" },
                  }}
                >
                  {t("profile.addAnotherDocument")}
                </Link>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              margin: "29.5px 0",
              width: "100%",
              height: "1px",
              border: "solid 1px rgba(107, 121, 152, 0.3)",
            }}
          />
          {/* Kaydedilen Aramalarım */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: "#4361ee",
                }}
              >
                {t("profile.savedSearches")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
                {(user?.savedSearches ?? []).map((search) => (
                  <Box
                    key={search.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src="/noun-job-3701612@3x.png"
                      alt=""
                      sx={{ width: 24, height: 24, flexShrink: 0 }}
                    />
                    <Typography
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "18px",
                        fontWeight: 400,
                        color: "#6b7998",
                        margin: 0,
                      }}
                    >
                      {search.name}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label={t("profile.removeDocument")}
                      onClick={(e) => e.preventDefault()}
                      sx={{
                        padding: 0.25,
                        minWidth: 0,
                        flexShrink: 0,
                        marginLeft: "auto",
                        "&:hover": {
                          backgroundColor: "rgba(67, 97, 238, 0.08)",
                          "& img": { opacity: 0.9 },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src="/icon-filled-cross@3x.png"
                        alt=""
                        sx={{ width: 16, height: 16, display: "block", transition: "opacity 0.2s" }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              margin: "29.5px 0",
              width: "100%",
              height: "1px",
              border: "solid 1px rgba(107, 121, 152, 0.3)",
            }}
          />
          {/* Basvurularim */}
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 800,
                  color: "#4361ee",
                }}
              >
                {t("profile.myApplications")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
                {(user?.myApplications ?? []).map((application) => (
                  <Box
                    key={application.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src="/noun-document-and-paper-2063766@3x.png"
                      alt=""
                      sx={{ width: 18, height: 24, flexShrink: 0 }}
                    />
                    <Typography
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "18px",
                        fontWeight: 400,
                        color: "#6b7998",
                        margin: 0,
                      }}
                    >
                      {application.name}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label={t("profile.removeDocument")}
                      onClick={(e) => e.preventDefault()}
                      sx={{
                        padding: 0.25,
                        minWidth: 0,
                        flexShrink: 0,
                        marginLeft: "auto",
                        "&:hover": {
                          backgroundColor: "rgba(67, 97, 238, 0.08)",
                          "& img": { opacity: 0.9 },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src="/icon-filled-cross@3x.png"
                        alt=""
                        sx={{ width: 16, height: 16, display: "block", transition: "opacity 0.2s" }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box>
                  <Link
                    href="#"
                    underline="always"
                    onClick={(e) => e.preventDefault()}
                    sx={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#4361ee",
                      textDecorationColor: "#6b7998",
                      "&:hover": { color: "#4361ee", textDecorationColor: "#6b7998" },
                    }}
                  >
                    {t("profile.seeAll")}
                  </Link>
                </Box>
            </Box>
          </Box>

        </Box>
      </Box>


    </Box>
  )
}