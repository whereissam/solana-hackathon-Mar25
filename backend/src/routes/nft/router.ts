import donationService from "../../service/donationService";
import { Router } from "express";
import {getImageBaseUrl} from "../../service/spacesService";

const router = Router();

router.get("/:donationId", async (req, res) => {
    const donationId = req.params.donationId;
    const donation = await donationService.getDonationById(donationId);
    const imageUrl = `${getImageBaseUrl()}beneficiary/${donation.recipient_id}.png`;
    res.header('Content-Type', 'application/json')
    res.send({
        name: "UG Receipt",
        description: `Receipt for donation to`,
        image: imageUrl,
        external_url: "https://unifygiving.com",
        properties: {
            files: [
                {
                    uri: imageUrl,
                    type: "image/png"
                }
            ],
            category: "image"
        }
    })
})

export default router;