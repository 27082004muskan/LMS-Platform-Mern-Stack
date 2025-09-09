
import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser,updateProfile } from "../controller/userController.js";
import upload from "../middleware/multer.js"

const userRouter=express.Router();
userRouter.get("/getcurrentUser",isAuth , getCurrentUser)
//cloudinary route 
//isAuth - userId , upload -photoUrl will be saved in public folder
userRouter.post("/profile",isAuth,upload.single("photoUrl"),updateProfile)


export default userRouter;