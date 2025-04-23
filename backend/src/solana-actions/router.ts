import { Router } from "express";
import { ActionType, ActionGetResponse, LinkedAction, ActionPostResponse } from "@solana/actions";
import { SystemProgram, Transaction, Connection, PublicKey, TransactionMessage } from "@solana/web3.js";

const router = Router();

router.get('/', async (req, res) => {
    const action: ActionGetResponse = {
        icon: "https://unifygiving.com/wp-content/uploads/2024/04/logo.svg",
        title: "Donate Now",
        description: "Donate to this Recipient",
        label: "Donate",
        links: {
            actions: [
                {
                    href: "https://solana-hackathon-mar25.onrender.com/solana-actions/donate",
                    label: "Donate in SOL",
                    parameters: [{
                        type: "text",
                        name: "amount",
                        required: true,
                        pattern: "^[0-9]+$",
                        patternDescription: "Please enter a number",
                    }],
                    type: "transaction",
                }
            ]
        }
    };
    res.json(action).status(200).header("Access-Control-Allow-Origin", "*");
});

router.options('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Encoding, Accept-Encoding");
});

router.post('/donate', async (req, res) => {
    try {
        console.log("Received donation request", req.body);

        const conn = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const latestBlockhash = await conn.getLatestBlockhash();

        // Parse the amount and convert to lamports
        const amountInLamports = BigInt(Math.floor(parseFloat(req.body.data.amount) * 100)) * BigInt(1e7);;

        // Convert account to PublicKey
        const fromPubkey = new PublicKey(req.body.account); // Fee payer
        const toPubkey = new PublicKey(req.body.account); // Recipient

        // Create a transfer instruction
        const transferInstruction = SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: amountInLamports,
        });

        // Create a transaction
        const transaction = new Transaction({
            feePayer: fromPubkey,
            recentBlockhash: latestBlockhash.blockhash,
        }).add(transferInstruction);

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
        return res.json(postResponse).status(200);
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ error: "Failed to create transaction" });
    }
});

export default router;