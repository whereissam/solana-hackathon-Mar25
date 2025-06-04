import { Request, Response } from 'express';
import userService from '../../service/userService';

// POST /login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err || 'Login failed' });
  }
}

// POST /login/wallet
export async function loginWithWallet(req: Request, res: Response) {
  try {
    const { walletAddress } = req.body;
    const result = await userService.loginWithWallet(walletAddress);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err || 'Login with wallet failed' });
  }
}

// POST /wallet-user
export async function createWalletUser(req: Request, res: Response) {
  try {
    const { walletAddress } = req.body;
    const user = await userService.createWalletUser(walletAddress);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err || 'Create wallet user failed' });
  }
}

// GET /wallet-user/:walletAddress/id
export async function getWalletUserIdOrCreate(req: Request, res: Response) {
  try {
    const { walletAddress } = req.params;
    const userId = await userService.getWalletUserIdOrCreate(walletAddress);
    res.json({ userId });
  } catch (err) {
    res.status(400).json({ error: err || 'Get or create wallet user failed' });
  }
}

