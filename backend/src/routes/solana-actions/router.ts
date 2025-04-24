import { Router } from "express";
import { ActionType, ActionGetResponse, LinkedAction, ActionPostResponse } from "@solana/actions";
import { SystemProgram, Transaction, Connection, PublicKey, TransactionMessage } from "@solana/web3.js";
import {createMemoInstruction} from "@solana/spl-memo";
import { getImageBaseUrl } from "../../service/spacesService";
import charityService from "../../service/charityService";
import donationService from "../../service/donationService";
import userService from "../../service/userService";


const router = Router();

router.get('/:beneficiaryId', async (req, res) => {
    const beneficiaryId = parseInt(req.params.beneficiaryId);
    const beneficiary = await charityService.getBeneficiaryById(beneficiaryId);
    const action: ActionGetResponse = {
        icon: `${getImageBaseUrl()}beneficiary/${beneficiaryId}.png`,
        title: `Donate now!`,
        description: `Donate to ${beneficiary.first_name} ${beneficiary.last_name}`,
        label: "Donate",
        links: {
            actions: [
                {
                    href: `${process.env.ACTIONS_URL_PREFIX}donate/SOL/${beneficiaryId}`,
                    label: "Donate in SOL",
                    parameters: [{
                        type: "text",
                        name: "amount",
                        required: true,
                        pattern: "^\\d*\\.?\\d*$",
                        patternDescription: "Please enter a number",
                    }],
                    type: "transaction",
                }
            ]
        }
    };
    return res.header("Access-Control-Allow-Origin", "*").status(200).json(action);
});

router.options('/', (req, res) => {
    return res.header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Encoding, Accept-Encoding");
});

router.post('/donate/:currency/:beneficiaryId', async (req, res) => {
    try {
        const beneficiaryId = parseInt(req.params.beneficiaryId);
        const currency = req.params.currency;
        console.log("Received donation request", req.body, beneficiaryId, currency);
        if (currency !== "SOL") {
            return res.status(400).json({ error: "Unsupported currency" });
        }
        // Parse the amount and convert to lamports
        const amountInLamports = Math.floor(parseFloat(req.body.data.amount) * 1e9);

        const walletAddress= req.body.account;
        const donorId = await userService.getWalletUserIdOrCreate(walletAddress);

        const donation = await donationService.createCryptoDonation(donorId, beneficiaryId, amountInLamports, currency);

        //const conn = new Connection("https://api.devnet.solana.com", "confirmed");
        //const latestBlockhash = await conn.getLatestBlockhash();

        // Convert account to PublicKey
        const fromPubkey = new PublicKey(req.body.account); // Fee payer
        const toPubkey = new PublicKey(process.env.ACTIONS_WALLET_ADDRESS as string); // Recipient

        // Create a transfer instruction
        const transferInstruction = SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: BigInt(amountInLamports),
        });

        const memoInstruction = createMemoInstruction(JSON.stringify({
            DonationId: donation.id,
            Amount: donation.amount,
            Currency: donation.currency,
            Version: "1.0"
        }))

        // Create a transaction
        const transaction = new Transaction({
            feePayer: fromPubkey,
            recentBlockhash: "" //latestBlockhash.blockhash,
        }).add(transferInstruction).add(memoInstruction);

        // Serialize the transaction without signing
        const serializedTransaction = transaction.serialize({
            requireAllSignatures: false, // Allow unsigned transaction
            verifySignatures: false,
        });

        // Encode the serialized transaction to Base64 for the client
        const transactionBase64 = serializedTransaction.toString('base64');

        const postResponse: ActionPostResponse = {
            type: "transaction",
            transaction: transactionBase64,
            message: "Transaction created. Please sign and complete donation",
        };

        console.log("Post response", postResponse);
        return res.status(200).json(postResponse);
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ error: "Failed to create transaction" });
    }
});

export default router;