import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegistration extends Document {
    name: string;
    email: string;
    phone: string;
    college: string;
    course: string;
    year: string;
    event: string;
    createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        college: {
            type: String,
            required: true,
            trim: true,
        },

        course: {
            type: String,
            required: true,
            trim: true,
        },

        year: {
            type: String,
            required: true,
        },

        event: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Registration: Model<IRegistration> =
    mongoose.models.Registration ||
    mongoose.model<IRegistration>("Registration", RegistrationSchema);

export default Registration;