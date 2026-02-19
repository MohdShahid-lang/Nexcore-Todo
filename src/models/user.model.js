import mongoose, { model, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    todos: [
        {
            type: Types.ObjectId,
            ref : "Todo"

        }
    ]
}, { timestamps: true });

export const User = model("User", UserSchema);