import { Request, Response, NextFunction } from "express";
import bcryptjs from 'bcrypt'
import { CreateVendorInput } from "../dto";
import Vendor from "../models/vendor.model";
import { GeneratePassword, generateSalt } from "../utility/passwordUtility";

export const findVendor = async(id: string | undefined, email? : string) => {
  
  if(email){
    const vendor = await Vendor.findOne({email: email});
    return vendor;
  }else{
    let vendorId = await Vendor.findById(id)
    return vendorId;
  }

}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>req.body;
  
  try {
    let existingVendor = await findVendor('', email);

    if (existingVendor) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    //Generate Salt
    const salt = await generateSalt()
    //Encrypt Password using the salt
    const hashedPassword = await GeneratePassword(password, salt)


    const createdVendor = await Vendor.create({
      name: name,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: hashedPassword,
      salt: salt,
      ownerName: ownerName,
      phone: phone,
      rating: 0,
      serviceAvailable: false,
      coverImage: [],
    });

    res.status(201).json({
      message: "Vendor created successfully!",
      vendorData: {
        createdVendor
      },
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
) => {

  try {

    const vendors = await Vendor.find() 
    if(!vendors) {
      res.status(400).json({message:"There are no vendors currently"});
      return;
    }
    res.json(vendors)

  } catch (error) {

    console.log(error);
    res.status(500).json({message: "Something went wrong!"})

  }
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Getting vendor id from req parameter (url)
  const vendorId = req.params.id
  
  try {
    //finding vendor in db by Id and assigning it to a const variable
    const vendor = await findVendor(vendorId);

    //If vendor with that id doesnt exist return an error with message
    if(!vendor){
      res.status(400).json({message: "A vendor with this Id does not exist"})
      return;
    }

    //respond with vendor info as json
    res.json(vendor)

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something went wrong"})
  }
};
