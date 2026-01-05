import { Schema, model } from "mongoose";

const AttendanceSchema = new Schema({
    classId: Schema.Types.ObjectId,
    studentId: Schema.Types.ObjectId,
    status: { type :String, enum: ["present", "absent"]}
});

export const Attendance = model("Attendance", AttendanceSchema);
