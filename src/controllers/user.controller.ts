import { Request, Response } from "express";
import { CreateUserInputs, EditUserProfileInputs, OrderInputs, UserLoginInput } from "../dto/user.dto";
import { GeneratePassword, generateSalt, GenerateSignature, passwordCompare } from "../utility/passwordUtility";
import User from "../models/user.model";
import { GenerateOTP, onRequestOTP } from "../utility/notificationUtility";

import Food from "../models/food.model";
import Order from "../models/order.model";

export const userSignUp = async (req: Request, res: Response) => {

    const { email, phone, password} = <CreateUserInputs>req.body;

    const salt = await generateSalt();
    const userPassword = await GeneratePassword(password, salt);
    
    const { otp, expiry } = GenerateOTP();
    
    const existUser = await User.findOne({ email: email })
    
    if (existUser) {
        res.status(400).json({ message: "User already exists" })
        return;
    }

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
        orders: []
    })

    if(createUser){
        //send the otp to customer
        //await onRequestOTP(otp, phone)
        
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
            email: createUser.email,
            otp: createUser.otp
        });
        return;
    }

    res.status(400).json({message: "Error with signature"})
    
}

export const userLogin = async (req: Request, res: Response) => {
    
    try {
        const { email, password }: UserLoginInput = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json({ message: "Email or Password are incorrect" });
            return;
        }

        const validatePass = await passwordCompare(password, user.password)

        if (!validatePass) {
            res.status(400).json({ message: "Email or Password are incorrect" })
            return;
        }

        const signature = await GenerateSignature({
            _id: user._id as string,
            email: user.email,
            verified: user.verified
        })

    res.status(200).json({message: "User logged in", signature: signature, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong with Sign In"})
    }
        

}

export const verifyAcc = async (req: Request, res: Response) => {
    
    const { otp } = req.body;
    const customer = req.user;

    if(customer) {
        const profile = await User.findById(customer._id);

        if (!profile) {
            res.status(400).json({message: "Couldn't find user"})
        }
        
        if (profile?.otp === parseInt(otp) && profile?.otp_expiry >= new Date()) {
            
            profile.verified = true;

            const updatedCustomerResponse = await profile.save();

            const signature = await GenerateSignature({
                _id: updatedCustomerResponse._id as string,
                email: updatedCustomerResponse.email,
                verified: updatedCustomerResponse.verified
            })

            res.status(200).json({ message: "User verified", signature: signature, verified: updatedCustomerResponse.verified, email: updatedCustomerResponse.email })
            return;
        }
        
    }
    res.status(400).json({message: "Error with otp validation"})
    
}

export const requestOtp = async (req: Request, res: Response) => {
    const customer = req.user;

    if (customer) {
        const profile = await User.findById(customer?._id);

        if (profile) {
            const { otp, expiry } = GenerateOTP();
            profile.otp = otp
            profile.otp_expiry = expiry

            await profile.save()
            //await onRequestOTP(otp, profile.phone);
            res.status(200).json({ message: "OTP has been sent to your whatsapp", profile, otp: profile.otp })
            return;
        } else {
            res.status(400).json({ message: "User does not exist" })
            return;
        }

    }

    res.status(400).json({ message: "User does not exist" })
    return;
    
}

export const userProfile = async (req: Request, res: Response) => {
    const user = req.user;
    

    if (user) {
        const profile = await User.findById(user._id);
        if (profile) {
            res.status(201).json({user: profile})
        } else {
            res.status(400).json({ message: "User not found" })
        }
    }
    res.status(400).json({message: "User not found"})
}

export const editProfile = async (req: Request, res: Response) => {
    const user = req.user;
    const {firstName, lastName} = <EditUserProfileInputs>req.body

    if (user) {
        const profile = await User.findById(user._id);
        
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;

            const result = await profile.save();
            res.status(200).json({message: "User has been edited", result})
            return;
        } else {
            res.status(400).json({ message: "User not found" })
            return;
        }
    }
    res.status(400).json({message: "User not found"})
}

// ORDERS

export const CreateOrder = async (req: Request, res: Response) => {
    
    //get current user
    const customer = req.user;
    
    if(customer){
        //create order id
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;

        const profile = await User.findById(customer._id);

        //get order items from req
        const cart = <[OrderInputs]>req.body;
        let cartItems = Array();
        let netAmount = 0.0;

        //calculate order amount
        const foods = await Food.find().where('_id').in(cart.map(item=> item._id)).exec();

        foods.map(food => {
            cart.map(({_id, unit}) => {

                if(food._id == _id){
                    netAmount += (food.price * unit);
                    cartItems.push({food, unit})
                }
            })
        })

        //create order w item desc
        if(cartItems){
            //Create Order
            const currentOrder = await Order.create({

            })
        }
    }

    
}

export const GetOrders = async (req: Request, res: Response) => {

}

export const GetOrderById = async (req: Request, res: Response) => {

}