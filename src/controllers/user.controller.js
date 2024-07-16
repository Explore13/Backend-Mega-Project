import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "Hare Krishna",
  // });
  // get user details from frontend
  // validation - not empty
  // check if user already exists or not - email and username check
  // check for images, check for avatar
  // upload to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token from response
  // check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("\nBody data : ", req.body); 

  // empty field validation

  // if(fullName === "")
  //   throw new ApiError(400, "fullName is required")

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // existing user checking
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser)
    throw new ApiError(409, "User with email or username already exists");

  // storing the path from multer
  console.log("\nFiles Data : ", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;

  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // We faced error if do not send any cover image
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  // checking if avatar is send or not by the user
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  // upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar)
    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  // Creating an object and upload on db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // find the user by id that is returned during user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); // "-password -refeshToken" means we will get the full information about the user excluding the password and refreshToken

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  console.log(`User ${createdUser._id} with ${createdUser.fullName} is registered successfully`);
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };