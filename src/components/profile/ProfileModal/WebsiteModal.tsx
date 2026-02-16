"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const WEBSITE_NAMES = ["LinkedIn", "GitHub", "Twitter", "Instagram", "Facebook"];

type WebsiteModalProps = {
  open: boolean;
  onClose: () => void;
};

export const WebsiteModal = ({ open, onClose }: WebsiteModalProps) => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [websites, setWebsites] = useState<{ id: number; name: string; url: string }[]>([]);

  useEffect(() => {
    if (user?.websites && user.websites.length > 0) {
      setWebsites([...user.websites]);
    } else {
      setWebsites(
        WEBSITE_NAMES.map((name, i) => ({ id: i + 1, name, url: "" }))
      );
    }
  }, [user?.websites, open]);

  const handleUrlChange = (id: number, url: string) => {
    setWebsites((prev) => prev.map((w) => (w.id === id ? { ...w, url } : w)));
  };

  const handleAdd = () => {
    const nextId = Math.max(0, ...websites.map((w) => w.id)) + 1;
    setWebsites((prev) => [...prev, { id: nextId, name: t("profile.other"), url: "" }]);
  };

  const handleRemove = (id: number) => {
    setWebsites((prev) => prev.filter((w) => w.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ websites });
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
          {t("profile.editWebsite")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {websites.map((site) => (
            <Box key={site.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ minWidth: 90, fontSize: "14px", color: "#6b7998" }}>
                {site.name}
              </Typography>
              <TextField
                fullWidth
                placeholder="https://..."
                value={site.url}
                onChange={(e) => handleUrlChange(site.id, e.target.value)}
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
              <IconButton size="small" onClick={() => handleRemove(site.id)} color="error" aria-label={t("profile.remove")}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAdd} variant="outlined" size="small" sx={{ alignSelf: "flex-start", borderRadius: "8px" }}>
            {t("profile.addNew")}
          </Button>
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
