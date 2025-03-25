"use client";

import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Skeleton,
  CircularProgress,
  TextField,
  Divider,
  Alert,
  InputAdornment,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { useAuthStore } from "@/store/authStore";
import { useDonationStore } from "@/store/donationStore";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { GET_BENEFICIARY } from "@/lib/queries/beneficiary-queries";
import { CREATE_CRYPTO_DONATION } from "@/lib/mutations/payment-mutations";
import PaymentComponent from "@/components/payment/PaymentComponent";
import { use } from "react";

// Define the form data interface
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
}

// Define the form errors interface (matching the form data shape)
interface FormErrors {
  first_name: string;
  last_name: string;
  email: string;
}

interface CryptoDonationResult {
  createCryptoDonation: {
    id: string;
    amount: number;
    currency: string;
    status: string;
  };
}

interface Beneficiary {
  first_name: string;
  last_name: string;
  email: string;
  id?: string | number;
}

export default function BeneficiaryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const beneficiaryId = parseInt(id);
  console.log("Beneficiary ID:", beneficiaryId); // Log the beneficiaryId

  const { user, isAuthenticated } = useAuthStore();
  // console.log(user);
  const { startDonation, completeDonation } = useDonationStore();

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [donationId, setDonationId] = React.useState("");

  const { data, loading, error, refetch } = useQuery(GET_BENEFICIARY, {
    variables: { beneficiaryId2: beneficiaryId },
    fetchPolicy: "network-only",
  });

  const [createCryptoDonation] = useMutation(CREATE_CRYPTO_DONATION);

  React.useEffect(() => {
    if (data?.beneficiary) {
      setFormData({
        first_name: data.beneficiary.first_name,
        last_name: data.beneficiary.last_name,
        email: data.beneficiary.email,
      });
    }
  }, [data]);

  const isAdmin = () => {
    if (!isAuthenticated || !user) return false;
    return user.role === "admin";
  };

  const canEdit = () => {
    if (!isAuthenticated || !user) return false;
    if (user.role === "admin") return true;
    return false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { first_name: "", last_name: "", email: "" };
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

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      // await updateBeneficiary({ variables: { id: beneficiaryId, detail: formData } });
      setSuccessMessage("Beneficiary successfully updated!");
      setIsEditMode(false);
      refetch();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error updating beneficiary";
      setErrorMessage(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this beneficiary? This action cannot be undone."
      )
    )
      return;
    setIsDeleting(true);
    try {
      // await deleteBeneficiary({ variables: { id: beneficiaryId } });
      router.push("/charities");
    } catch (error: unknown) {
      setIsDeleting(false);
      const errorMessage =
        error instanceof Error ? error.message : "Error deleting beneficiary";
      setErrorMessage(errorMessage);
    }
  };

  const handleCancel = () => {
    if (data?.beneficiary) {
      setFormData({
        first_name: data.beneficiary.first_name,
        last_name: data.beneficiary.last_name,
        email: data.beneficiary.email,
      });
    }
    setIsEditMode(false);
    setFormErrors({ first_name: "", last_name: "", email: "" });
  };

  const handleGoBack = () => router.push("/charities");

  const handleInitiateDonation = () => {
    startDonation(beneficiaryId, 0); // Amount will be set in PaymentComponent
  };

  const handleDonationComplete = async (
    signature: string,
    lamports: number
  ) => {
    try {
      completeDonation(signature, lamports);
      const result = await createCryptoDonation({
        variables: {
          beneficiaryId,
          amountInLamports: lamports,
          tokenCode: "USD",
        },
      });

      // Properly access the id from the typed result
      const donationId = (result.data as CryptoDonationResult)
        ?.createCryptoDonation?.id;

      if (donationId) {
        setDonationId(donationId);
        setSuccessMessage("Donation successfully processed!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error("Failed to get donation ID from server response");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error processing donation";
      setErrorMessage(errorMessage);
    }
  };

  if (loading) return <LoadingState handleGoBack={handleGoBack} />;
  if (error) return <ErrorState error={error} handleGoBack={handleGoBack} />;
  if (!data?.beneficiary) return <NotFoundState handleGoBack={handleGoBack} />;

  const beneficiary = data.beneficiary;
  const userCanEdit = canEdit();

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
        sx={{ color: "white", px: { xs: 2, sm: 3 }, pb: 8 }}
      >
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={handleGoBack}
            sx={{ color: "white", mb: 3 }}
          >
            Back to Charities
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
              {`${beneficiary.first_name} ${beneficiary.last_name}`}
            </Typography>
            {userCanEdit && !isEditMode && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </Button>
            )}
          </Box>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Left Side: Donation Component */}
            <Grid item xs={12} md={6}>
              <PaymentComponent
                beneficiaryId={beneficiaryId}
                onInitiateDonation={handleInitiateDonation}
                onDonationComplete={handleDonationComplete}
              />
            </Grid>

            {/* Right Side: Beneficiary Info */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: "#111",
                  color: "white",
                }}
              >
                {isEditMode ? (
                  <EditMode
                    formData={formData}
                    formErrors={formErrors}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleDelete={handleDelete}
                    isAdmin={isAdmin}
                    isDeleting={isDeleting}
                  />
                ) : (
                  <ViewMode beneficiary={beneficiary} donationId={donationId} />
                )}
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleGoBack}
              sx={{ minWidth: 200 }}
            >
              Back to Charities
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Separate components for better organization
function LoadingState({ handleGoBack }: { handleGoBack: () => void }) {
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
      <AppBar />
      <Container
        maxWidth="md"
        sx={{ color: "white", px: { xs: 2, sm: 3 }, pb: 8 }}
      >
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={handleGoBack}
            sx={{ color: "white", mb: 2 }}
          >
            Back
          </Button>
          <Skeleton
            variant="rectangular"
            height={60}
            width="70%"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="100%"
            sx={{ mb: 2, borderRadius: 2 }}
          />
        </Box>
      </Container>
    </Box>
  );
}

interface ErrorWithMessage {
  message: string;
}

function ErrorState({
  error,
  handleGoBack,
}: {
  error: Error | ErrorWithMessage | unknown;
  handleGoBack: () => void;
}) {
  const getErrorMessage = (err: Error | ErrorWithMessage | unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }

    // Check if error is an object with a message property
    if (
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
    ) {
      return err.message;
    }

    // Default error message if we can't extract a message
    return "Unable to load the beneficiary details. Please try again later.";
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
      <AppBar />
      <Container
        maxWidth="md"
        sx={{ color: "white", px: { xs: 2, sm: 3 }, pb: 8 }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography color="error" variant="h4">
            Error loading beneficiary details
          </Typography>
          <Typography sx={{ mt: 2 }}>{getErrorMessage(error)}</Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleGoBack}>
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function NotFoundState({ handleGoBack }: { handleGoBack: () => void }) {
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
      <AppBar />
      <Container
        maxWidth="md"
        sx={{ color: "white", px: { xs: 2, sm: 3 }, pb: 8 }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4">Beneficiary Not Found</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            The requested beneficiary could not be found or has been removed.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

interface EditModeProps {
  formData: FormData;
  formErrors: FormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isAdmin: () => boolean;
  isDeleting: boolean;
}
function EditMode({
  formData,
  formErrors,
  handleInputChange,
  handleSave,
  handleCancel,
  handleDelete,
  isAdmin,
  isDeleting,
}: EditModeProps) {
  return (
    <Grid container spacing={3}>
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
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
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
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
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
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
          }}
        >
          {isAdmin() && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete Beneficiary"
              )}
            </Button>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

// ViewMode props interface
interface ViewModeProps {
  beneficiary: Beneficiary;
  donationId?: string;
}

function ViewMode({ beneficiary, donationId }: ViewModeProps) {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            First Name
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {beneficiary.first_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Last Name
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {beneficiary.last_name}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Email Address
        </Typography>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EmailIcon fontSize="small" /> {beneficiary.email}
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          ID
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {donationId}
        </Typography>
      </Box>
    </Box>
  );
}
