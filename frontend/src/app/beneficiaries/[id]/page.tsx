"use client";

import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { use } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Alert,
  Paper,
  Modal,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import AppBar from "@/components/AppBar";
import { useAuthStore } from "@/store/authStore";
import { useDonationStore } from "@/store/donationStore";
import { GET_BENEFICIARY } from "@/lib/queries/beneficiary-queries";
import { CREATE_CRYPTO_DONATION } from "@/lib/mutations/payment-mutations";
import PaymentComponent from "@/components/payment/PaymentComponent";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { NotFoundState } from "@/components/ui/NotFoundState";
import { BeneficiaryInfo } from "@/components/beneficiary/BeneficiaryInfo";
import {
  CryptoDonationResult,
  FormData,
  FormErrors,
} from "@/types/beneficiary";
import "@dialectlabs/blinks/index.css";
// import AppBar from "@/components/AppBar";
// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#111",
  border: "2px solid #333",
  boxShadow: 24,
  p: 4,
  color: "white",
  borderRadius: 2,
};

// Sample thumbnail images from Unsplash
const thumbnailImages = [
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=150&h=150&fit=crop",
];

export default function BeneficiaryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [beneficiaryId, setBeneficiaryId] = React.useState<number>(0);

  React.useEffect(() => {
    if (id === "0") {
      const path = window.location.pathname;
      const urlId = path.split("/").pop();
      if (urlId && !isNaN(parseInt(urlId))) {
        setBeneficiaryId(parseInt(urlId));
      } else {
        console.error("No valid ID found in URL");
        router.push("/charities");
      }
    } else {
      setBeneficiaryId(parseInt(id));
    }
  }, [id, router]);

  const { user, isAuthenticated } = useAuthStore();
  const { startDonation, completeDonation, resetDonation } = useDonationStore();

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [donationId, setDonationId] = React.useState("");
  const [donationInProgress, setDonationInProgress] = React.useState(false);
  const [openDonateModal, setOpenDonateModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);

  const justCompletedRef = React.useRef(false);

  const handleOpenModal = () => {
    resetDonation();
    justCompletedRef.current = false;
    setDonationInProgress(false);
    setOpenDonateModal(true);
  };

  const handleCloseModal = () => {
    if (!donationInProgress) {
      resetDonation();
    }
    setOpenDonateModal(false);
  };

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
    setDonationInProgress(true);
    startDonation(beneficiaryId, 0);
  };

  const handleDonationComplete = async (
    signature: string,
    lamports: number
  ) => {
    try {
      if (justCompletedRef.current) {
        return;
      }

      justCompletedRef.current = true;
      completeDonation(signature, lamports);

      const result = await createCryptoDonation({
        variables: {
          beneficiaryId,
          amountInLamports: lamports,
          tokenCode: "USD",
        },
      });

      const donationId = (result.data as CryptoDonationResult)
        ?.createCryptoDonation?.id;

      if (donationId) {
        setDonationId(donationId);
        setSuccessMessage("Donation successfully processed!");
        setDonationInProgress(false);
        handleCloseModal();
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error("Failed to get donation ID from server response");
      }
    } catch (error: unknown) {
      setDonationInProgress(false);
      justCompletedRef.current = false;
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
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <div className="w-full">
        <AppBar />
      </div>

      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
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

        <Grid container spacing={4}>
          {/* Left Side: Main Image and Thumbnails */}
          <Grid item xs={12} md={8}>
            {/* Main Image */}
            <Box sx={{ mb: 3 }}>
              <Card
                sx={{
                  bgcolor: "rgba(17, 17, 17, 0.8)",
                  borderRadius: 3,
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=500&fit=crop"
                  alt={`${beneficiary.first_name} ${beneficiary.last_name}`}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                {/* Overlay text on image */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(0,0,0,0.7) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: 3,
                  }}
                >
                  <Box sx={{ color: "white", textAlign: "left" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      HELP {beneficiary.first_name.toUpperCase()}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      GET BETTER AND
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      FIND A LOVING
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      HOME ↗
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>

            {/* Thumbnail Gallery */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {thumbnailImages.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: "pointer",
                    border:
                      selectedImage === index
                        ? "3px solid #8B5CF6"
                        : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      border: "2px solid #8B5CF6",
                    },
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    image={image}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Side: Donation Stats and Details */}
          <Grid item xs={12} md={4}>
            {/* Donation Stats Card */}
            <Card
              sx={{
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                borderRadius: 1,
                p: 3,
                mb: 3,
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                SOL 0.{String(beneficiaryId).padStart(2, "0")}
                <Typography
                  component="span"
                  sx={{ ml: 1, fontSize: "1rem", opacity: 0.8 }}
                >
                  Raised
                </Typography>
              </Typography>

              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                {Math.floor(Math.random() * 10) + 1} people have just made a
                donation
              </Typography>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleOpenModal}
                sx={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 1,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                Donate now
              </Button>
            </Card>

            {/* Beneficiary Details Card */}
          </Grid>
        </Grid>

        {/* Description Section */}
        <Box sx={{ mt: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(17, 17, 17, 0.6)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
              The {beneficiary.first_name} {beneficiary.last_name} Foundation is
              a non-profit organisation that supports individuals and families
              in need. Our international team consists of volunteers who are
              passionate about helping those who require assistance. Our
              association is recognised as worthy of support and we are licensed
              to provide aid in accordance with local regulations.
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              <strong>Sustainable commitment on the ground.</strong> Our main
              commitment is in the local community. Reducing suffering and
              providing hope is an important focus of our work. This is why our
              support projects are particularly close to our hearts. We also
              support local welfare activists in ensuring the care of those in
              need, improving the situation in community-run shelters and
              educating the population about responsible care and support.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Donation Modal */}
      <Modal
        open={openDonateModal}
        onClose={handleCloseModal}
        aria-labelledby="donation-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography
            id="donation-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            Donate to {beneficiary.first_name} {beneficiary.last_name}
          </Typography>

          <PaymentComponent
            beneficiaryId={beneficiaryId}
            onInitiateDonation={handleInitiateDonation}
            onDonationComplete={handleDonationComplete}
            onCancel={handleCloseModal}
          />
        </Box>
      </Modal>
    </Box>
  );
}
