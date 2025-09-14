import express from "express"
import { createCourse, editCourse, getCourseById, getCreatorCourse, getPublishedCourse, removeCourse } from "../controller/courseController.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"


const courseRouter = express.Router()

courseRouter.post("/create",isAuth, createCourse)
courseRouter.get("/getpublished",getPublishedCourse)
courseRouter.get("/getcreator",isAuth ,getCreatorCourse)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)

courseRouter.get("/getcoursebyid/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)

export default courseRouter


