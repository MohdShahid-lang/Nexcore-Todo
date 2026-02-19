import mongoose, { model } from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "pending", "inprogress"],
        default: "pending",
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true });

export const todoModel = model("Todo", todoSchema);