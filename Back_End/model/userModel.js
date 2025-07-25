import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: 6,
    },
    role: {
        type: String,
        enum: ["Mentor", "Mentee"],
        default: "Mentee",
    },
    totalScore: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;