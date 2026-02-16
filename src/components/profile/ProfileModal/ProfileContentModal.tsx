
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export type ContentModalType = "professional" | "experience" | "education" | "certificates";

type ProfileContentModalProps = {
  open: boolean;
  onClose: () => void;
  contentType: ContentModalType;
};

type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

type EducationItem = {
  id: number;
  school: string;
  department: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type CertificateItem = {
  id: number;
  name: string;
  description: string;
  date: string;
};

export const ProfileContentModal = ({ open, onClose, contentType }: ProfileContentModalProps) => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [professionalContent, setProfessionalContent] = useState("");
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  useEffect(() => {
    if (!user || !open) return;
    if (contentType === "professional") {
      setProfessionalContent(user.profileContent?.[0]?.content ?? "");
    }
    if (contentType === "experience") {
      const exp = (user.experience ?? []) as ExperienceItem[];
      setExperience(exp.length > 0 ? exp.map((e) => ({ ...e })) : []);
    }
    if (contentType === "education") {
      const edu = (user.education ?? []) as EducationItem[];
      setEducation(edu.length > 0 ? edu.map((e) => ({ ...e })) : []);
    }
    if (contentType === "certificates") {
      const cert = (user.certificates ?? []) as CertificateItem[];
      setCertificates(cert.length > 0 ? cert.map((c) => ({ ...c })) : []);
    }
  }, [user, open, contentType]);

  const getTitle = () => {
    switch (contentType) {
      case "professional":
        return t("profile.professionalPerspective");
      case "experience":
        return t("profile.experience");
      case "education":
        return t("profile.education");
      case "certificates":
        return t("profile.certificates");
      default:
        return t("profile.edit");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contentType === "professional") {
      updateUser({
        profileContent: [{ id: 1, title: t("profile.professionalPerspective"), content: professionalContent }],
      });
    }
    if (contentType === "experience") {
      updateUser({ experience });
    }
    if (contentType === "education") {
      updateUser({ education });
    }
    if (contentType === "certificates") {
      updateUser({ certificates });
    }
    onClose();
  };

  // Professional content form
  const renderProfessional = () => (
    <TextField
      fullWidth
      multiline
      rows={6}
      value={professionalContent}
      onChange={(e) => setProfessionalContent(e.target.value)}
      placeholder={t("profile.professionalPlaceholder")}
      size="small"
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
    />
  );

  // Experience form
  const renderExperience = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {experience.map((exp, idx) => (
        <Box key={exp.id} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#4361ee" }}>
              {t("profile.experience")} {idx + 1}
            </Typography>
            <IconButton size="small" onClick={() => setExperience((p) => p.filter((e) => e.id !== exp.id))} color="error">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              fullWidth
              label={t("profile.jobTitle")}
              value={exp.title}
              onChange={(e) =>
                setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, title: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.company")}
              value={exp.company}
              onChange={(e) =>
                setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, company: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.location")}
              value={exp.location}
              onChange={(e) =>
                setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, location: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label={t("profile.startDate")}
                value={exp.startDate}
                onChange={(e) =>
                  setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, startDate: e.target.value } : x)))
                }
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
              <TextField
                fullWidth
                label={t("profile.endDate")}
                value={exp.endDate}
                onChange={(e) =>
                  setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, endDate: e.target.value } : x)))
                }
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={2}
              label={t("profile.description")}
              value={exp.description}
              onChange={(e) =>
                setExperience((p) => p.map((x) => (x.id === exp.id ? { ...x, description: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          </Box>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() =>
          setExperience((p) => [
            ...p,
            {
              id: Math.max(0, ...p.map((e) => e.id)) + 1,
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ])
        }
        variant="outlined"
        size="small"
        sx={{ alignSelf: "flex-start", borderRadius: "8px" }}
      >
        {t("profile.addExperience")}
      </Button>
    </Box>
  );

  // Education form
  const renderEducation = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {education.map((edu, idx) => (
        <Box key={edu.id} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#4361ee" }}>
              {t("profile.education")} {idx + 1}
            </Typography>
            <IconButton size="small" onClick={() => setEducation((p) => p.filter((e) => e.id !== edu.id))} color="error">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              fullWidth
              label={t("profile.school")}
              value={edu.school}
              onChange={(e) =>
                setEducation((p) => p.map((x) => (x.id === edu.id ? { ...x, school: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.department")}
              value={edu.department}
              onChange={(e) =>
                setEducation((p) => p.map((x) => (x.id === edu.id ? { ...x, department: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.degree")}
              value={edu.degree}
              onChange={(e) =>
                setEducation((p) => p.map((x) => (x.id === edu.id ? { ...x, degree: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label={t("profile.startDate")}
                value={edu.startDate}
                onChange={(e) =>
                  setEducation((p) => p.map((x) => (x.id === edu.id ? { ...x, startDate: e.target.value } : x)))
                }
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
              <TextField
                fullWidth
                label={t("profile.endDate")}
                value={edu.endDate}
                onChange={(e) =>
                  setEducation((p) => p.map((x) => (x.id === edu.id ? { ...x, endDate: e.target.value } : x)))
                }
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </Box>
          </Box>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() =>
          setEducation((p) => [
            ...p,
            {
              id: Math.max(0, ...p.map((e) => e.id)) + 1,
              school: "",
              department: "",
              degree: "",
              startDate: "",
              endDate: "",
            },
          ])
        }
        variant="outlined"
        size="small"
        sx={{ alignSelf: "flex-start", borderRadius: "8px" }}
      >
        {t("profile.addEducation")}
      </Button>
    </Box>
  );

  // Certificates form
  const renderCertificates = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {certificates.map((cert, idx) => (
        <Box key={cert.id} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: "#4361ee" }}>
              {t("profile.certificate")} {idx + 1}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setCertificates((p) => p.filter((c) => c.id !== cert.id))}
              color="error"
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              fullWidth
              label={t("profile.certificateName")}
              value={cert.name}
              onChange={(e) =>
                setCertificates((p) => p.map((x) => (x.id === cert.id ? { ...x, name: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.institution")}
              value={cert.description}
              onChange={(e) =>
                setCertificates((p) => p.map((x) => (x.id === cert.id ? { ...x, description: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.date")}
              value={cert.date}
              onChange={(e) =>
                setCertificates((p) => p.map((x) => (x.id === cert.id ? { ...x, date: e.target.value } : x)))
              }
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          </Box>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() =>
          setCertificates((p) => [
            ...p,
            {
              id: Math.max(0, ...p.map((c) => c.id)) + 1,
              name: "",
              description: "",
              date: "",
            },
          ])
        }
        variant="outlined"
        size="small"
        sx={{ alignSelf: "flex-start", borderRadius: "8px" }}
      >
        {t("profile.addCertificate")}
      </Button>
    </Box>
  );

  const renderContent = () => {
    switch (contentType) {
      case "professional":
        return renderProfessional();
      case "experience":
        return renderExperience();
      case "education":
        return renderEducation();
      case "certificates":
        return renderCertificates();
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 550 },
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "24px", color: "#4361ee", mb: 2 }}>
          {getTitle()} {t("profile.edit")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {renderContent()}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 1 }}>
            <Button variant="outlined" onClick={onClose} sx={{ borderRadius: "8px" }}>
              {t("profile.cancel")}
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#4361ee", borderRadius: "8px" }}>
              {t("profile.save")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
