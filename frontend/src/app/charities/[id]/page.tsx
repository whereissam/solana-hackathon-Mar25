"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { use } from "react";
import { useAuthStore } from "@/store/authStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Import components
import CharityInfoSection from "@/components/charities/CharityInfoSection";
import BeneficiaryList from "@/components/charities/BeneficiaryList";
import CreateBeneficiaryModal from "@/components/charities/CreateBeneficiaryModal";

// Interfaces for the component - these could be moved to a types file
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

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Charity {
  id: string;
  name: string;
  description?: string;
  address?: Address;
  beneficiaries?: Beneficiary[];
  admin?: Admin;
}

export default function CharityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const charityId = id ? parseInt(id) : null;

  // Use the auth store to get the current user
  const { user, isAuthenticated } = useAuthStore();

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Add retry logic state
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const { data, loading, error, refetch } = useQuery(GET_ALL_CHARITIES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

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

  // Check if current user is the admin of this charity or has admin role
  const isCharityAdmin = (charity: Charity) => {
    if (!isAuthenticated || !user) return false;

    // Check if user has admin role
    if (user.role === "admin") return true;

    // Check if user is the charity admin
    if (charity.admin && user.email === charity.admin.email) return true;

    return false;
  };

  // Manual retry function
  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      refetch();
      setRetryCount((prevCount) => prevCount + 1);
      setIsRetrying(false);
    }, 1000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigateToBeneficiary = (beneficiaryId: string) => {
    router.push(`/beneficiaries/${beneficiaryId}`);
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

  // Check if user is admin for this charity
  const userIsAdmin = isCharityAdmin(charity);

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
        <Box sx={{ my: 4, textAlign: "center", position: "relative" }}>
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

          {/* Admin action button */}
          {userIsAdmin && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenModal}
              >
                Add Beneficiary
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={4}>
          {/* Charity Info */}
          <Grid item xs={12} md={6}>
            <CharityInfoSection charity={charity} />
          </Grid>

          {/* Beneficiaries List */}
          <Grid item xs={12} md={6}>
            <BeneficiaryList
              beneficiaries={charity.beneficiaries || []}
              userIsAdmin={userIsAdmin}
              onAddClick={handleOpenModal}
              onBeneficiaryClick={navigateToBeneficiary}
            />
          </Grid>
        </Grid>

        {/* Create Beneficiary Modal */}
        <CreateBeneficiaryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          charityId={charityId || 0}
        />
      </Container>
    </Box>
  );
}
