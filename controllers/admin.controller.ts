import { Request, Response, NextFunction } from "express";
import bcryptjs from 'bcrypt'
import { CreateVendorInput } from "../dto";
import Vendor from "../models/vendor.model";

export const createVendor = async (req: Request, res: Response, next: NextFunction
) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;
  
  try {
    let existingVendor = await Vendor.findOne({
      email: email,
    });

    if (existingVendor) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    //Generate Salt

    //Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10)
    const createdVendor = await Vendor.create({
      name: name,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: hashedPassword,
      salt: "hekllooooo",
      ownerName: ownerName,
      phone: phone,
      rating: 0,
      serviceAvailable: false,
      coverImage: [],
    });

    res.status(201).json({
      message: "Vendor created successfully!",
      data: createdVendor,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
