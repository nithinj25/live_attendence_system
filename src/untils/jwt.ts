import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export function signToken(payload: { userId: string, role: string}){
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d"});
}
