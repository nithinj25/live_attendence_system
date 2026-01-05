import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "../models/User";
import { signToken } from "../untils/jwt";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/signup", async (req, res) => {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(["teacher", "student"])
    });

    const parsed = schema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({ success: false, error: "Invalid request schema"});
    }

    const exists = await User.findOne({ email: parsed.data.email});
    if(exists){
        return res.status(400).json({ success: false, error: "email already exists"});
    }

    const hashed = await bcrypt.hash(parsed.data.password, 10);
    const user = await User.create({ ...parsed.data, password: hashed });

    res.status(201).json({
        success: true,
        data: {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email});

    if(!user || !(await bcrypt.compare(req.body.password, user.password as string))){
        return res.status(400).json({
            success: false,
            error: "Invalid email or password"
        });
    }

    res.json({
        success: true,
        data:{
            token: signToken({ userId: user.id as string, role: user.role as string})
        }
    });
});

router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user!.userId).select("-password");
    res.json({ success: true, data: user});
});

export default router;


