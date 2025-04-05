import express from "express";
import { currentUser, signIn, signOut, signUp } from "../controllers/user-controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


const userRouter = express.Router();

// Create new user
userRouter.post("/register",signUp)
// Login user
userRouter.post("/login", signIn);
// Logout user
userRouter.post("/logout",signOut);
// Get user profile
userRouter.get("/profile",AuthMiddleware,currentUser)


export default userRouter;