"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Connection,
  clusterApiUrl,
  TransactionResponse,
} from "@solana/web3.js";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import AppBar from "@/components/AppBar";

// Define interface for transaction details
interface TransactionDetails {
  signature: string;
  amount: string | null;
  blockTime: string;
  status: string;
}

function SolanaSuccessContent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // More robust signature extraction
  let signature: string | null = null;

  // Get the raw signature from URL params
  const rawSignature = searchParams.get("signature");

  if (rawSignature) {
    // First check if it contains "success?" and handle it
    if (rawSignature.includes("success?")) {
      signature = rawSignature.split("success?")[1];
    } else {
      signature = rawSignature;
    }
  }

  const amount = searchParams.get("amount");

  useEffect(() => {
    const fetchTransactionDetails = async (): Promise<void> => {
      if (!signature) {
        setError("No transaction signature found");
        setLoading(false);
        return;
      }

      try {
        // Connect to Solana devnet (change to mainnet for production)
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Get transaction details
        const transaction = (await connection.getTransaction(signature, {
          commitment: "confirmed",
        })) as TransactionResponse | null;

        if (!transaction) {
          setError("Transaction not found. It might still be processing.");
          setLoading(false);
          return;
        }

        setTransactionDetails({
          signature,
          amount,
          blockTime: transaction.blockTime
            ? new Date(transaction.blockTime * 1000).toLocaleString()
            : "Unknown",
          status: "Confirmed",
        });
      } catch (err: unknown) {
        console.error("Error fetching transaction:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error fetching transaction details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [signature, amount]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          textAlign: "center",
          py: 8,
        }}
      >
        <CircularProgress
          size={60}
          sx={{ color: "rgb(103, 58, 183)", mb: 3 }}
        />
        <Typography variant="h6" color="white">
          Verifying transaction...
        </Typography>
      </Box>
    );
  }

  if (error || !signature) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: "error.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          !
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Transaction Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
          {error || "No transaction information found"}
        </Typography>
        <Button
          component={Link}
          href="/"
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
          Return to Home
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "white",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          position: "relative",
        }}
      >
        {/* Success Header with Large Checkmark */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "white",
              mx: "auto",
              mb: 3,
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
            }}
          >
            ✓
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Transaction Successful!
          </Typography>
        </Box>

        {/* Transaction Details */}
        <Box sx={{ px: 5, pb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: 18,
              color: "#555",
              fontWeight: "medium",
              mb: 2,
            }}
          >
            Solana Donation Payment
          </Typography>

          <Box sx={{ mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "baseline",
                mb: 3,
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {amount}
              </Typography>
              <Typography
                variant="h5"
                sx={{ ml: 1, color: "#555", fontWeight: "medium" }}
              >
                USD
              </Typography>
            </Box>

            <Box
              sx={{
                height: 1,
                bgcolor: "#f0f0f0",
                mb: 3,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: "#666" }}>Transaction ID:</Typography>
              <Typography sx={{ fontWeight: "medium", color: "#333" }}>
                {signature.slice(0, 8)}...{signature.slice(-8)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: "#666" }}>Status:</Typography>
              <Typography
                sx={{
                  fontWeight: "medium",
                  color: "#4CAF50",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {transactionDetails?.status || "Confirmed"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#666" }}>Date & Time:</Typography>
              <Typography sx={{ fontWeight: "medium", color: "#333" }}>
                {transactionDetails?.blockTime || "Processing"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Visual element for the receipt "tear" effect */}
        <Box
          sx={{
            position: "relative",
            height: 20,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 20,
              background:
                "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
              transform: "rotate(180deg)",
            },
          }}
        />

        {/* Message */}
        <Box sx={{ px: 5, py: 3, textAlign: "center", bgcolor: "#f9f9f9" }}>
          <Typography sx={{ color: "#555", mb: 3 }}>
            Thank you for your donation. Your transaction has been confirmed on
            the Solana blockchain.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{
                bgcolor: "rgb(103, 58, 183)",
                borderRadius: "30px",
                px: 3,
                "&:hover": {
                  bgcolor: "rgb(83, 38, 163)",
                },
              }}
            >
              Return to Home
            </Button>

            <Button
              component="a"
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "rgb(103, 58, 183)",
                color: "rgb(103, 58, 183)",
                px: 3,
                "&:hover": {
                  borderColor: "rgb(83, 38, 163)",
                  bgcolor: "rgba(103, 58, 183, 0.04)",
                },
              }}
            >
              View on Explorer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default function SolanaSuccess() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress size={60} sx={{ color: "rgb(103, 58, 183)" }} />
            </Box>
          }
        >
          <SolanaSuccessContent />
        </Suspense>
      </Container>
    </Box>
  );
}
