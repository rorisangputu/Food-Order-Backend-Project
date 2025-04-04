import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import Vendor from "../models/vendor.model";
import { passwordCompare } from "../utility/passwordUtility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    try{
        //Check if user exists
        const vendor = await Vendor.findOne({email: email})

        if(!vendor) {
            res.status(400).json({message: "User does not exist"})
            return;
        }

        const isMatch = await passwordCompare(password, vendor.password)
    }catch(error){
        console.log(error)
    }
}