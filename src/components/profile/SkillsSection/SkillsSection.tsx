import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

export const SkillsSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  return (
    <Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
      <Box sx={{ width: "100%", height: "100%", minWidth: 0 }}>
        <Typography variant="h6" sx={{ fontSize: "32px", color: "#5b6987" }}>{t("profile.profile")}</Typography>
        <Box>
          <Box sx={{ margin: "20px 0", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#4361ee", minWidth: 0 }}>
                {t("profile.professionalPerspective")}
              </Typography>
              <Link
                href="#"
                underline="none"
                onClick={(e) => e.preventDefault()}
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#6b7998",
                  "&:hover": { color: "#4361ee" },
                }}
              >
                {t("profile.edit")}
              </Link>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />

            <Box sx={{ minWidth: 0, overflow: "hidden" }}>
              <Typography
                component="div"
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "16px",
                  color: "#6b7998",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {user?.profileContent?.[0]?.content ?? ""}
              </Typography>
            </Box>



          </Box>
          {/* Deneyim */}
          <Box sx={{ margin: "30px 0", width: "100%", minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#5b6987", minWidth: 0 }}>
                {t("profile.experience")}
              </Typography>
              <Link
                href="#"
                underline="none"
                onClick={(e) => e.preventDefault()}
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#6b7998",
                  "&:hover": { color: "#4361ee" },
                }}
              >
                {t("profile.edit")}
              </Link>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {((user?.experience ?? []) as { id: number; title: string; company: string; location: string; startDate: string; endDate: string; description: string }[]).map((exp) => (
                <Box key={exp.id} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                  <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "24px", color: "#4361ee" }}>
                    {exp.title}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "18px", color: "#4361ee" }}>
                      {exp.company}
                    </Typography>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "16px", color: "#6b7998" }}>
                      {exp.startDate} — {exp.endDate}
                    </Typography>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "16px", color: "#6b7998" }}>
                      {exp.location}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: "16px",
                      color: "#6b7998",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Egitim */}
          <Box sx={{ margin: "30px 0", width: "100%", minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#5b6987", minWidth: 0 }}>
                {t("profile.education")}
              </Typography>
              <Link
                href="#"
                underline="none"
                onClick={(e) => e.preventDefault()}
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#6b7998",
                  "&:hover": { color: "#4361ee" },
                }}
              >
                {t("profile.edit")}
              </Link>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {((user?.education ?? []) as { id: number; school: string; department: string; degree: string; startDate: string; endDate: string; description: string }[]).map((edu) => (
                <Box key={edu.id} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                  <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "24px", color: "#4361ee" }}>
                    {edu.school}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "16px", color: "#6b7998" }}>
                      {edu.degree}
                    </Typography>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "18px", color: "#6b7998" }}>
                      {edu.department}
                    </Typography>

                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "16px", color: "#6b7998" }}>
                      {edu.startDate} — {edu.endDate}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: "16px",
                      color: "#6b7998",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {edu.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Sertifikalar */}
          <Box sx={{ margin: "30px 0", width: "100%", minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#5b6987" }}>
                {t("profile.certificates")}
              </Typography>
              <Link
                href="#"
                underline="none"
                onClick={(e) => e.preventDefault()}
                sx={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#6b7998",
                  "&:hover": { color: "#4361ee" },
                }}
              >
                {t("profile.edit")}
              </Link>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {((user?.certificates ?? []) as { id: number; name: string; description: string; date: string }[]).map((cert) => (
                <Box key={cert.id} sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "24px", color: "#4361ee" }}>
                    {cert.name}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "18px", color: "#6b7998" }}>
                      {cert.description}
                    </Typography>
                    <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "16px", color: "#6b7998" }}>
                      {cert.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Yetenekler */}
          <Box sx={{ margin: "30px 0", width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#5b6987" }}>{t("profile.skills")}</Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                columnGap: { xs: 0, sm: 2, md: "254px" },
                rowGap: "20px",
              }}
            >
              {((user?.skills ?? []) as { id: number; name: string; experience: string }[]).map((skill) => (
                <Box key={skill.id} sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "11px" }}>
                  <Box
                    component="img"
                    src="/noun-list-1828555@3x.png"
                    alt=""
                    sx={{ width: 14, height: 14, flexShrink: 0 }}
                  />
                  <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "18px", color: "#6b7998", minWidth: 0, wordBreak: "break-word" }}>
                    {skill.name} ({skill.experience})
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Ilgi Alanlari */}
          <Box sx={{ margin: "30px 0", width: "100%", minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "24px", color: "#5b6987", minWidth: 0 }}>{t("profile.skills")}</Typography>
            </Box>
            <Box
              sx={{
                margin: "10px 0",
                width: "100%",
                height: "1px",
                border: "solid 1px rgba(107, 121, 152, 0.3)",
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                columnGap: { xs: 0, sm: 2, md: "254px" },
                rowGap: "20px",
              }}
            >
              {((user?.hobbies ?? []) as { id: number; name: string }[]).map((hobby) => (
                <Box key={hobby.id} sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "11px" }}>
                  <Box
                    component="img"
                    src="/noun-list-1828555@3x.png"
                    alt=""
                    sx={{ width: 14, height: 14, flexShrink: 0 }}
                  />
                  <Typography sx={{ fontFamily: '"Nunito", sans-serif', fontSize: "18px", color: "#6b7998", minWidth: 0, wordBreak: "break-word" }}>
                    {hobby.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};          