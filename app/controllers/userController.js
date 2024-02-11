import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/userModels.js";

const JWT_SECRET = "568970";

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  const existingUser = await UserModel.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const defaultRoleId = 1;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      email,
      password: hashedPassword,
      name,
      roleId: defaultRoleId,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Save token to database
    await UserModel.updateUserToken(user.id, token);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
