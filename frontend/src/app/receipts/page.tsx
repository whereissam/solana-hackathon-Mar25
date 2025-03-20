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
} from "@mui/material";
import Link from "next/link";
import AppBar from "@/components/AppBar";

// Define the donation receipt interface
interface DonationReceipt {
  id: string;
  date: Date;
  donatee: string;
  amount: number;
  currency: string;
  donationType: string;
  signature: string;
}

// Skeleton card for loading state - updated to match actual card layout
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

export default function ReceiptsPage() {
  const [isMounted, setIsMounted] = React.useState(false);

  // Simulate loading state for demonstration
  const [isFetching, setIsFetching] = React.useState(true);

  // Mock data - replace with your actual data fetching logic
  const receipts: DonationReceipt[] = [
    {
      id: "1",
      date: new Date(),
      donatee: "Example Donatee",
      amount: 100,
      currency: "€",
      donationType: "One time Donation",
      signature: "example-signature",
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000), // yesterday
      donatee: "Local Food Bank",
      amount: 25,
      currency: "€",
      donationType: "Monthly Donation",
      signature: "food-bank-signature",
    },
    {
      id: "3",
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      donatee: "Education Fund",
      amount: 75,
      currency: "€",
      donationType: "One time Donation",
      signature: "education-signature",
    },
  ];

  React.useEffect(() => {
    setIsMounted(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsFetching(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Group receipts by date
  const groupedReceipts = React.useMemo(() => {
    const groups: Record<string, DonationReceipt[]> = {};

    receipts.forEach((receipt) => {
      const dateKey = receipt.date.toLocaleDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(receipt);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    }));
  }, [receipts]);

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

        {isFetching ? (
          // Show skeleton groups with the same layout as real content
          groupedReceipts.map((group, groupIndex) => (
            <Box key={`skeleton-group-${groupIndex}`} sx={{ mb: 4 }}>
              <Skeleton
                animation="wave"
                height={32}
                width="20%"
                sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.2)" }}
              />
              <Grid container spacing={3}>
                {Array.from(new Array(group.items.length)).map(
                  (_, itemIndex) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      key={`skeleton-item-${groupIndex}-${itemIndex}`}
                    >
                      <ReceiptCardSkeleton />
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          ))
        ) : groupedReceipts.length > 0 ? (
          // Show actual donation receipts when data is loaded
          groupedReceipts.map((group, groupIndex) => (
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
                {group.items.map((receipt) => (
                  <Grid item xs={12} sm={6} md={6} key={receipt.id}>
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
                          <FixedOneTimeDonationIcon />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#333",
                            }}
                          >
                            {receipt.donatee}
                          </Typography>
                          <Typography sx={{ color: "#666" }}>
                            {receipt.donationType}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "rgb(103, 58, 183)",
                          }}
                        >
                          {receipt.currency} {receipt.amount}
                        </Typography>
                      </CardContent>
                      <Box sx={{ px: 2, pb: 2, mt: "auto" }}>
                        <Link
                          href={`https://explorer.solana.com/address/${receipt.signature}?cluster=devnet#metadata`}
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
                            View NFT
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
