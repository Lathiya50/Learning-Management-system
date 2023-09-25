import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    avtar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
}
const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email address",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avtar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [
        { courseId: String }
    ],
}, {
    timestamps: true,
});

//hash password before saving
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare password

userSchema.methods.comparePassword = async function (enteredPassword: string) : Promise <Boolean> {
        return await bcrypt.compare(enteredPassword,this.password);
}
const userModel: Model<IUser> = mongoose.model('User', userSchema);

export default userModel;