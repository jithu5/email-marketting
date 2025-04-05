import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

export const signUp = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const user = await User.create({ name, email, password });

    const token = await user.generateAuthToken();

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(201)
      .json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const signIn = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "email not found or password incorrect");
    }

    const isPasswordMatch = user.comparePassword(password);

    if (!isPasswordMatch) {
      throw new ApiError(401, "User not found or password incorrect");
    }
    const token = await user.generateAuthToken();

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const signOut = AsyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const currentUser = AsyncHandler(async (req, res) => {
  if (!req.user) {
    return new ApiError(401, "User not authenticated");
  }
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    console.log(user);
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});
