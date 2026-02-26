import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/users.models";
import { asyncHandler } from "../utils/asyncHandler";

// why we use asyncHandler with async functions is that if we throw an error in async function it will not be caught by the default error handler of express and it will crash the server, so we use asyncHandler to catch the error and pass it to the next middleware which is the error handler middleware and it will handle the error and send the response to the client without crashing the server.

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, name } = req.body
  if ((!email, !username, !password, !name).some({ field }) = field?.trim() === "") {
    throw new ApiError(400, "All Fields are required")
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if (existedUser) {
    throw new ApiError(400, "User with this email or username already exists")
  }

  const user = User.create({
    name,
    username: username.toLowercase(),
    email: email.toLowercase(),
    password,
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(400, "User was unable to register")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
})

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if(!email && !password) {
    throw new ApiError(400, "Email and password are required")
  }

  const user = await User.findOne({
    $or: [{username},{email}]
  })

  if (!user) {
    throw new ApiError(400, "Invalid credentials")
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200, user, "User logged in successfully")
  )
})

const logOutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    await req.user._id, 
    {
      $unset: {refreshToken: undefined},
    },
    {
    new: true,
    }
  )

  // options is used to set the cookie options like httpOnly, secure, sameSite etc. httpOnly is used to prevent the client from accessing the cookie and secure is used to send the cookie only over https. sameSite is used to prevent CSRF attacks by sending the cookie only to the same site.
  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("refreshToken", options)
  .clearCookie("accessToken", options)
  .json(
    new ApiResponse(200, {}, "User logged out successfully")
  )
})

const getUser = asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(
    new ApiResponse(200, req.user, "User fetched successfully")
  )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {name, email} = req.body

  if(!name || !email) {
    throw new ApiError(400, "Name and email are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email: email.toLowercase()
    },{
      new: true
    }.select(
      "-password"
    )
  )

    return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User details updated successfully")
    )
})

export {
  logInUser,
  registerUser,
  logOutUser,
  getUser,
  updateAccountDetails,
}