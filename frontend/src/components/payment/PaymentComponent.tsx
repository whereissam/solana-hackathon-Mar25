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
import { useMutation } from "@apollo/client";
import {
  CREATE_CRYPTO_DONATION,
  CRYPTO_PAYMENT_COMPLETED,
} from "@/lib/mutations/payment-mutations";
import { useDonationStore } from "@/store/donationStore";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type PaymentMethod = "stripe" | "solana" | null;

interface PaymentComponentProps {
  beneficiaryId: number;
  onInitiateDonation?: () => void;
  onDonationComplete?: (signature: string, lamports: number) => Promise<void>;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  beneficiaryId,
  onInitiateDonation,
  onDonationComplete,
}) => {
  const [amount, setAmount] = useState<number>(1); // Default to 1 SOL/USD
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [donationId, setDonationId] = useState<string | null>(null);

  // GraphQL mutations
  const [createCryptoDonation] = useMutation(CREATE_CRYPTO_DONATION);
  const [cryptoPaymentCompleted] = useMutation(CRYPTO_PAYMENT_COMPLETED);

  // Access donation store
  const { startDonation, completeDonation } = useDonationStore();

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
  };

  // Custom handler for when Solana payment is initiated
  const handleSolanaInitiate = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create a pending donation record in the database FIRST
      const donationResult = await createCryptoDonation({
        variables: {
          beneficiaryId: parseInt(beneficiaryId.toString()),
          amountInLamports: Math.round(amount * LAMPORTS_PER_SOL), // Approximate amount in lamports
          tokenCode: "USD",
        },
      });
      console.log("Donation result:", donationResult);

      const newDonationId = donationResult.data.createCryptoDonation.id;
      setDonationId(newDonationId);

      // Call the onInitiateDonation from props if available
      if (onInitiateDonation) {
        onInitiateDonation();
      }

      // Update the donation store
      startDonation(beneficiaryId, amount);

      return newDonationId;
    } catch (err) {
      console.error("Error creating donation record:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while initializing your donation."
      );
      setLoading(false);
      return null;
    }
  };

  // Custom handler for when Solana payment is completed
  const handleSolanaComplete = async (signature: string, lamports: number) => {
    try {
      if (!donationId) {
        throw new Error(
          "No donation ID found. The donation record was not created properly."
        );
      }

      // Mark payment as completed with the transaction hash
      await cryptoPaymentCompleted({
        variables: {
          donationId: donationId,
          txHash: signature,
        },
      });

      // Update the donation store
      completeDonation(signature, lamports);

      // Call the onDonationComplete callback if provided
      if (onDonationComplete) {
        await onDonationComplete(signature, lamports);
      }

      // At this point, the transaction is complete and recorded in your backend
      // SolanaPayButton will handle the redirect to the success page
    } catch (err) {
      console.error("Error processing donation completion:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while finalizing your donation."
      );
    } finally {
      setLoading(false);
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
              backgroundColor: "#6B48FF", // Match the purple color from your screenshot
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
        <WalletProvider>
          <Box display="flex" flexDirection="column" gap={2} width="100%">
            <WalletConnectButton />
            {loading && !donationId ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress size={30} />
              </Box>
            ) : (
              <SolanaPayButton
                amount={amount}
                donationId={donationId ? donationId : "0"}
                onInitiateDonation={async () => {
                  const createdDonationId = await handleSolanaInitiate();
                  return createdDonationId;
                }}
                onDonationComplete={handleSolanaComplete}
              />
            )}
            <Button
              variant="outlined"
              onClick={handleBack}
              size="medium"
              disabled={loading}
            >
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
          sx={{
            backgroundColor: "#6B48FF", // Match the purple color from your screenshot
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
            backgroundColor: "#6B48FF", // Match the purple color from your screenshot
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
          disabled={paymentMethod !== null} // This will be updated in Step 2
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

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
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
    </Paper>
  );
};

export default PaymentComponent;
