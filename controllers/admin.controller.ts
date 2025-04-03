import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";

export const createVendor = async(req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;

    console.log(name, address, pincode, foodType, email, password, ownerName, phone)
}

export const getVendors = async(req: Request, res: Response, next: NextFunction) => {

}

export const getVendorById = async(req: Request, res: Response, next: NextFunction) => {

}