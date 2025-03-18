// src/components/payment/PaymentComponent.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { FaCreditCard } from "react-icons/fa";
import { RiCoinsFill } from "react-icons/ri";
import WalletProvider from "./WalletProvider";
import WalletConnectButton from "./WalletConnectButton";
import SolanaPayButton from "./SolanaPayButton";
import { color } from "@/styles/theme";

type PaymentMethod = "stripe" | "solana" | null;

const PaymentComponent: React.FC = () => {
  const [amount, setAmount] = useState<number>(25);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // Handle Stripe Checkout
  const handleStripeCheckout = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/create-checkout-session", {
        amount: amount * 100, // Convert to cents for Stripe
        currency: "usd",
      });

      window.location.href = data.url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating your checkout session."
      );
      setLoading(false);
    }
  };

  // Reset payment method selection
  const handleBack = () => {
    setPaymentMethod(null);
    setError(null);
  };

  // Render based on selected payment method
  const renderPaymentMethod = () => {
    if (paymentMethod === "stripe") {
      return (
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          <Button
            variant="contained"
            onClick={handleStripeCheckout}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <FaCreditCard />
            }
            size="large"
            fullWidth
          >
            {loading ? "Processing..." : "Pay with Stripe"}
          </Button>
          <Button variant="outlined" onClick={handleBack} size="medium">
            Back
          </Button>
        </Box>
      );
    } else if (paymentMethod === "solana") {
      return (
        <WalletProvider>
          <Box display="flex" flexDirection="column" gap={2} width="100%">
            <WalletConnectButton />
            <SolanaPayButton amount={amount} />
            <Button variant="outlined" onClick={handleBack} size="medium">
              Back
            </Button>
          </Box>
        </WalletProvider>
      );
    }

    // Default: Show payment method selection
    return (
      <Box display="flex" flexDirection="column" gap={3} width="100%">
        <Button
          variant="contained"
          onClick={() => setPaymentMethod("stripe")}
          startIcon={<FaCreditCard />}
          size="large"
          fullWidth
        >
          Pay with Credit Card
        </Button>

        <Divider>
          <Typography variant="body2" color="textSecondary">
            OR
          </Typography>
        </Divider>

        <Button
          variant="contained"
          onClick={() => setPaymentMethod("solana")}
          startIcon={<RiCoinsFill />}
          size="large"
          fullWidth
          sx={{
            backgroundColor: color.primary[700],
            "&:hover": {
              backgroundColor: color.primary[800],
            },
          }}
        >
          Pay with Solana
        </Button>
      </Box>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 480,
        mx: "auto",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Donation Details
      </Typography>

      <Box mb={4}>
        <TextField
          fullWidth
          label="Donation Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            min: 1,
            step: 0.01,
          }}
          disabled={paymentMethod !== null}
          variant="outlined"
          margin="normal"
        />
      </Box>

      {renderPaymentMethod()}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box mt={4} p={2} bgcolor="background.default" borderRadius={1}>
        <Typography variant="body2" color="textSecondary">
          This is a secure payment page. Your payment details are encrypted.
        </Typography>
        <Typography variant="caption" display="block" mt={1}>
          For testing Stripe, use card:{" "}
          <Box component="span" fontWeight="bold">
            4242 4242 4242 4242
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
};

export default PaymentComponent;
