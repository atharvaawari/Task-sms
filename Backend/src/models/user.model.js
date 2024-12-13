import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, "Invalid email address"],
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        doctorName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        clinicName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        location: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        noOfPatient: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        revenue: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
    }, { timestamps: true }
)


export const User = mongoose.model("User", userSchema);