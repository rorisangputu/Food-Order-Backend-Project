import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { passwordCompare } from "../utility/passwordUtility";
import { findVendor } from "../utility/findUtility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = <VendorLoginInputs>req.body;

    try{
        //Check if user exists
        const vendor = await findVendor('', email)

        if(!vendor) {
            res.status(400).json({message: "User does not exist"})
            return;
        }

        const isMatch = await passwordCompare(password, vendor.password)

        if(!isMatch){
            res.status(400).json({message: "Email or Password do not match"})
            return;
        }

        res.status(200).json({message: "Successfully logged In", vendorData: vendor});

    }catch(error){
        console.log(error)
        res.status(500).json({messsage: "Something wen wrong"})
    }

}