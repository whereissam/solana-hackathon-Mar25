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
  LAMPORTS_PER_SOL,
  Keypair,
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
import { BigNumber } from "bignumber.js";
import { useDonationStore } from "@/store/donationStore";
import { useMutation } from "@apollo/client";
import {
  CREATE_CRYPTO_DONATION,
  CRYPTO_PAYMENT_COMPLETED,
} from "@/lib/mutations/payment-mutations";

interface SolanaPayButtonProps {
  amount: number;
  beneficiaryId: number;
  onDonationComplete?: (
    signature: string,
    lamports: number
  ) => Promise<void | unknown>;
}

interface TransactionResponse {
  transaction: string;
  message?: string;
  currentPrice?: number;
  adjustedPrice?: number;
}

const SolanaPayButton: React.FC<SolanaPayButtonProps> = ({
  amount,
  beneficiaryId,
  onDonationComplete,
}) => {
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [donationId, setDonationId] = useState<string | null>(null);

  const router = useRouter();
  const wallet = useWallet();

  // Create a Solana connection directly rather than using useConnection
  const connection = new Connection(
    clusterApiUrl("devnet"),
    "confirmed" as Commitment
  );

  // Get the donation state from Zustand
  const { isProcessing, startDonation, completeDonation, failDonation } =
    useDonationStore();

  // GraphQL mutations
  const [createCryptoDonation] = useMutation(CREATE_CRYPTO_DONATION);
  const [cryptoPaymentCompleted] = useMutation(CRYPTO_PAYMENT_COMPLETED);

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

  // Create a donation record in the database
  const createDonation = async (): Promise<string | null> => {
    try {
      // Step 1: Create a pending donation record in the database FIRST
      const donationResult = await createCryptoDonation({
        variables: {
          beneficiaryId: parseInt(beneficiaryId.toString()),
          amountInLamports: Math.round(amount * LAMPORTS_PER_SOL), // Approximate amount in lamports
          tokenCode: "USD",
        },
      });

      const newDonationId = donationResult.data.createCryptoDonation.id;
      setDonationId(newDonationId);

      // Update the donation store
      startDonation(beneficiaryId, amount);

      return newDonationId;
    } catch (err) {
      console.error("Error creating donation record:", err);
      handleError(err);
      return null;
    }
  };

  // Complete the donation in the database
  const completeDonationRecord = async (
    txSignature: string,
    lamports: number,
    donId: string
  ) => {
    try {
      const result = await cryptoPaymentCompleted({
        variables: {
          donationId: donId,
          txHash: txSignature,
        },
      });

      // Extract returned values
      const { assetKey, signature } = result.data.cryptoPaymentCompleted;
      console.log("Asset Key:", assetKey, "Signature:", signature);

      // Update the donation store - this triggers UI updates
      completeDonation(txSignature, lamports);

      return result.data.cryptoPaymentCompleted;
    } catch (err) {
      console.error("Error completing donation:", err);
      failDonation(err instanceof Error ? err.message : "Unknown error");
      throw err;
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

    try {
      // Step 1: Create donation record if not already created
      let effectiveDonationId = donationId;
      if (!effectiveDonationId) {
        effectiveDonationId = await createDonation();
        if (!effectiveDonationId) {
          throw new Error("Failed to create donation record");
        }
      }

      // Step 2: Call API route to create a Solana Pay transaction
      const response = await fetch("/api/solana-pay/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          wallet: wallet.publicKey.toString(),
          donationId: effectiveDonationId, // Include donationId in the request
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

      // Step 3: Process the transaction
      const signature = await processTransaction(data.transaction);

      // Calculate the lamports (based on amount and price from response)
      // This calculation should match what's done on the server
      const lamports = Math.round(
        (amount / (data.adjustedPrice || 1)) * LAMPORTS_PER_SOL
      );

      // Step 4: Complete the donation in the database
      await completeDonationRecord(signature, lamports, effectiveDonationId);

      // Step 5: Call the completion callback if provided
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
      console.log("Signing transaction...");
      const signedTx = await wallet.signTransaction(tx);

      // Send the transaction
      console.log("Sending transaction to Solana network...");
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
