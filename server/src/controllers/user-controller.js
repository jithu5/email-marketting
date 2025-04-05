import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";

import { generateToken } from "../utils/GenerateToken.js";

export const signUp = AsyncHandler(async (req, res) => {
    const {name, email, password } = req.body;

    if(!email || !password || !name) {
        return next(new ApiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ApiError(400, "User already exists"));
    }

    const user = await User.create({ name, email, password });
});