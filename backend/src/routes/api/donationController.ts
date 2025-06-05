import { Request, Response } from 'express';
import donationService from '../../service/donationService';

// POST /donations/crypto
export async function createCryptoDonation(req: Request, res: Response) {
  try {
    const { beneficiaryId, amountInLamports, tokenCode } = req.body;
    const donation = await donationService.createCryptoDonation(
      Number(req.user?.id),
      Number(beneficiaryId),
      Number(amountInLamports),
      tokenCode
    );
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err || 'Failed to create crypto donation' });
  }
}

// GET /donations/:donationId
export async function getDonationById(req: Request, res: Response) {
  try {
    const { donationId } = req.params;
    const donation = await donationService.getDonationById(donationId);
    res.json(donation);
  } catch (err) {
    res.status(404).json({ error: err || 'Donation not found' });
  }
}

// GET /donations
export async function getDonations(req: Request, res: Response) {
  try {
    const { completed } = req.query;
    const donations = await donationService.getDonations(
        Number(req.user?.id),
        completed === 'true'
    );
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err || 'Failed to get donations' });
  }
}

// POST /donations/:donationId/crypto-completed
export async function cryptoPaymentCompleted(req: Request, res: Response) {
  try {
    const { donationId } = req.params;
    const { txHash } = req.body;
    const result = await donationService.cryptoPaymentCompleted(donationId, txHash);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err || 'Failed to complete crypto payment' });
  }
}