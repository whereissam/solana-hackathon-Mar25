import { Router } from "express";
import { ActionType, ActionGetResponse, LinkedAction, ActionPostResponse, createPostResponse, createActionHeaders } from "@solana/actions";
import { SystemProgram, Transaction, Connection, PublicKey, TransactionMessage } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";
import { getImageBaseUrl } from "../../service/spacesService";
import charityService from "../../service/charityService";
import donationService from "../../service/donationService";
import userService from "../../service/userService";
import { create } from "domain";


const router = Router();
const headers = createActionHeaders();

router.get('/:beneficiaryId', async (req, res) => {
    try {
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
        return res.header(headers).status(200).json(action);
    } catch (error) {
        res.status(400).json({ error: "Beneficiary not found" });
    }
});

router.options('/*', (req, res) => {
    return res.header(headers).json(null);
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

        const walletAddress = req.body.account;
        const donorId = await userService.getWalletUserIdOrCreate(walletAddress);

        const donation = await donationService.createCryptoDonation(donorId, beneficiaryId, amountInLamports, currency);


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
            Amount: req.body.data.amount,
            Currency: donation.currency,
            Version: "1.0"
        }))

        const conn = new Connection("https://api.devnet.solana.com", "confirmed");
        const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();

        // Create a transaction
        const transaction = new Transaction({
            feePayer: fromPubkey,
            blockhash,
            lastValidBlockHeight
        }).add(transferInstruction).add(memoInstruction);

        const payload = await createPostResponse({
            fields: {
                type: "transaction",
                transaction,
                message: "Transaction created. Please sign and complete donation",
                links: {
                    next: {
                        type: "post",
                        href: `${process.env.ACTIONS_URL_PREFIX}donateCompleted/${donation.id}`
                    }
                }
            },
        });
        return res.header(headers).status(200).json(payload);
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ error: "Failed to create transaction" });
    }
});

router.post('/donateCompleted/:donationId', async (req, res) => {
    const { signature, account } = req.body;
    const donationId = req.params.donationId;
    return res.status(200).json(await donationService.cryptoPaymentCompleted(donationId, signature));
});

export default router;