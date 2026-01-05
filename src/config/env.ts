import dotenv from "dotenv";
import path from "path";

// Load env from the config folder so dev runs find the file reliably
dotenv.config({ path: path.resolve(__dirname, ".env") });

export const ENV = {
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
};



