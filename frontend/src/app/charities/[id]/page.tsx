"use client";

import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import { CREATE_BENEFICIARY } from "@/lib/mutations/beneficiary-mutations";
import { useRouter } from "next/navigation";
import {
  Typography,
  Box,
  CardMedia,
  Grid,
  Container,
  TextField,
  Button,
  Alert,
  Skeleton,
  Paper,
  CircularProgress,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { use } from "react";

// Interfaces remain the same...
interface Address {
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  postcode: string | null;
}

interface Beneficiary {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Charity {
  id: string;
  name: string;
  address?: Address;
  beneficiaries?: Beneficiary[];
}

interface BeneficiaryFormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export default function CharityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const charityId = id ? parseInt(id) : null;

  // Add retry logic state
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const { data, loading, error, refetch } = useQuery(GET_ALL_CHARITIES, {
    fetchPolicy: "network-only", // Bypass cache and fetch from network
    notifyOnNetworkStatusChange: true,
  });

  // Beneficiary form state
  const [formData, setFormData] = React.useState<BeneficiaryFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [createBeneficiary, { loading: submitting, error: submitError }] =
    useMutation(CREATE_BENEFICIARY);

  const [successMessage, setSuccessMessage] = React.useState("");

  // Add effect for automatic retry
  React.useEffect(() => {
    // Filter for the specific charity from all charities
    const charity = data?.charities?.find(
      (c: Charity) => parseInt(c.id) === charityId
    );

    // Automatically retry if charity not found and we haven't tried too many times
    if (!loading && !error && data && !charity && retryCount < 3) {
      setIsRetrying(true);
      const timer = setTimeout(() => {
        console.log(`Retrying charity fetch (${retryCount + 1}/3)...`);
        refetch();
        setRetryCount((prevCount) => prevCount + 1);
        setIsRetrying(false);
      }, 1500); // 1.5 second delay between retries

      return () => clearTimeout(timer);
    }
  }, [data, loading, error, charityId, retryCount, refetch]);

  // Manual retry function
  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      refetch();
      setRetryCount((prevCount) => prevCount + 1);
      setIsRetrying(false);
    }, 1000);
  };

  // Rest of your form handling logic
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

  const validateForm = () => {
    // Existing validation logic
    let isValid = true;
    const errors = {
      first_name: "",
      last_name: "",
      email: "",
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

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Existing submit logic
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

      // Reset form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });

      setSuccessMessage("Beneficiary successfully created!");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error creating beneficiary:", error);
    }
  };

  // Return loading state
  if (loading || isRetrying) {
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
          maxWidth="lg"
          sx={{
            color: "white",
            px: { xs: 2, sm: 3 },
            pb: 8,
          }}
        >
          <Box sx={{ my: 4, textAlign: "center" }}>
            {isRetrying ? (
              <>
                <CircularProgress size={40} sx={{ mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Finding charity data...
                </Typography>
                <Typography variant="body1">
                  Attempt {retryCount + 1}/4
                </Typography>
              </>
            ) : (
              <>
                <Skeleton
                  variant="rectangular"
                  height={60}
                  width="50%"
                  sx={{ mx: "auto", mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={24}
                  width="70%"
                  sx={{ mx: "auto", mb: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={24}
                  width="60%"
                  sx={{ mx: "auto" }}
                />
              </>
            )}
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={300} width="100%" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={50}
                width="80%"
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={100}
                width="100%"
                sx={{ mb: 2 }}
              />
              <Skeleton variant="rectangular" height={150} width="100%" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  // Return error state
  if (error) {
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
          maxWidth="lg"
          sx={{
            color: "white",
            px: { xs: 2, sm: 3 },
            pb: 8,
          }}
        >
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Typography color="error" variant="h4">
              Error loading charity details
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {error.message ||
                "Unable to load the charity details. Please try again later."}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => router.push("/charities")}
            >
              Back to Charities
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Filter for the specific charity from all charities
  const charity = data?.charities?.find(
    (c: Charity) => parseInt(c.id) === charityId
  );

  if (!charity) {
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
          maxWidth="lg"
          sx={{
            color: "white",
            px: { xs: 2, sm: 3 },
            pb: 8,
          }}
        >
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Typography variant="h4">Charity Not Found</Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              {retryCount >= 3
                ? "We've tried several times but couldn't find this charity. It might not exist or was recently created and is still processing."
                : "This charity may have been recently created and is still processing."}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRetry}
                sx={{ mr: 2 }}
                disabled={retryCount >= 4 || isRetrying}
              >
                {isRetrying ? "Trying..." : "Try Again"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/charities")}
              >
                Back to Charities
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  // The rest of your component remains the same
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
        maxWidth="lg"
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
            {charity.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 1,
              fontWeight: "medium",
            }}
          >
            Making a difference
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="300"
              image={`https://therecordnewspaper.org/wp-content/uploads/2019/05/Catholic-Charities-Building-Southwest-5-16-19-p1-.gif`}
              alt={charity.name}
              sx={{ borderRadius: 2, mb: 2 }}
            />
            <Typography variant="body1" sx={{ mb: 3 }}>
              This charitable organization is dedicated to making a positive
              impact in our community. Through various programs and initiatives,
              we strive to address pressing social issues and create lasting
              change.
            </Typography>

            {/* Address information */}
            {charity.address && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "medium" }}>
                  Location
                </Typography>
                <Typography variant="body1">
                  {charity.address.postcode &&
                    `Postcode: ${charity.address.postcode}`}
                  {charity.address.city && `, ${charity.address.city}`}
                  {charity.address.country && `, ${charity.address.country}`}
                </Typography>
              </Box>
            )}

            {/* Existing beneficiaries */}
            <Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "medium" }}>
                Current Beneficiaries
              </Typography>

              {charity.beneficiaries && charity.beneficiaries.length > 0 ? (
                <Box sx={{ mb: 3 }}>
                  {charity.beneficiaries.map((beneficiary: Beneficiary) => (
                    <Paper
                      key={beneficiary.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#222",
                        borderRadius: 2,
                        color: "white",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {beneficiary.first_name} {beneficiary.last_name}
                      </Typography>
                      <Typography variant="body2">
                        {beneficiary.email}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                  No beneficiaries have been added yet.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#111",
                color: "white",
              }}
            >
              <Typography variant="h4" sx={{ mb: 3 }}>
                Create a Beneficiary
              </Typography>

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

              <form onSubmit={handleSubmit}>
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
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={submitting}
                      sx={{ mt: 2 }}
                    >
                      {submitting ? "Creating..." : "Create Beneficiary"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
