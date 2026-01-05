import { Router } from "express";
import { auth } from "../middlewares/auth";
import { teacherOnly } from "../middlewares/teacherOnly";
import { ownsClass } from "../middlewares/ownsClass";
import { Class } from "../models/Class";
import { User } from "../models/User";

const router = Router();

router.post("/", auth, teacherOnly, async(req, res) => {
    const cls = await Class.create({
        className: req.body.className,
        teacherId: req.user!.userId,
        studentId: []
    });

    res.status(201).json({ success: true, data: cls });
});

router.post("/:id/add-student", auth, teacherOnly, ownsClass, async(req, res) => {
    const cls = (req as any).class;
    cls.studentId.push(req.body.studentId);
    await cls.save();

    res.json({ success: true, data: cls });
});

router.get("/:id", auth, async(req, res) => {
    const cls = await Class.findById(req.params.id).populate("studentId", "name email");

    res.json({
        success: true, 
        data: {
            _id: cls!.id,
            className: cls!.className,
            teacherId: cls!.teacherId,
            students: cls!.studentId,
        }
    });
});

router.get("/students/all", auth, teacherOnly, async(_req, res) => {
    const students = await User.find({ role: "student"}).select("name email");
    res.json({ success: true, data: students});
});

export default router;


