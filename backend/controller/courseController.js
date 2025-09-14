import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"

// courses ko create karana hai 
export const createCourse=async(req , res)=>{
    try {
        const {title, category }=req.body
        if(!title || !category){
            return res.status(400).json({message:"title or category is required"})
        }
        const course = await Course.create({
            title , 
            category,
            creator:req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({
      message: `Create Course Error: ${error.message}`
        })
    }
}

// Controller that or course is published or not

export const getPublishedCourse= async(req , res)=>{
    try {
       //finding course
       const courses = await Course.find({isPublished:true}) 
          if(!courses){
            return res.status(400).json({message:"Courses not found"})
        }
         return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({
      message: `Failed to find isPublished Courses ${error.message}`
    })
}
}

// creator ke courses ko get 
export const getCreatorCourse= async(req , res)=>{
    try {
        const userId = req.userId
        const courses=await Course.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
         return res.status(500).json({
      message: `Failed to get Creator Courses ${error.message}`
    })
    }
}

// edit courses

export const editCourse= async(req, res)=>{
    try {
        const {courseId}=req.params
        const {title , subTitle,description,category,level , isPublished,price }=req.body
          // for thumbnail checking on cloudinary
        let thumbnail
        if(req.file){
            thumbnail= await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course not found"})
        
    }
    const updateData = {title , subTitle,description,category,level , isPublished,price,thumbnail}

    course = await Course.findByIdAndUpdate(courseId , updateData,{new:true})

    return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({
      message: `Failed to edit Creator Course ${error}`
    })
    }
}

export const getCourseById = async(req,res)=>{
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        
    }
     return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({
      message: `Failed to get Course by Id ${error}`
    })
    }
}

export const removeCourse=async(req, res)=>{
    try {
        const {courseId}=req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        
    }
    course = await Course.findByIdAndDelete(courseId , {new:true})
     return res.status(200).json({message:"Course removed"})

    } catch (error) {
       return res.status(500).json({
      message: `Failed to delete Course by Id ${error}`
    }) 
    }
}
