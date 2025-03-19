"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import AppBar from "@/components/AppBar";
import { useAuthStore } from "@/store/authStore";
// import { gql, useMutation } from "@apollo/client";

// GraphQL mutations
// const UPDATE_PROFILE = gql`
//   mutation UpdateProfile($input: UpdateProfileInput!) {
//     updateProfile(input: $input) {
//       id
//       email
//       first_name
//       last_name
//     }
//   }
// `;

// TypeScript interfaces
interface ProfileFormState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuthStore();

  // Profile state
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    username: "username",
    firstName: "",
    lastName: "",
    email: "admin@ug.com",
    bio: "Tell us about yourself...",
  });

  // Mutations
  //   const [updateProfile, { loading: updateProfileLoading }] =
  //     useMutation(UPDATE_PROFILE);

  // Handle profile form change
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    try {
      //   await updateProfile({
      //     variables: {
      //       input: {
      //         first_name: profileForm.firstName,
      //         last_name: profileForm.lastName,
      //         email: profileForm.email,
      //       },
      //     },
      //   });
      //   alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Initialize form with user data when it loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "username",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "admin@ug.com",
        bio: user.bio || "Tell us about yourself...",
      });
    }
    setIsMounted(true);
  }, [user]);

  // Only render a minimal placeholder during server-side rendering
  if (!isMounted) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5", // Softer background
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // Softer background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Wrapper to center the AppBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar />
      </Box>

      {/* Main content container */}
      <Container
        maxWidth="lg" // Increased to 'lg' for a wider container (around 1280px)
        sx={{
          color: "white",
          px: { xs: 2, sm: 3 },
          pb: 8,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Settings Card */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1000, // Increased width for the settings card
            mx: 2,
            mb: 4,
          }}
        >
          {/* White container with subtle gradient */}
          <Paper
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              p: { xs: 3, sm: 4 },
              position: "relative",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", // Softer shadow
              border: "1px solid #e0e0e0", // Subtle border
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a", // Darker text for contrast
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                }}
              >
                Account Settings
              </Typography>
              <IconButton sx={{ color: "#666" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Form content */}
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: "transparent",
                borderRadius: 4,
                p: 2,
                mt: 2,
              }}
            >
              {/* Avatar in the center-top */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#e0e0e0",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Subtle hover effect
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ color: "#666" }}>
                    👤
                  </Typography>
                </Avatar>
              </Box>

              {/* Username field */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Username
                </Typography>
                <TextField
                  fullWidth
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f9f9f9",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#aaa",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#333",
                      py: 1.5,
                    },
                  }}
                />
              </Box>

              {/* First and Last name */}
              <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
                {/* Increased gap for wider layout */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={profileForm.firstName}
                    onChange={handleProfileChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "#f9f9f9",
                        "& fieldset": {
                          borderColor: "#ddd",
                        },
                        "&:hover fieldset": {
                          borderColor: "#aaa",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#333",
                        py: 1.5,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                  >
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={profileForm.lastName}
                    onChange={handleProfileChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "#f9f9f9",
                        "& fieldset": {
                          borderColor: "#ddd",
                        },
                        "&:hover fieldset": {
                          borderColor: "#aaa",
                        },
                      },
                      "& .MuiInputBase-input": {
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: "#333",
                        py: 1.5,
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Email field */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f9f9f9",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#aaa",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#333",
                      py: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Bio field */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Bio
                </Typography>
                <TextField
                  fullWidth
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  InputProps={{
                    endAdornment: (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          pr: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#666",
                            bgcolor: "#e0e0e0",
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                          }}
                        >
                          👤
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            color: "#666",
                            bgcolor: "#e0e0e0",
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                          }}
                        >
                          📝
                        </Typography>
                      </Box>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 6, // More rounded corners
                      bgcolor: "white", // White background to match screenshot
                      "& fieldset": {
                        borderColor: "#6547ED", // Purple border
                        borderWidth: 2, // Slightly thicker border
                      },
                      "&:hover fieldset": {
                        borderColor: "#5A3FD4", // Slightly darker purple on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6547ED", // Keep purple when focused
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontWeight: 400,
                      fontSize: "0.95rem",
                      color: "#555",
                      py: 1.5,
                    },
                  }}
                />
              </Box>
            </Paper>

            {/* Action buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#ddd",
                  color: "#666",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#aaa",
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  bgcolor: "#1976d2", // Modern blue for primary action
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#1565c0",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
