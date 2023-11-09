import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            lowercase: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        deliveryAddress: {
            type: Array,
            default: [],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models['users'] || mongoose.model('users', userSchema);
