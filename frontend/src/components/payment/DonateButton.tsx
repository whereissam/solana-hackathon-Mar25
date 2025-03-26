// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
//   InputAdornment,
// } from "@mui/material";
// import { useMutation } from "@apollo/client";
// import { gql } from "@apollo/client";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import WalletProvider from "@/components/payment/WalletProvider";
// import WalletConnectButton from "@/components/payment/WalletConnectButton";
// import SolanaPayButton from "@/components/payment/SolanaPayButton";
// import { useDonationStore } from "@/store/donationStore";

// // GraphQL mutation for creating a crypto donation
// const CREATE_CRYPTO_DONATION = gql`
//   mutation CreateCryptoDonation(
//     $beneficiaryId: Int!
//     $amountInLamports: Int!
//     $tokenCode: String!
//   ) {
//     createCryptoDonation(
//       beneficiaryId: $beneficiaryId
//       amountInLamports: $amountInLamports
//       tokenCode: $tokenCode
//     ) {
//       amount
//       currency
//       id
//       status
//     }
//   }
// `;

// interface DonateButtonProps {
//   beneficiaryId: number;
//   beneficiaryName: string;
// }

// const DonateButton: React.FC<DonateButtonProps> = ({
//   beneficiaryId,
//   beneficiaryName,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [amount, setAmount] = useState<number>(25);

//   // Use the donation store
//   const {
//     currentDonation,
//     isProcessing,
//     error,
//     startDonation,
//     completeDonation,
//     failDonation,
//     clearCurrentDonation,
//     resetError,
//   } = useDonationStore();

//   // GraphQL mutation hook
//   const [createCryptoDonation, { loading: donationLoading }] = useMutation(
//     CREATE_CRYPTO_DONATION
//   );

//   // Reset states when dialog opens
//   const handleOpen = () => {
//     setOpen(true);
//     resetError();
//   };

//   // Clean up when dialog closes
//   const handleClose = () => {
//     setOpen(false);
//     // Allow some time for animations to finish before clearing state
//     setTimeout(() => {
//       clearCurrentDonation();
//       resetError();
//     }, 300);
//   };

//   // Process donation after Solana payment is completed
//   const handleDonationComplete = async (
//     signature: string,
//     lamports: number
//   ) => {
//     try {
//       // Update the Zustand store with transaction details
//       completeDonation(signature, lamports);

//       // Call the GraphQL mutation to record the donation in the backend
//       const result = await createCryptoDonation({
//         variables: {
//           beneficiaryId,
//           amountInLamports: lamports,
//           tokenCode: "SOL",
//         },
//       });

//       // Auto-close after success (optional)
//       setTimeout(() => {
//         handleClose();
//       }, 3000);

//       return result.data.createCryptoDonation;
//     } catch (error) {
//       const errorMsg =
//         error instanceof Error ? error.message : "Unknown error occurred";
//       failDonation(errorMsg);
//       return null;
//     }
//   };

//   // Initialize donation in Zustand when "Pay with Wallet" is clicked
//   const handleInitiateDonation = () => {
//     startDonation(beneficiaryId, amount);
//   };

//   // Check for donation success
//   const isDonationSuccessful = currentDonation?.status === "completed";

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<FavoriteIcon />}
//         onClick={handleOpen}
//         sx={{
//           borderRadius: 2,
//           py: 1,
//           fontWeight: "bold",
//         }}
//       >
//         Donate
//       </Button>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Donate to {beneficiaryName}</DialogTitle>
//         <DialogContent>
//           {isDonationSuccessful ? (
//             <Alert severity="success" sx={{ my: 2 }}>
//               Thank you for your donation of ${amount}! Your transaction has
//               been successfully recorded.
//               <Typography variant="caption" display="block" mt={1}>
//                 Transaction signature: {currentDonation.signature.slice(0, 8)}
//                 ...
//               </Typography>
//             </Alert>
//           ) : (
//             <Box sx={{ py: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Donation Amount (USD)"
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">$</InputAdornment>
//                   ),
//                 }}
//                 inputProps={{ min: 1, step: 0.01 }}
//                 sx={{ mb: 3 }}
//                 disabled={isProcessing}
//               />

//               <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
//                 Your donation will help support {beneficiaryName} directly.
//               </Typography>

//               <WalletProvider>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                   <WalletConnectButton />
//                   <SolanaPayButton
//                     amount={amount}
//                     onDonationComplete={handleDonationComplete}
//                     onInitiateDonation={handleInitiateDonation}
//                   />
//                 </Box>
//               </WalletProvider>

//               {isProcessing && donationLoading && (
//                 <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//                   <CircularProgress />
//                 </Box>
//               )}

//               {error && (
//                 <Alert severity="error" sx={{ mt: 2 }}>
//                   {error}
//                 </Alert>
//               )}
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             {isDonationSuccessful ? "Close" : "Cancel"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default DonateButton;
