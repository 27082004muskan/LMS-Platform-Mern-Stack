import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
description:{
type:String,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    },
role:{
    type:String,
    enum:["student","educator", "Student", "Educator"],
    required:true,
},
photoUrl:{
    type:String, 
    default:""
},
enrolledCourses:[
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Course"
    }
]


},{timestamps:true})

//creating user model by taking model "userSchema"
const User=mongoose.model("User",userSchema)
export default User;
