import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";


// Create User
const createUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, doctorName, clinicName, location, noOfPatient, revenue } = req.body;

  const fields = [userName, email, fullName, doctorName, clinicName, location, noOfPatient, revenue];

  // Check if any required field is either an empty string or undefined or null
  if (fields.some(field => typeof field === 'string' && field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }]
  });

  if (existedUser) throw new ApiError(409, "User already exists");

  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    fullName,
    doctorName,
    clinicName,
    location,
    noOfPatient,
    revenue
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) throw new ApiError(500, "Registering user failed");

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully!"));
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully!"));
});


// Update User
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { userName, email, fullName, doctorName, clinicName, location, noOfPatient, revenue } = req.body;
  
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if ([userName, email, fullName, doctorName, clinicName, location, noOfPatient, revenue].some(field => field && field.trim() === "")) {
    throw new ApiError(400, "Fields cannot be empty");
  }

  if (userName) user.userName = userName.toLowerCase();
  if (email) user.email = email;
  if (fullName) user.fullName = fullName;
  if (doctorName) user.doctorName = doctorName;
  if (clinicName) user.clinicName = clinicName;
  if (location) user.location = location;
  if (noOfPatient) user.noOfPatient = noOfPatient;
  if (revenue) user.revenue = revenue;

  const updatedUser = await user.save();

  return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully!"));
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  await user.deleteOne();

  return res.status(200).json(new ApiResponse(200, null, "User deleted successfully!"));
});


export {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
}