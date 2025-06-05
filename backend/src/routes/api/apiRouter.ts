import { Router } from "express";
import * as userController from "./userController";
import * as charityController from "./charityController";
import * as donationController from "./donationController";
import { isAdmin, isAuth, injectUser } from "./authMiddleware";
import { serializationMiddleware } from "./serializationMiddleware";

const router = Router();
router.use(serializationMiddleware);
router.use(injectUser);

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
router.post("/beneficiaries/:charityId", isAdmin, charityController.createBeneficiary);

// Donation routes
router.post("/donations/crypto", donationController.createCryptoDonation);
router.get("/donations/:donationId", isAuth, donationController.getDonationById);
router.get("/donations", isAuth, donationController.getDonations);
router.post("/donations/:donationId/crypto-completed", donationController.cryptoPaymentCompleted);

export default router;