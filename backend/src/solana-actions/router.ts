import { Router } from "express"
import { ActionType, ActionGetResponse, LinkedAction } from "@solana/actions"

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
                        min: 1,
                        pattern: "^[0-9]+$",
                    }],
                    type: "transaction",
                }
            ]
        }
    }
    res.json(action).status(200)
});

export default router