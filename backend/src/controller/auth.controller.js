import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: !name
          ? "Name is required"
          : !username
          ? "Username is required"
          : !email
          ? "Email is required"
          : "Password is required",
      });
    }
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });
    if (checkUser || checkEmail) {
      return res.status(httpStatus.CONFLICT).json({
        message: checkUser
          ? "Username already exist. Please use another."
          : "Email already exist. Please use another",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const saveUser = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    console.log(saveUser);
    return res
      .status(httpStatus.CREATED)
      .json({ message: "Successfully register to the account." });
  } catch (err) {
    console.log(err);
    console.log("Error in the register");
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error in the register." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid username or password",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Username doesn't exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Wrong password please use another password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res
      .status(httpStatus.OK)
      .json({ token, message: "Successfully login to the account." });
  } catch (err) {
    console.log("Error in the login");
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error in the login." });
  }
};
