import { Request, Response } from "express";
import { CreateUserInputs } from "../dto/user.dto";
import { GeneratePassword, generateSalt, GenerateSignature } from "../utility/passwordUtility";
import User from "../models/user.model";
import { GenerateOTP, onRequestOTP } from "../utility/notificationUtility";

export const userSignUp = async (req: Request, res: Response) => {

    const { email, phone, password} = <CreateUserInputs>req.body;

    const salt = await generateSalt();
    const userPassword = await GeneratePassword(password, salt);
    
    const { otp, expiry } = GenerateOTP();
    

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

    if(createUser){
        //send the otp to customer
        await onRequestOTP(otp, phone)
        
        //generate signature
        const signature = await GenerateSignature({
            _id: createUser._id as string,
            email: createUser.email,
            verified: createUser.verified
        })

        //semd the result to client

        res.status(201).json({
            signature: signature,
            verified: createUser.verified,
            email: createUser.email
        });
    }

    res.status(400).json({message: "Error with signature"})
    
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