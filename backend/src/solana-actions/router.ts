import { Router } from "express"
import { ActionType, ActionGetResponse, LinkedAction, ActionPostResponse } from "@solana/actions"

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
                    label: "Donate in USD",
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
    const postResponse: ActionPostResponse = {
        type: "transaction",
        transaction: "4pjka9zGtydSkoJ2w6gtZkFHRjZrg35e5WVoLBdVeaqpM1iRuSEi8VoXjQPQXJT7fTVgdThwVrL7VzH7s6RuaPrj",
        message: "Donation Successful",
    }
    return res.json(postResponse).status(200);
});

export default router