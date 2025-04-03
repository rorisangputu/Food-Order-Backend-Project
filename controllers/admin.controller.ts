import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import Vendor from "../models/vendor.model";


export const createVendor = async(req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;

    const createdVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: password,
        salt:  '',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImage:[],
    })
}

export const getVendors = async(req: Request, res: Response, next: NextFunction) => {

}

export const getVendorById = async(req: Request, res: Response, next: NextFunction) => {

}