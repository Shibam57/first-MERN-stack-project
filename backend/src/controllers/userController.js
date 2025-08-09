const ApiError=require('../utils/ApiError')
const { ApiResponse }= require('../utils/ApiResponse')
const User=require('../models/userModel')
const uploadOnCloudinary = require('../utils/cloudinary')
const path = require("path");
const asyncHandler = require('../utils/asyncHandler');


const generateAccessAndRefereshTokens=async(userId)=>{
    try {
        
        const user=await User.findById(userId)

        if(!user){
            throw new ApiError(404, "User not found")
        }

        console.log("User found: ",user.email)

        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefereshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating tokens")
    }
}

const registerUser= asyncHandler(async(req, res)=>{

    console.log("REQ.BODY =>", req.body);
    console.log("REQ.FILES =>", req.files);
    
    const {fullName, email, username, password}=req.body;

    if([fullName, email, username, password].some((field)=> field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email already exists")
    }

    const avatarLocalPath=path.resolve(req.files?.avatar?.[0]?.path)

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user=await User.create({
        username,
        fullName,
        email,
        password,
        avatar: avatar.url
    })

    const createdUser= await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
)})

const loginUser=asyncHandler(async(req, res)=>{
    
    console.log("Body:", req.body);

    const {email, password} = req.body

    if(!email){
        throw new ApiError(400, "email is required")
    }

    const user= await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPassword=await user.isPasswordCorrect(password)

    if(!isPassword){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser=await User.findById(user?._id).select("-password -refreshToken");

    const options={
        httpOnly: true,
        secure: true
    }

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken
    }, "User logged in successfully"))

})

const logoutUser=asyncHandler(async(req, res)=>{
    if (!req.user?._id) {
        return res.status(400).json({ message: "No user is currently logged in." });
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const option={
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }

    return res.status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged out"))
})

module.exports={
    registerUser,
    loginUser,
    logoutUser
}