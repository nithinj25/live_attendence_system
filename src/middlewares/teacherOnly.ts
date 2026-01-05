import { Request, Response, NextFunction } from "express";

export function teacherOnly(req: Request, res: Response, next: NextFunction){
    if(req.user?.role !== "teacher"){
        return res.status(403).json({
            success: false,
            error: "forbidden, teacher accesss required"
        });
    }
    next();
}
