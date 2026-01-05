import http from "http";
import { WebSocketServer } from "ws";
import { app } from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import { setupWS } from "./ws/socket";

const startServer = async () => {
    try {
        await connectDB();

        const server = http.createServer(app);

        const wss = new WebSocketServer({
            server,
            path: "/ws",
        });

        setupWS(wss);

        server.listen(ENV.PORT, () => {
            console.log(`Server is running on the port ${ENV.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

void startServer();