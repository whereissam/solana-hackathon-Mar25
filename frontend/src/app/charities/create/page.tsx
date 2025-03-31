"use client";

import * as React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHARITY } from "@/lib/mutations/charity-mutations";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  Container,
  TextField,
  Button,
  Alert,
  Paper,
  Divider,
  InputAdornment,
  CircularProgress,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import DescriptionIcon from "@mui/icons-material/Description";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface CharityFormData {
  name: string;
  description: string;
  location: {
    // Changed address to location to match schema
    city: string | null;
    country: string | null;
    postcode: string | null;
    address: string | null; // Added address
  };
  charityAdmin: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  image: File | null; // Add image field
  mission: string; // Add mission
  sector: string; // Add sector
  website: string; // Add website
}

export default function CreateCharityPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = React.useState<CharityFormData>({
    name: "",
    description: "",
    location: {
      city: "",
      country: "",
      postcode: "",
      address: "",
    },
    charityAdmin: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    image: null,
    mission: "",
    sector: "ug_partner",
    website: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    name: "",
    description: "",
    postcode: "",
    admin_firstName: "",
    admin_lastName: "",
    admin_email: "",
    admin_password: "",
    image: "", // Add image error
    address: "",
    mission: "",
    sector: "",
    website: "",
  });

  const [createCharity, { loading: submitting, error: submitError }] =
    useMutation(CREATE_CHARITY);

  const [successMessage, setSuccessMessage] = React.useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB in bytes
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          image: "Image size must be less than 5MB",
        }));
        setFormData((prevData) => ({
          ...prevData,
          image: null,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
        }));
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          image: "",
        }));
      }
    }
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = image.width;
          let height = image.height;
          const maxDimension = 1200; // Reasonable size for most web images

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round(height * (maxDimension / width));
              width = maxDimension;
            } else {
              width = Math.round(width * (maxDimension / height));
              height = maxDimension;
            }
          }

          // Create canvas and draw resized image
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(image, 0, 0, width, height);

          // Convert to blob with reduced quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Canvas to Blob conversion failed"));
                return;
              }
              // Convert blob to File
              const newFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(newFile);
            },
            "image/jpeg",
            0.7 // Adjust quality (0.7 = 70% quality)
          );
        };
        image.src = readerEvent.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    if (
      name === "name" ||
      name === "description" ||
      name === "mission" ||
      name === "sector" ||
      name === "website"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name.startsWith("admin_")) {
      const adminField = name.replace("admin_", "");
      setFormData((prevData) => ({
        ...prevData,
        charityAdmin: {
          ...prevData.charityAdmin,
          [adminField]: value,
        },
      }));

      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (
      name === "address" ||
      name === "city" ||
      name === "country" ||
      name === "postcode"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));

      if (name === "postcode" && formErrors.postcode) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          postcode: "",
        }));
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      description: "",
      postcode: "",
      admin_firstName: "",
      admin_lastName: "",
      admin_email: "",
      admin_password: "",
      image: "",
      address: "",
      mission: "",
      sector: "",
      website: "",
    };

    if (!formData.name.trim()) {
      errors.name = "Charity name is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.location.postcode?.trim()) {
      errors.postcode = "Postcode is required";
      isValid = false;
    }

    if (!formData.charityAdmin.firstName.trim()) {
      errors.admin_firstName = "Admin first name is required";
      isValid = false;
    }

    if (!formData.charityAdmin.lastName.trim()) {
      errors.admin_lastName = "Admin last name is required";
      isValid = false;
    }

    if (!formData.charityAdmin.email.trim()) {
      errors.admin_email = "Admin email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.charityAdmin.email)) {
      errors.admin_email = "Email is invalid";
      isValid = false;
    }

    if (!formData.charityAdmin.password.trim()) {
      errors.admin_password = "Password is required";
    } else if (formData.charityAdmin.password.length < 6) {
      errors.admin_password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.image) {
      errors.image = "Image is required";
      isValid = false;
    }

    if (!formData.mission) {
      errors.mission = "Mission is required";
      isValid = false;
    }

    if (!formData.sector) {
      errors.sector = "Sector is required";
      isValid = false;
    }

    if (!formData.website) {
      errors.website = "Website is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Add the proper type for the event parameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      location: {
        city: formData.location.city || null,
        country: formData.location.country || null,
        postcode: formData.location.postcode || null,
        address: formData.location.address || null,
      },
      charityAdmin: {
        email: formData.charityAdmin.email,
        firstName: formData.charityAdmin.firstName,
        lastName: formData.charityAdmin.lastName,
        password: formData.charityAdmin.password,
      },
      mission: formData.mission,
      sector: formData.sector,
      website: formData.website,
      image: null as string | null,
    };

    if (formData.image) {
      try {
        // Compress image before converting to base64
        const compressedImage = await compressImage(formData.image);
        const base64Image = await fileToBase64(compressedImage);
        formDataToSend.image = base64Image;
      } catch (error) {
        console.error("Error processing image:", error);
        setFormErrors((prev) => ({ ...prev, image: "Error processing image" }));
        return;
      }
    }

    try {
      const result = await createCharity({
        variables: {
          detail: {
            ...formDataToSend,
            image: formData.image,
          },
        },
      });

      setSuccessMessage("Charity successfully created!");

      setFormData({
        name: "",
        description: "",
        location: {
          city: "",
          country: "",
          postcode: "",
          address: "",
        },
        charityAdmin: {
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        },
        image: null,
        mission: "",
        sector: "ug_partner",
        website: "",
      });

      console.log("Charity created:", result.data.createCharity);

      setTimeout(() => {
        if (result.data && result.data.createCharity) {
          const newCharityId = result.data.createCharity.id;
          router.push(`/charities/${newCharityId}`);
        }
      }, 2000);
    } catch (error) {
      console.error("Error creating charity:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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

      <Container
        maxWidth="md"
        sx={{
          color: "white",
          px: { xs: 2, sm: 3 },
          pb: 8,
        }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Create New Charity
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Complete the form below to register a new charitable organization.
            All registered charities will be available for donations and
            creating beneficiaries.
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#111",
            color: "white",
          }}
        >
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError.message ||
                "An error occurred while creating the charity. Please try again."}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Charity basic info section */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Basic Information
                </Typography>

                <TextField
                  fullWidth
                  label="Charity Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                  multiline
                  rows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Charity Image
                </Typography>
                <input
                  accept="image/*"
                  id="charity-image-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="charity-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.23)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
                {formData.image && (
                  <Typography variant="body2" sx={{ display: "inline" }}>
                    {formData.image.name}
                  </Typography>
                )}
                {formErrors.image && (
                  <FormHelperText error>{formErrors.image}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 1 }}
                />
              </Grid>

              {/* Mission, Sector, Website - ADDED HERE */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Additional Information
                </Typography>

                <TextField
                  fullWidth
                  label="Mission"
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  error={!!formErrors.mission}
                  helperText={formErrors.mission}
                  required
                  multiline
                  rows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Sector"
                  name="sector"
                  value={"ug_partner"}
                  // onChange={handleInputChange}
                  error={!!formErrors.sector}
                  helperText={formErrors.sector}
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  error={!!formErrors.website}
                  helperText={formErrors.website}
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 1 }}
                />
              </Grid>

              {/* Location Section - ADDED HERE */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Location Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.location.city || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.location.country || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Postcode"
                  name="postcode"
                  value={formData.location.postcode || ""}
                  onChange={handleInputChange}
                  error={!!formErrors.postcode}
                  helperText={formErrors.postcode}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MarkunreadMailboxIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.location.address || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MarkunreadMailboxIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 1 }}
                />
              </Grid>

              {/* Charity Admin section */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Charity Administrator
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="admin_firstName"
                  value={formData.charityAdmin.firstName}
                  onChange={handleInputChange}
                  error={!!formErrors.admin_firstName}
                  helperText={formErrors.admin_firstName}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="admin_lastName"
                  value={formData.charityAdmin.lastName}
                  onChange={handleInputChange}
                  error={!!formErrors.admin_lastName}
                  helperText={formErrors.admin_lastName}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="admin_email"
                  type="email"
                  value={formData.charityAdmin.email}
                  onChange={handleInputChange}
                  error={!!formErrors.admin_email}
                  helperText={formErrors.admin_email}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={!!formErrors.admin_password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                >
                  <InputLabel htmlFor="admin-password">Password *</InputLabel>
                  <OutlinedInput
                    id="admin-password"
                    name="admin_password"
                    type={showPassword ? "text" : "password"}
                    value={formData.charityAdmin.password}
                    onChange={handleInputChange}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password *"
                  />
                  {formErrors.admin_password && (
                    <FormHelperText error>
                      {formErrors.admin_password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => router.push("/charities")}
                    sx={{ minWidth: "120px" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={submitting}
                    sx={{ minWidth: "120px" }}
                  >
                    {submitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Create Charity"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
