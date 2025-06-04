import { Router } from "express";
import * as userController from "./userController";
import * as charityController from "./charityController";
import { isAdmin, isAuth } from "./authMiddleware";

const router = Router();

router.get("/", async (req, res) => {
    return res.status(200).json({
        message: "Welcome to the API",
    })
});

// User routes
router.post("/user/login", userController.login);
router.post("/user/login/wallet", userController.loginWithWallet);
router.post("/user/wallet-user", userController.createWalletUser);
router.get("/user/wallet-user/:walletAddress/id", userController.getWalletUserIdOrCreate);

// Charity routes
router.get("/charities", charityController.getCharities);
router.get("/charities/:id", charityController.getCharityById);
router.post("/charities", isAdmin, charityController.createCharity);
router.get("/beneficiaries/:charityId", charityController.getBeneficiaries);
router.get("/beneficiary/:beneficiaryId", charityController.getBeneficiaryById);
router.post("/beneficiaries/:charityId", charityController.createBeneficiary);

export default router;