import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export function auth(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            success: false,
            error: "unauthorized, token missing or invalid"
        });
    }
    try{
        req.user = jwt.verify(token, ENV.JWT_SECRET) as any;
        next();
    } catch{
        return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invalid"
        });
    }
}