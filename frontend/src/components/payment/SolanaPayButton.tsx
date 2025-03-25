"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeURL, findReference } from "@solana/pay";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  TransactionSignature,
  SendOptions,
  Commitment,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import { RiCoinsFill, RiQrCodeLine } from "react-icons/ri";
import { BigNumber } from "bignumber.js";
import { useDonationStore } from "@/store/donationStore";

interface SolanaPayButtonProps {
  amount: number;
  donationId: string;
  onDonationComplete?: (
    signature: string,
    lamports: number
  ) => Promise<void | unknown>;
  onInitiateDonation?: () => void | Promise<string | null>;
}

interface TransactionResponse {
  transaction: string;
  message?: string;
  currentPrice?: number;
  adjustedPrice?: number;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({
  amount,
  donationId, // Add donationId to destructured props
  onDonationComplete,
  onInitiateDonation,
}) => {
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  // const recipient = new PublicKey("YOUR_ADDRESS");

  const router = useRouter();
  const wallet = useWallet();
  const { connection } = useConnection();

  // Get the donation state from Zustand
  const { isProcessing, failDonation } = useDonationStore();

  // Create a more structured error handler
  const handleError = (error: unknown): string => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "An unknown error occurred";

    // Update the Zustand store with the error
    failDonation(errorMessage);

    return errorMessage;
  };

  // Handle Solana Pay button click for wallet users
  const handleSolanaPayClick = async (): Promise<void> => {
    if (!wallet.connected || !wallet.publicKey) {
      setWalletError("Please connect your wallet first");
      return;
    }

    // Call the onInitiateDonation callback to update the store
    if (onInitiateDonation) {
      onInitiateDonation();
    }

    setLoadingWallet(true);
    setWalletError(null);

    console.log(
      "handleSolanaPayClick",
      amount,
      wallet.publicKey.toString(),
      donationId
    );

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
          donationId, // Include donationId in the request
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

      // Calculate the lamports (based on amount and price from response)
      // This calculation should match what's done on the server
      const lamports = Math.round(
        (amount / (data.adjustedPrice || 1)) * LAMPORTS_PER_SOL
      );

      // If there's a donation complete callback, call it
      if (onDonationComplete) {
        await onDonationComplete(signature, lamports);
      } else {
        // If no callback, redirect to success page as before
        router.push(`/solana-success?signature=${signature}&amount=${amount}`);
      }
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
      const merchantWalletAddress = process.env.NEXT_PUBLIC_MERCHANT_WALLET;

      if (!merchantWalletAddress) {
        console.warn(
          "NEXT_PUBLIC_MERCHANT_WALLET not set, using system program address"
        );
      }

      const merchantAddress = new PublicKey(
        merchantWalletAddress || "11111111111111111111111111111111"
      );

      // Generate a new reference key for tracking this transaction
      const reference = new Keypair().publicKey;

      const url = encodeURL({
        recipient: merchantAddress,
        amount: new BigNumber(amount.toString()),
        label: "UnifyGiving",
        message: "Donation",
        reference, // Use the reference key here
        memo: `donation-${Date.now()}`,
      });

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        url.toString()
      )}&size=300x300`;

      setQrCode(qrCodeUrl);
      setShowQR(true);

      // You can use the reference to find the transaction later
      const signatureInfo = await findReference(connection, reference, {
        finality: "confirmed",
      });

      console.log("Transaction signature:", signatureInfo);
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
        disabled={loadingWallet || !wallet.connected || isProcessing}
        startIcon={
          loadingWallet ? <CircularProgress size={20} /> : <RiCoinsFill />
        }
        fullWidth
        sx={{
          backgroundColor: "#6B48FF", // Match the purple color from your screenshot
          "&:hover": { backgroundColor: "#5A3EDB" },
        }}
      >
        {loadingWallet ? "Processing..." : "Pay with Solana"}
      </Button>

      <Button
        variant="outlined"
        onClick={handleShowQR}
        startIcon={<RiQrCodeLine />}
        disabled={isProcessing}
        fullWidth
      >
        Show QR Code for Mobile
      </Button>

      {walletError && !isProcessing && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {walletError}
        </Alert>
      )}

      {!wallet.connected && !isProcessing && (
        <Alert severity="info" sx={{ width: "100%" }}>
          Connect your Solana wallet to pay with SOL
        </Alert>
      )}
    </Box>
  );
};

export default SolanaPayButton;
