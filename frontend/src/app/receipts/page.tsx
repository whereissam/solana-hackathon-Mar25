"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Container,
  Skeleton,
  Chip,
} from "@mui/material";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import AppBar from "@/components/AppBar";
import { useAuthStore } from "@/store/authStore";
import { GET_DONATIONS } from "@/lib/queries/donation-queries";

// Define the donation receipt interface
interface DonationReceipt {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  payment_id: string;
  receipt_addr: string;
  status: string;
  type: string;
}

// Format currency amount
const formatAmount = (amount: number, currency: string) => {
  // Handle SOLANA or other crypto values that might be in lamports or similar small units
  if (currency === "USD" || currency === "EUR" || currency === "€") {
    // For crypto amounts that are represented in the smallest unit (like lamports for SOL)
    // We're assuming donations in USD are stored in cents
    return `${currency === "€" ? currency : currency + " "}${(amount / 100000000).toFixed(2)}`;
  }

  return `${currency} ${amount}`;
};

// Skeleton card for loading state
const ReceiptCardSkeleton = () => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        pb: 1,
      }}
    >
      <Skeleton
        variant="circular"
        width={48}
        height={48}
        animation="wave"
        sx={{ bgcolor: "rgba(103, 58, 183, 0.1)" }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton animation="wave" height={24} width="60%" sx={{ mb: 1 }} />
        <Skeleton animation="wave" height={20} width="40%" />
      </Box>
      <Skeleton
        animation="wave"
        height={24}
        width={60}
        sx={{ bgcolor: "rgba(103, 58, 183, 0.1)" }}
      />
    </CardContent>
    <Box sx={{ px: 2, pb: 2, mt: "auto" }}>
      <Skeleton
        animation="wave"
        height={36}
        variant="rounded"
        width="100%"
        sx={{
          mx: "auto",
          borderRadius: "30px",
          bgcolor: "rgba(103, 58, 183, 0.1)",
        }}
      />
    </Box>
  </Card>
);

// Fixed version of OneTimeDonationIcon component
const FixedOneTimeDonationIcon = () => (
  <svg
    width="53"
    height="54"
    viewBox="0 0 53 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5 51C39.7548 51 50.5 40.2548 50.5 27C50.5 13.7452 39.7548 3 26.5 3C13.2452 3 2.5 13.7452 2.5 27C2.5 40.2548 13.2452 51 26.5 51Z"
      stroke="#903DF4"
      strokeWidth="5"
    />
    <path
      d="M38.5 22.2H14.5L22.7512 15M14.5 31.8H38.5L30.2512 39"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Recurring donation icon
const RecurringDonationIcon = () => (
  <svg
    width="53"
    height="54"
    viewBox="0 0 53 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5 51C39.7548 51 50.5 40.2548 50.5 27C50.5 13.7452 39.7548 3 26.5 3C13.2452 3 2.5 13.7452 2.5 27C2.5 40.2548 13.2452 51 26.5 51Z"
      stroke="#903DF4"
      strokeWidth="5"
    />
    <path
      d="M15 27C15 33.0751 19.9249 38 26 38C32.0751 38 37 33.0751 37 27C37 20.9249 32.0751 16 26 16"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M26 16L21 21M26 16L31 21"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ReceiptsPage() {
  const { user, token, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use Apollo client to fetch donations
  const { loading, error, data } = useQuery(GET_DONATIONS, {
    variables: { donorId: user?.id ? parseInt(user.id) : 1 },
    skip: !isAuthenticated || !token,
    fetchPolicy: "network-only",
  });

  // Generate donation type display name
  const getDonationTypeDisplay = (type: string) => {
    switch (type?.toLowerCase()) {
      case "crypto":
        return "Crypto Donation";
      case "recurring":
        return "Monthly Donation";
      default:
        return "One Time Donation";
    }
  };

  // Group receipts by date
  const groupedDonations = React.useMemo(() => {
    if (!data?.donations) return [];

    const groups: Record<string, DonationReceipt[]> = {};

    data.donations.forEach((donation: DonationReceipt) => {
      const date = new Date(donation.created_at);
      const dateKey = date.toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(donation);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    }));
  }, [data]);

  // Only render a minimal placeholder during server-side rendering
  if (!isMounted) {
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
      />
    );
  }

  const showLoginMessage = !isAuthenticated || !token;

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
        maxWidth="lg"
        sx={{
          color: "white",
          px: { xs: 2, sm: 3 },
          pb: 8,
        }}
      >
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            My Donations
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Track all your charitable contributions and view digital receipts.
            Each donation makes a meaningful impact on the causes you care
            about.
          </Typography>
        </Box>

        {showLoginMessage ? (
          <Box sx={{ textAlign: "center", my: 6, py: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Please log in to view your donations
            </Typography>
            <Typography sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}>
              You need to be logged in to access your donation history
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgb(103, 58, 183)",
                borderRadius: "30px",
                px: 4,
                "&:hover": {
                  bgcolor: "rgb(83, 38, 163)",
                },
              }}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
          </Box>
        ) : loading ? (
          // Show skeleton loader
          <Box sx={{ mb: 4 }}>
            <Skeleton
              animation="wave"
              height={32}
              width="20%"
              sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.2)" }}
            />
            <Grid container spacing={3}>
              {Array.from(new Array(2)).map((_, index) => (
                <Grid item xs={12} sm={6} md={6} key={`skeleton-${index}`}>
                  <ReceiptCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : error ? (
          // Show error state
          <Box sx={{ textAlign: "center", my: 6, py: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "error.main" }}>
              Error loading donations
            </Typography>
            <Typography sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}>
              {error.message ||
                "An error occurred while fetching your donations. Please try again later."}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgb(103, 58, 183)",
                borderRadius: "30px",
                px: 4,
                "&:hover": {
                  bgcolor: "rgb(83, 38, 163)",
                },
              }}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Box>
        ) : groupedDonations.length > 0 ? (
          // Show actual donation receipts
          groupedDonations.map((group, groupIndex) => (
            <Box key={groupIndex} sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "rgba(255, 255, 255, 0.7)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  pb: 1,
                }}
              >
                {group.date}
              </Typography>
              <Grid container spacing={3}>
                {group.items.map((donation) => (
                  <Grid item xs={12} sm={6} md={6} key={donation.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "16px",
                        overflow: "hidden",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 2,
                          pb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(103, 58, 183, 0.1)",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                          }}
                        >
                          {donation.type === "recurring" ? (
                            <RecurringDonationIcon />
                          ) : (
                            <FixedOneTimeDonationIcon />
                          )}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#333",
                              }}
                            >
                              {donation.type === "crypto"
                                ? "Crypto Donation"
                                : "Charity Donation"}
                            </Typography>
                            <Chip
                              label={donation.status}
                              size="small"
                              color={
                                donation.status === "completed"
                                  ? "success"
                                  : "warning"
                              }
                              sx={{ height: 20, fontSize: "0.7rem" }}
                            />
                          </Box>
                          <Typography sx={{ color: "#666" }}>
                            {getDonationTypeDisplay(donation.type)}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "rgb(103, 58, 183)",
                          }}
                        >
                          {formatAmount(donation.amount, donation.currency)}
                        </Typography>
                      </CardContent>
                      <Box sx={{ px: 2, pb: 2, mt: "auto" }}>
                        <Link
                          href={`https://explorer.solana.com/address/${donation.receipt_addr}?cluster=devnet`}
                          target="_blank"
                          passHref
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                              borderRadius: "30px",
                              borderColor: "rgb(103, 58, 183)",
                              color: "rgb(103, 58, 183)",
                              "&:hover": {
                                borderColor: "rgb(83, 38, 163)",
                                backgroundColor: "rgba(103, 58, 183, 0.04)",
                              },
                            }}
                          >
                            View NFT Receipt
                          </Button>
                        </Link>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          // Show empty state
          <Box sx={{ textAlign: "center", my: 6, py: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              No donations yet
            </Typography>
            <Typography sx={{ mb: 3, color: "rgba(255, 255, 255, 0.7)" }}>
              Make your first donation to see your contributions here
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgb(103, 58, 183)",
                borderRadius: "30px",
                px: 4,
                "&:hover": {
                  bgcolor: "rgb(83, 38, 163)",
                },
              }}
            >
              Donate Now
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
