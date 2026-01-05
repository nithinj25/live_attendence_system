import { WebSocketServer } from "ws"
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { activeSession } from "../routes/attendance.routes";
import { env } from "node:process";

export function setupWS(wss: WebSocketServer){
    wss.on("connection", (ws, req) => {
        const token = new URL(req.url!, "http://x").searchParams.get("token");
        if( !token) return ws.close();

        const user: any = jwt.verify(token , ENV.JWT_SECRET);

        ws.on("message", async() => {
            if(!activeSession) return ;
            activeSession.attendance[user.userId] = "present";
        });
    });
}