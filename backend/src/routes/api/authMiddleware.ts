import { Request, Response, NextFunction } from 'express';
import {verifyJWT} from '../../service/auth';

export function isAuth(req: Request, res: Response, next: NextFunction) {
    if ((req as any).user) return next();
    return res.status(401).json({ error: 'Unauthorized' });
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user && (user.role === 'admin' || user.isAdmin === true)) {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
}

export function injectUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token

  if (token) {
    try {
      const decoded = verifyJWT(token as string);
      (req as any).user = decoded;
    } catch (err) {
        console.error("JWT verification failed:", err);
      (req as any).user = null;
    }
  } else {
    (req as any).user = null;
  }
  next();
}