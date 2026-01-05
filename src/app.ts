import express from "express";
import authRoutes from "./routes/auth.routes";
import classRoutes from "./routes/class.routes";
import { attendanceRoutes } from "./routes/attendance.routes";

export const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/class", classRoutes);
app.use("/attendance", attendanceRoutes);

