import { Request, Response } from "express";
import { CreateUserInputs } from "../dto/user.dto";
import { GeneratePassword, generateSalt } from "../utility/passwordUtility";
import User from "../models/user.model";
import { GenerateOTP } from "../utility/notificationUtility";

export const userSignUp = async (req: Request, res: Response) => {

    const { email, phone, password} = <CreateUserInputs>req.body;

    const salt = await generateSalt();
    const userPassword = await GeneratePassword(password, salt);
    
    const { otp, expiry } = GenerateOTP();
    console.log(otp, expiry)
    res.status(200).json('working...')
    return;

    const createUser = await User.create({
        email: email,
        phone: phone,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
    })
    
}

export const userLogin = async (req: Request, res: Response) => {
    
}

export const verifyAcc = async (req: Request, res: Response) => {
    
}

export const getOtp = async (req: Request, res: Response) => {
    
}

export const userProfile = async (req: Request, res: Response) => {
    
}

export const editProfile = async (req: Request, res: Response) => {
    
}