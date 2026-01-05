import { Schema, model } from "mongoose";

const ClassSchema = new Schema({
    className: String,
    teacherId: { type: Schema.Types.ObjectId, ref: "User"},
    studentId: [{ type: Schema.Types.ObjectId, ref: "User"}]
});

export const Class = model("Class", ClassSchema);
