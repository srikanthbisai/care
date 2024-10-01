import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const Register = async(req, res) => {
    const {username, email, password} = req.body;
    try {
        const finduser = await User.findOne({email});
        if(finduser) {
          res.status(401).json({message:"User akready exits"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
          username, 
          email,
          password:hashedPassword
        });

        res.status(201).json({
          message: "User registered successfully."
      });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:"Failed creating User"})
    }
}


export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const timer = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

    const token = jwt.sign(
      {
        user: user._id,
        isAdmin: false, // Adjust this as necessary
      },
      process.env.JWT_KEY,
      { expiresIn: timer }
    );

    const { password: _, ...userInfo } = user._doc;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: timer,
    }).status(200).json(userInfo);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Failed to login!" });
  }
};



export const GuestLogin = async (req, res) => {
  try {
    // Guest user payload
    const guestUserPayload = {
      user: "guest",  // You can keep it simple without any role
    };

    const tokenExpiry = 1000 * 60 * 60 * 24; // 1 day expiry for guest token

    // Generate a token for the guest user
    const token = jwt.sign(guestUserPayload, process.env.JWT_KEY, { expiresIn: tokenExpiry });

    // Return the token in a cookie, similar to regular login
    res.cookie("guest", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "none",
      maxAge: tokenExpiry,
    }).status(200).json({ message: "Logged in as guest", user: "guest" });

  } catch (error) {
    console.error("Guest login error:", error);
    return res.status(500).json({ message: "Failed to login as guest" });
  }
};


export const Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none",
  })
  .status(200)
  .json({message: "Logged out successfully"});
}
