"use client";

import React, { useState, useRef } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

type DocumentModalProps = {
  open: boolean;
  onClose: () => void;
};

export const DocumentModal = ({ open, onClose }: DocumentModalProps) => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === "application/pdf" || f.name.endsWith(".doc") || f.name.endsWith(".docx"))) {
      setFile(f);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) {
      onClose();
      return;
    }
    const nextId = user.documents?.length
      ? Math.max(...user.documents.map((d) => d.id)) + 1
      : 1;
    const newDoc = {
      id: nextId,
      name: file.name,
      url: URL.createObjectURL(file),
    };
    updateUser({
      documents: [...(user.documents ?? []), newDoc],
    });
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onClose();
  };

  const handleClose = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 450 },
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "24px", color: "#4361ee", mb: 2 }}>
          {t("profile.addDocument")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            sx={{
              border: "2px dashed",
              borderColor: dragOver ? "#4361ee" : "#ccc",
              borderRadius: "12px",
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: dragOver ? "rgba(67, 97, 238, 0.05)" : "#fafafa",
              transition: "all 0.2s",
              "&:hover": { borderColor: "#4361ee", bgcolor: "rgba(67, 97, 238, 0.05)" },
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <CloudUploadIcon sx={{ fontSize: 48, color: "#4361ee", mb: 1 }} />
            <Typography sx={{ color: "#6b7998", fontSize: "14px" }}>
              {t("profile.uploadFile")}
            </Typography>
            {file && (
              <Typography sx={{ mt: 1, color: "#4361ee", fontWeight: 600 }}>
                {t("profile.uploadedFile")}: {file.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: "8px" }}>
              {t("profile.cancel")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!file}
              sx={{ bgcolor: "#4361ee", borderRadius: "8px" }}
            >
              {t("profile.save")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
