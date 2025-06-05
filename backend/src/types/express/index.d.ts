// filepath: backend/src/types/express/index.d.ts
import 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      user?: User;
    }
  }
}