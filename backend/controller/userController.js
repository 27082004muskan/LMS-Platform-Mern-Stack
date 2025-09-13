import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: `Get Current User Error: ${error}`
        });
    }
};


// to update profile - Cloudinary
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;
    let photoUrl;

    // if (req.file) {
    //   // Upload to Cloudinary and save only the URL
    //   const uploaded = await uploadOnCloudinary(req.file.path);
    //   photoUrl = uploaded.url;
    // }
    if (req.file) {
  const uploaded = await uploadOnCloudinary(req.file.path);
  if (!uploaded) {
    return res.status(500).json({ message: "Cloudinary upload failed" });
  }
  photoUrl = uploaded.secure_url || uploaded.url;  // ✅ safer
}


    const user = await User.findByIdAndUpdate(
      userId,
      { name, description, ...(photoUrl && { photoUrl }) }, // update only if new photo
      { new: true, runValidators: true } // return updated doc
    ).select("-password"); // never send password

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
 await user.save()
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `Update Profile Error: ${error.message}`,
    });
  }
};
