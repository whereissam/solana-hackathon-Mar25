import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    return res.status(200).json({
        name: "Free-UGs",
        symbol: "FUG",
        description: "Free-UGs for Donor to redeem prizes from donating to charities, through Unify Giving",
        image: "https://ug-hackathon.lon1.digitaloceanspaces.com/FUG.png",
    });
});

export default router;