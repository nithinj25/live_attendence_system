import { Request, Response, NextFunction } from "express";
import { Class } from "../models/Class";

export async function ownsClass(req: Request, res: Response, next: NextFunction){
    const classId = req.params.id || req.body.classId;
    const cls = await Class.findById(classId);

    if(!cls){
        return res.status(404).json({
            success: false,
            error: "Class not found"
        });
    }

    if(cls.teacherId?.toString() !== req.user!.userId){
        return res.status(403).json({
            success: false, 
            error: "forbidden, not class teacher"
        });
    }
    (req as any).class = cls;
    next();
}