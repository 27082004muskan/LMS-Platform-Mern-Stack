import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"  // public folder ko khaali karane ke liye

//filepath - public folder ka hoga(any imag and video)
//storing into cloudin ary
const uploadOnCloudinary= async(filePath)=>{
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

try {
    if(!filePath){
        return null;
    }
    const uploadResult=await cloudinary.uploader.upload(filePath,{resource_type:'auto'}) //img,video (auto)
fs.unlikeSync(filePath)  //public folder ko khaali
    return uploadResult.secure_url
} catch (error) {
    fs.unlikeSync(filePath)
    console.log(error)
    
}
}
export default uploadOnCloudinary; 
