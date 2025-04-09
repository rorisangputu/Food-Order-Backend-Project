import { Request, Response } from "express";
import { findVendor } from "../utility/findUtility";
import Vendor from "../models/vendor.model";

export const GetFoodAvailability = async (req: Request, res: Response) => {

    const pincode = req.params.pincode;

    const result = await Vendor.find({pincode: pincode, serviceAvailable: true})
    .sort([['rating', 'descending']]).populate("foods");

    if(result.length == null){
        res.status(400).json({message: "Data Not Found"})
        return;
    }

    res.status(200).json(result)

}

export const GetTopRestaurants = async (req: Request, res: Response) => {

}

export const GetFoodIn30Min = async (req: Request, res: Response) => {

}

export const GetRestaurantByID = async (req: Request, res: Response) => {

}

export const SearchFoods = async (req: Request, res: Response) => {

}

