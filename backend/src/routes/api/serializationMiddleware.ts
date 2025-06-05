import { Request, Response, NextFunction } from 'express';

// Middleware to serialize BigInt values in JSON responses
export function serializationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const oldJson = res.json;
    res.json = function (data: any) {
        const replacer = (_key: string, value: any) =>
            typeof value === 'bigint' ? value.toString() : value;
        return oldJson.call(this, JSON.parse(JSON.stringify(data, replacer)));
    };
    next();
}