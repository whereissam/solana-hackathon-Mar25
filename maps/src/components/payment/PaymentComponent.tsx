"use client";

import React, { useState, useRef } from "react";
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

type PaymentMethod = "stripe" | "solana" | null;

interface PaymentComponentProps {
  beneficiaryId: number;
  onInitiateDonation?: () => void;
  onDonationComplete?: (signature: string, lamports: number) => Promise<void>;
  onCancel?: () => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  beneficiaryId,
  onInitiateDonation,
  onDonationComplete,
  onCancel,
}) => {
  const [amount, setAmount] = useState<number>(1); // Default to 1 SOL/USD
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Track if donation callback has been called to prevent infinite loop
  const donationCallbackRef = useRef<boolean>(false);

  // Mock Stripe Checkout
  const handleStripeCheckout = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (onInitiateDonation) {
        onInitiateDonation();
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      setLoading(false);
      
      // In a real implementation, this would redirect to Stripe
      // For mock purposes, we'll simulate a successful payment
      if (onDonationComplete) {
        const mockSignature = "mock-stripe-" + Math.random().toString(36).substring(2, 15);
        const mockLamports = Math.floor(amount * 1000000000); // Convert to lamports
        await onDonationComplete(mockSignature, mockLamports);
      }
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

  // Mock Solana payment
  const handleSolanaPayment = async () => {
    if (onInitiateDonation) {
      onInitiateDonation();
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(async () => {
      if (onDonationComplete && !donationCallbackRef.current) {
        donationCallbackRef.current = true;
        const mockSignature = "mock-solana-" + Math.random().toString(36).substring(2, 15);
        const mockLamports = Math.floor(amount * 1000000000); // Convert to lamports
        
        try {
          await onDonationComplete(mockSignature, mockLamports);
        } catch (err) {
          donationCallbackRef.current = false;
          console.error("Error completing donation:", err);
          setError(
            err instanceof Error
              ? err.message
              : "An error occurred while completing your donation."
          );
        }
      }
      setIsProcessing(false);
    }, 2000);
  };

  // Handle cancel
  const handleCancel = () => {
    donationCallbackRef.current = false;
    if (onCancel) {
      onCancel();
    }
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
            sx={{
              backgroundColor: "#6B48FF",
              "&:hover": { backgroundColor: "#5A3EDB" },
            }}
          >
            {loading ? "Processing..." : "Pay with Credit Card"}
          </Button>
          <Button variant="outlined" onClick={handleBack} size="medium">
            Back
          </Button>
        </Box>
      );
    } else if (paymentMethod === "solana") {
      return (
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          <Button
            variant="contained"
            onClick={handleSolanaPayment}
            disabled={isProcessing}
            startIcon={
              isProcessing ? <CircularProgress size={20} /> : <RiCoinsFill />
            }
            size="large"
            fullWidth
            sx={{
              backgroundColor: "#6B48FF",
              "&:hover": { backgroundColor: "#5A3EDB" },
            }}
          >
            {isProcessing ? "Processing..." : "Pay with Solana"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleBack}
            size="medium"
            disabled={isProcessing}
          >
            Back
          </Button>
        </Box>
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
          sx={{
            backgroundColor: "#6B48FF",
            "&:hover": { backgroundColor: "#5A3EDB" },
          }}
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
            backgroundColor: "#6B48FF",
            "&:hover": { backgroundColor: "#5A3EDB" },
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
        bgcolor: "#111",
        color: "white",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Support this Beneficiary
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
          inputProps={{ min: 1, step: 0.01 }}
          disabled={paymentMethod !== null || isProcessing}
          variant="outlined"
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputAdornment-root": { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />
      </Box>

      {renderPaymentMethod()}

      {/* Show error from local state */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box mt={4} p={2} bgcolor="#222" borderRadius={1}>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          This is a mock payment component for development purposes.
        </Typography>
        <Typography
          variant="caption"
          display="block"
          mt={1}
          color="rgba(255, 255, 255, 0.7)"
        >
          Beneficiary ID: {beneficiaryId}
        </Typography>
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default PaymentComponent;
