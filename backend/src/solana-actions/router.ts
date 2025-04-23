import { Router } from "express"
import { ActionType, ActionGetResponse, LinkedAction, ActionPostResponse } from "@solana/actions"
import { SystemProgram, Transaction } from "@solana/web3.js";

const router = Router()

router.get('/', async (req, res) => {
    const action : ActionGetResponse = {
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
    }
    res.json(action).status(200)
});

router.post('/donate', async (req, res) => {
    console.log("Received donation request", req.body)
    const transaction = new Transaction()
    const sendSolanaTransaction = SystemProgram.transfer({
        fromPubkey: req.body.account,
        toPubkey: req.body.account,
        lamports: req.body.amount * 1000000000,
    })
    transaction.add(sendSolanaTransaction)
    
    const postResponse: ActionPostResponse = {
        type: "transaction",
        transaction: transaction.serialize().toString('base64'),
        message: "Donation Successful",
    }
    console.log("Post response", postResponse)
    return res.json(postResponse).status(200);
});

export default router