import User from "../model/userModel";
import validator from "validator";
import bcrypt from "bcrypt.js";




export const signUp = async(re, res)=>{
try{
    const{name , email, password, role}=req.body;
    let existUser=await User.findOne({email
    })
    if (existUser){
        return res.status(400).json({
            message:"User already exist"
        })
    }
if(!validator.isEmail(email)){
    return res.status(400).json({
        message:"Enter Invalid email"
    })
}
if(password.length<8){
    return res.status(400).json({
        message:"PEnter strong password"
    })
}

let hashPassword=await bcrypt.hash(password,10)

}catch(error){

}


}