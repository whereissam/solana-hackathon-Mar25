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
  address: {
    city: string | null;
    country: string | null;
    postcode: string | null;
  };
  charityAdmin: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
}

export default function CreateCharityPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = React.useState<CharityFormData>({
    name: "",
    description: "",
    address: {
      city: "",
      country: "",
      postcode: "",
    },
    charityAdmin: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const [formErrors, setFormErrors] = React.useState({
    name: "",
    description: "",
    postcode: "",
    admin_firstName: "",
    admin_lastName: "",
    admin_email: "",
    admin_password: "",
  });

  const [createCharity, { loading: submitting, error: submitError }] =
    useMutation(CREATE_CHARITY);

  const [successMessage, setSuccessMessage] = React.useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "name" || name === "description") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Clear error - using type assertion to avoid TypeScript error
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name.startsWith("admin_")) {
      // Handle admin fields
      const adminField = name.replace("admin_", "");
      setFormData((prevData) => ({
        ...prevData,
        charityAdmin: {
          ...prevData.charityAdmin,
          [adminField]: value,
        },
      }));

      // Clear error - using type assertion to avoid TypeScript error
      if (formErrors[name as keyof typeof formErrors]) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else {
      // Handle address fields
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));

      // Clear error for postcode
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
    };

    // Validate charity fields
    if (!formData.name.trim()) {
      errors.name = "Charity name is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    // Validate address
    if (!formData.address.postcode?.trim()) {
      errors.postcode = "Postcode is required";
      isValid = false;
    }

    // Validate admin
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
      isValid = false;
    } else if (formData.charityAdmin.password.length < 6) {
      errors.admin_password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Add the proper type for the event parameter
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clean up the data before submitting
    const detail = {
      name: formData.name,
      description: formData.description,
      address: {
        city: formData.address.city || null,
        country: formData.address.country || null,
        postcode: formData.address.postcode,
      },
      charityAdmin: {
        firstName: formData.charityAdmin.firstName,
        lastName: formData.charityAdmin.lastName,
        email: formData.charityAdmin.email,
        password: formData.charityAdmin.password,
      },
    };

    try {
      const result = await createCharity({
        variables: {
          detail,
        },
      });

      // Show success message
      setSuccessMessage("Charity successfully created!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        address: {
          city: "",
          country: "",
          postcode: "",
        },
        charityAdmin: {
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        },
      });

      // Navigate to the charity detail page after delay
      setTimeout(() => {
        const newCharityId = result.data.createCharity.id;
        router.push(`/charities/${newCharityId}`);
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
                <Divider
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 1 }}
                />
              </Grid>

              {/* Address section */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Address Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.address.city || ""}
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
                  value={formData.address.country || ""}
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
                  value={formData.address.postcode || ""}
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
