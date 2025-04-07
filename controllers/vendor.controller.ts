import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { GenerateSignature, passwordCompare } from "../utility/passwordUtility";
import { findVendor } from "../utility/findUtility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = <VendorLoginInputs>req.body;

    try{
        //Check if user exists
        const vendor = await findVendor('', email)
        
        //If User not found return an error
        if(!vendor) {
            res.status(400).json({message: "User does not exist"})
            return;
        }

        //If User found compare password in db to password entered
        const isMatch = await passwordCompare(password, vendor.password)

        //If password doesnt match return error
        if(!isMatch){
            res.status(400).json({message: "Email or Password do not match"})
            return;
        }

        //Create web token
        const signature = await GenerateSignature({
            _id: vendor.id,
            email: vendor.email,
            foodTypes: vendor.foodType,
            name: vendor.name
        })
        
        res.status(200).json({message: "Successfully logged In", signature});

    }catch(error){
        console.log(error)
        res.status(500).json({messsage: "Something wen wrong"})
    }
}

export const getVendorProfile = async(req: Request, res: Response, next:NextFunction)=> {

    const user = req.user;

    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }

    const vendor = await findVendor(user._id)
    res.json(vendor);
}

export const updateVendorProfile = async(req:Request, res: Response, next:NextFunction)=> {
    const user = req.user;

    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }

    const vendor = await findVendor(user._id)
    res.json(vendor);
}

export const updateVendorServices = async (req: Request, res:Response, next: NextFunction) => {
    
}