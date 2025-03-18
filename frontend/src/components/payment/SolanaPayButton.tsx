// src/components/payment/SolanaPayButton.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeURL } from "@solana/pay";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  TransactionSignature,
  SendOptions,
  Commitment,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import { RiCoinsFill, RiQrCodeLine } from "react-icons/ri";
import { BigNumber } from "bignumber.js"; // Add BigNumber import

interface SolanaPayButtonProps {
  amount: number;
}

interface TransactionResponse {
  transaction: string;
  message?: string;
  currentPrice?: number;
  adjustedPrice?: number;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({ amount }) => {
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  const router = useRouter();
  const wallet = useWallet();

  // Create a more structured error handler
  const handleError = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      return "An unknown error occurred";
    }
  };

  // Handle Solana Pay button click for wallet users
  const handleSolanaPayClick = async (): Promise<void> => {
    if (!wallet.connected || !wallet.publicKey) {
      setWalletError("Please connect your wallet first");
      return;
    }

    setLoadingWallet(true);
    setWalletError(null);

    console.log("handleSolanaPayClick", amount, wallet.publicKey.toString());

    try {
      // Call API route to create a Solana Pay transaction
      const response = await fetch("/api/solana-pay/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          wallet: wallet.publicKey.toString(),
        }),
      });

      // Check for HTTP errors first
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check for correct content type
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response format");
      }

      // Parse the response JSON
      const data = (await response.json()) as TransactionResponse;

      if (!data.transaction) {
        throw new Error("Missing transaction data in response");
      }

      // Process the transaction
      const signature = await processTransaction(data.transaction);

      // Redirect to success page
      router.push(`/donate/success?signature=${signature}&amount=${amount}`);
    } catch (err) {
      console.error("Error in Solana Pay flow:", err);
      setWalletError(handleError(err));
    } finally {
      setLoadingWallet(false);
    }
  };

  // Separate function to process the transaction
  const processTransaction = async (
    transactionBase64: string
  ): Promise<TransactionSignature> => {
    try {
      // Deserialize the transaction
      const transactionBuffer = Buffer.from(transactionBase64, "base64");
      const tx = Transaction.from(transactionBuffer);

      // Ensure wallet is still connected
      if (!wallet.signTransaction) {
        throw new Error("Wallet doesn't support transaction signing");
      }

      // Sign the transaction
      const signedTx = await wallet.signTransaction(tx);

      // Connect to Solana network
      const connection = new Connection(
        clusterApiUrl("devnet"),
        "confirmed" as Commitment
      );

      // Send the transaction
      const signature = await connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        } as SendOptions
      );

      console.log("Transaction sent with signature:", signature);

      // Wait for confirmation
      // The confirmTransaction API has changed in newer versions of @solana/web3.js
      // Using the appropriate signature based on your library version

      // Version 1: For older versions of @solana/web3.js
      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed" as Commitment
      );

      if (confirmation.value.err) {
        throw new Error(
          "Transaction failed: " + JSON.stringify(confirmation.value.err)
        );
      }

      return signature;
    } catch (err) {
      console.error("Error processing transaction:", err);
      throw err; // Re-throw to handle in the calling function
    }
  };

  // Generate and show QR code for mobile users
  const handleShowQR = async (): Promise<void> => {
    try {
      // Get merchant address from env or use a placeholder
      const merchantWalletAddress = process.env.NEXT_PUBLIC_MERCHANT_WALLET;

      if (!merchantWalletAddress) {
        console.warn(
          "NEXT_PUBLIC_MERCHANT_WALLET not set, using system program address"
        );
      }

      // Use a valid Solana address
      const merchantAddress = new PublicKey(
        merchantWalletAddress || "11111111111111111111111111111111"
      );

      // Convert to the format Solana Pay expects - needs to be converted to BigNumber
      // When using Solana Pay's encodeURL we need to handle the Decimal/BigNumber conversion
      // Import BigNumber from bignumber.js if available, or convert manually

      // Create the payment URL - using the amount directly
      const url = encodeURL({
        recipient: merchantAddress,
        amount: new BigNumber(amount.toString()),
        label: "UnifyGiving",
        message: "Donation",
        memo: `donation-${Date.now()}`,
      });

      // Generate QR code
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        url.toString()
      )}&size=300x300`;

      setQrCode(qrCodeUrl);
      setShowQR(true);
    } catch (err) {
      console.error("Error generating QR code:", err);
      setWalletError(handleError(err));
    }
  };

  // QR code view
  if (showQR) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography variant="h6">
          Scan with a Solana Pay compatible wallet
        </Typography>

        {qrCode ? (
          <Box
            component="img"
            src={qrCode}
            alt="Solana Pay QR Code"
            sx={{
              width: 250,
              height: 250,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          />
        ) : (
          <CircularProgress />
        )}

        <Button variant="outlined" onClick={() => setShowQR(false)} fullWidth>
          Back to payment options
        </Button>
      </Box>
    );
  }

  // Normal view (Pay with wallet and QR options)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Button
        variant="contained"
        onClick={handleSolanaPayClick}
        disabled={loadingWallet || !wallet.connected}
        startIcon={
          loadingWallet ? <CircularProgress size={20} /> : <RiCoinsFill />
        }
        fullWidth
      >
        {loadingWallet ? "Processing..." : "Pay with Wallet"}
      </Button>

      <Button
        variant="outlined"
        onClick={handleShowQR}
        startIcon={<RiQrCodeLine />}
        fullWidth
      >
        Show QR Code for Mobile
      </Button>

      {walletError && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {walletError}
        </Alert>
      )}

      {!wallet.connected && (
        <Alert severity="info" sx={{ width: "100%" }}>
          Connect your Solana wallet to pay with SOL
        </Alert>
      )}
    </Box>
  );
};

export default SolanaPayButton;
