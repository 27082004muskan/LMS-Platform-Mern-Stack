import express from "express";
import { googleAuth, login ,logOut,resetPassword,sendOTP,signUp, verifyOTP } from "../controller/authController.js";


const authRouter=express.Router();

authRouter.post('/signup',signUp)
authRouter.post('/login',login);
authRouter.get('/logout',logOut);
authRouter.post("/sendOTP",sendOTP);
authRouter.post("/verifyOTP",verifyOTP);
authRouter.post("/resetpassword",resetPassword);
authRouter.post("/googleauth",googleAuth);


export default authRouter;