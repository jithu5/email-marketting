import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) =>{
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    console.log("User token from cookies ",token);

    if (!token) {
        return new ApiError(401, "Unauthorized");
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return new ApiError(401, "Unauthorized");
        }
        req.user = decoded;
        next();
    });

}