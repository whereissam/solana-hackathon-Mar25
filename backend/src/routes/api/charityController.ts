import { Request, Response } from 'express';
import charityService from '../../service/charityService';

// GET /charities
export async function getCharities(req: Request, res: Response) {
  try {
    const { offset = 0, limit = 30 } = req.query;
    const charities = await charityService.getCharities({
      skip: Number(offset),
      take: Number(limit),
    });
    res.json(charities);
  } catch (err) {
    res.status(500).json({ error: err || 'Failed to list charities' });
  }
}

// GET /charities/:id
export async function getCharityById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const charity = await charityService.getCharityById(Number(id), {});
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }
    res.json(charity);
  } catch (err) {
    res.status(500).json({ error: err || 'Failed to get charity' });
  }
}

// GET /beneficiaries/:charityId
export async function getBeneficiaries(req: Request, res: Response) {
  try {
    const { charityId } = req.params;
    const { offset = 0, limit = 10 } = req.query;
    const beneficiaries = await charityService.getBeneficiaries(Number(charityId), {
      skip: Number(offset),
      take: Number(limit),
    });
    res.json(beneficiaries);
  } catch (err) {
    res.status(500).json({ error: err || 'Failed to list beneficiaries' });
  }
}

// GET /beneficiary/:beneficiaryId
export async function getBeneficiaryById(req: Request, res: Response) {
  try {
    const { beneficiaryId } = req.params;
    const beneficiary = await charityService.getBeneficiaryById(Number(beneficiaryId));
    res.json(beneficiary);
  } catch (err) {
    res.status(404).json({ error: err || 'Beneficiary not found' });
  }
}

// POST /charities
export async function createCharity(req: Request, res: Response) {
  try {
    const { charityAdmin, ...charityDetail } = req.body;
    const charity = await charityService.createCharity(charityAdmin, charityDetail);
    res.status(201).json(charity);
  } catch (err) {
    res.status(400).json({ error: err || 'Failed to create charity' });
  }
}

// POST /beneficiaries/:charityId
export async function createBeneficiary(req: Request, res: Response) {
  try {
    const { charityId } = req.params;
    const beneficiary = await charityService.createBeneficiary({
      charityId: Number(charityId),
      detail: req.body,
    });
    res.status(201).json(beneficiary);
  } catch (err) {
    res.status(400).json({ error: err || 'Failed to create beneficiary' });
  }
}

