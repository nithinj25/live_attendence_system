import { Router } from "express";
import { auth } from "../middlewares/auth";
import { teacherOnly } from "../middlewares/teacherOnly";
import { ownsClass } from "../middlewares/ownsClass";

let activeSession: any = null;

const router = Router();

router.post("/start", auth, teacherOnly, ownsClass, (req, res) => {
    activeSession = {
        classId: req.body.classId,
        startedAt: new Date().toISOString(),
        Attendance: {}
    };
    res.json({ success: true, data: activeSession });
})

export { router as attendanceRoutes, activeSession};
