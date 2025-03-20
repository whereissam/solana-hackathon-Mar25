"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import PaymentComponent from "@/components/payment/PaymentComponent";

export default function DonatePage() {
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
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Make a Donation
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
            Your generosity helps us make a difference. Choose your preferred
            payment method below.
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <PaymentComponent />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
