// config/cloudinary.js - REPLACE EXISTING CONTENT
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "user-profiles", // Optional: organize uploads
    });

    // Delete local file after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // RETURN OBJECT INSTEAD OF JUST URL
    return {
      url: uploadResult.url,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
