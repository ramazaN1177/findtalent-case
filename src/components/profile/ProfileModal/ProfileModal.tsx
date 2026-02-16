
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth, User } from "@/contexts/AuthContext";

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ open, onClose }: ProfileModalProps) => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    title: "",
    company: "",
    location: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname ?? "",
        lastname: user.lastname ?? "",
        title: user.title ?? "",
        company: user.company ?? "",
        location: user.location ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form as Partial<User>);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "24px", color: "#4361ee", mb: 2 }}>
          {t("profile.editProfile")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              fullWidth
              label={t("profile.firstName")}
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
            <TextField
              fullWidth
              label={t("profile.lastName")}
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          </Box>
          <TextField
            fullWidth
            label={t("profile.profile")}
            name="title"
            value={form.title}
            onChange={handleChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            fullWidth
            label={t("profile.company")}
            name="company"
            value={form.company}
            onChange={handleChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            fullWidth
            label={t("profile.location")}
            name="location"
            value={form.location}
            onChange={handleChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            fullWidth
            label={t("profile.email")}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <TextField
            fullWidth
            label={t("profile.phone")}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
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
