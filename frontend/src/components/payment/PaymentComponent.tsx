"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { useDonationStore } from "@/store/donationStore";

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

  // Track if donation callback has been called to prevent infinite loop
  const donationCallbackRef = useRef<boolean>(false);

  // Access donation store for state tracking
  const {
    isProcessing,
    currentDonation,
    error: donationError,
    resetDonation,
    resetError,
  } = useDonationStore();

  // Monitor donation status changes but with safeguard against multiple callbacks
  useEffect(() => {
    // Only proceed if we have a completed donation with signature AND the callback hasn't already been called
    if (
      currentDonation &&
      currentDonation.status === "completed" &&
      currentDonation.signature &&
      onDonationComplete &&
      !donationCallbackRef.current
    ) {
      // Set the ref to true to prevent calling the callback again for this donation
      donationCallbackRef.current = true;

      // Call the parent's completion handler
      onDonationComplete(
        currentDonation.signature,
        currentDonation.lamports
      ).catch((err) => {
        console.error("Error in donation completion:", err);
        setError(
          err instanceof Error ? err.message : "Failed to complete donation"
        );
        // Reset our flag if there was an error
        donationCallbackRef.current = false;
      });
    }
  }, [currentDonation, onDonationComplete]);

  // Reset when donation state changes to non-completed
  useEffect(() => {
    if (!currentDonation || currentDonation.status === "idle") {
      donationCallbackRef.current = false;
    }
  }, [currentDonation]);

  // Reset state when component mounts
  useEffect(() => {
    // Reset on mount
    donationCallbackRef.current = false;
    return () => {
      // Reset on unmount
      resetDonation();
    };
  }, [resetDonation]);

  // Handle Stripe Checkout
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

      const { data } = await axios.post("/api/create-checkout-session", {
        amount: amount * 100, // Convert to cents for Stripe
        currency: "usd",
        beneficiaryId, // Include beneficiaryId in the request
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
    resetError(); // Reset donation store error
  };

  // Handle donation completion from SolanaPayButton - Added safeguard against multiple calls
  const handleSolanaComplete = async (signature: string, lamports: number) => {
    // Skip if we've already processed this donation
    if (donationCallbackRef.current) {
      return;
    }

    // Just forward to parent component's callback if provided
    if (onDonationComplete) {
      donationCallbackRef.current = true;
      try {
        await onDonationComplete(signature, lamports);
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
  };

  // Handle cancel
  const handleCancel = () => {
    resetDonation(); // Clear donation state
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
          <WalletConnectButton />
          <SolanaPayButton
            amount={amount}
            beneficiaryId={beneficiaryId}
            onDonationComplete={handleSolanaComplete}
          />
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
        {/* Add divider and new Solana Action button */}
        <Divider>
          <Typography variant="body2" color="textSecondary">
            OR
          </Typography>
        </Divider>
        <Button
          variant="contained"
          onClick={() =>
            window.open(
              "https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fsolana-hackathon-mar25.onrender.com%2Fsolana-actions%2F3",
              "_blank"
            )
          }
          startIcon={<RiCoinsFill />}
          size="large"
          fullWidth
          sx={{
            backgroundColor: "#14F195", // Solana green color
            "&:hover": { backgroundColor: "#0DC982" },
            color: "#000", // Black text for better contrast on green
          }}
        >
          Pay with Blinks
        </Button>
        {/* https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fsolana-hackathon-mar25.onrender.com%2Fsolana-actions%2F3 */}
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

      {/* Wrap with WalletProvider at the component level */}
      <WalletProvider>{renderPaymentMethod()}</WalletProvider>

      {/* Show error from local state or donation store */}
      {(error || donationError) && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error || donationError}
        </Alert>
      )}

      <Box mt={4} p={2} bgcolor="#222" borderRadius={1}>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          This is a secure payment page. Your payment details are encrypted.
        </Typography>
        <Typography
          variant="caption"
          display="block"
          mt={1}
          color="rgba(255, 255, 255, 0.7)"
        >
          For testing Stripe, use card:{" "}
          <Box component="span" fontWeight="bold" color="white">
            4242 4242 4242 4242
          </Box>
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
