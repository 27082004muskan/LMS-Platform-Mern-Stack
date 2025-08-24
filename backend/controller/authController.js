import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

// --------------FOR SIGNUP CONTROLLER-----------------

export const signUp = async (req, res) => {
  try {
    //request body to get user data
    const { name, email, password, role } = req.body;

    //check if user already exist for that we find user by email
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //validate user's email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter Invalid email",
      });
    }

    // password should be strong
    if (password.length < 8) {
      return res.status(400).json({
        message: "Enter strong password",
      });
    }

    // hash the password before saving to db
    let hashPassword = await bcrypt.hash(password, 10);

    //creating User
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    //token generation
    let token = genToken(user._id);
    console.log("Generated Token:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production (with HTTPS)
      sameSite: "lax", // "strict" can sometimes block cookies across navigations
      path: "/", // important so cookie is available everywhere
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // respond with user data except password
    const { password: _, ...userData } = user._doc;
    return res.status(201).json(userData);

  } catch (error) {
    return res.status(500).json({
      message: `SignUp Error ${error.message}`,
    });
  }
};

// --------------FOR LOGIN CONTROLLER-----------------

export const login = async (req, res) => {
  try {
    // request body to get user data
    const { email, password } = req.body;

    //check if user already exist for that we find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    // compare password
    let isMatch = await bcrypt.compare(password, user.password);

    // if password do not match
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    //token generation
    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax", // using lax for better navigation
      path: "/", // cookie accessible globally
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // respond with user data except password
    const { password: _, ...userData } = user._doc;
    return res.status(200).json(userData);

  } catch (error) {
    return res.status(500).json({
      message: `Login Error ${error.message}`,
    });
  }
};

// --------------FOR LOG OUT CONTROLLER-----------------

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/", // make sure we clear the cookie from root path
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: `LogOut Error ${error.message}`,
    });
  }
};
