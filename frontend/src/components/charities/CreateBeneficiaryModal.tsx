import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "@apollo/client";
import { CREATE_BENEFICIARY } from "@/lib/mutations/beneficiary-mutations";

interface CreateBeneficiaryModalProps {
  open: boolean;
  onClose: () => void;
  charityId: number;
}

interface BeneficiaryFormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const CreateBeneficiaryModal: React.FC<CreateBeneficiaryModalProps> = ({
  open,
  onClose,
  charityId,
}) => {
  // Form state
  const [formData, setFormData] = useState<BeneficiaryFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // GraphQL mutation hook
  const [createBeneficiary, { loading: submitting, error: submitError }] =
    useMutation(CREATE_BENEFICIARY);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const errors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createBeneficiary({
        variables: {
          charityId,
          detail: formData,
        },
      });

      // Show success message
      setSuccessMessage("Beneficiary successfully created!");

      // Reset form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      // Close modal after a delay
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error creating beneficiary:", error);
    }
  };

  const handleClose = () => {
    // Reset form when closing modal
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    setFormErrors({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    setSuccessMessage("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#111",
          color: "white",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          pb: 2,
        }}
      >
        Add New Beneficiary
        <IconButton
          edge="end"
          onClick={handleClose}
          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError.message ||
                "An error occurred while creating the beneficiary. Please try again."}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                error={!!formErrors.first_name}
                helperText={formErrors.first_name}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                error={!!formErrors.last_name}
                helperText={formErrors.last_name}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            pt: 2,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Beneficiary"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBeneficiaryModal;
