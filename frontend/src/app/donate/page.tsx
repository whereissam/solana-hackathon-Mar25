// src/app/donate/page.tsx
"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import PaymentComponent from "@/components/payment/PaymentComponent";

export default function DonatePage(): JSX.Element {
  return (
    <>
      <AppBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Make a Donation
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Your generosity helps us make a difference. Choose your preferred
          payment method below.
        </Typography>
        <Box sx={{ mt: 6 }}>
          <PaymentComponent />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
