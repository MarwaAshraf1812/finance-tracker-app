import * as userService from "../services/user.service.js"
import { createError } from "../utils/error.js";



export const getProfile = async (req,res,next) => {
    const profile = await userService.getProfile(req.user.id)
    if(!profile) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , profile})
}

export const updateProfile = async (req,res,next) => {
    const { name , email } = req.body;
    const updatedProfile = await userService.updateProfile(req.user.id , {name , email})
    if(!updatedProfile) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , updatedProfile})
}

export const uploadAvatar = async (req,res,next) => {
    if(!req.file) {
        return next(createError(400, "No file uploaded"))
    }
    const user = await userService.uploadAvatar(req.user.id , req.file.path)
    if(!user) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , user})
}

export const deleteAvatar = async (req,res,next) => {
    const user = await userService.deleteAvatar(req.user.id)
    if(!user) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , user})
}

export const changePassword = async (req,res,next) => {
    const { oldPassword , newPassword } = req.body;
    const user = await userService.changePassword(req.user.id , oldPassword , newPassword)
    if(!user) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , message: "Password changed successfully"})
}

export const deleteUser = async (req,res,next) => {
    const user = await userService.deleteUser(req.user.id)
    if(!user) {
        return next(createError(404, "User not found"))
    }
    res.status(200).json({success : true , message: "User deleted successfully"})
}
