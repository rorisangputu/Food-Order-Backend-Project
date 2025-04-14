import { Request, Response } from "express";
import Vendor from "../models/vendor.model";
import { FoodDoc } from "../models/food.model";

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
    try {
        const result = await Vendor.find({ serviceAvailable: true })
        .sort({ rating: -1 })
        .limit(10); //// Change to descending for top rated

        if (!result || result.length === 0) {
            res.status(404).json({ message: "No top restaurants found" });
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
};

export const GetFoodIn30Min = async (req: Request, res: Response) => {

    const result = await Vendor.find({ serviceAvailable: true}).populate("foods")

    if(result.length > 0){
        let foodResult: any = [];

        result.map(vendor => {
            const foods = vendor.foods as [FoodDoc]

            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        })
        res.status(200).json(foodResult);
    }
    
    res.status(404).json({ message: "No top restaurants found" });
}

export const GetRestaurantByID = async (req: Request, res: Response) => {
    // console.log(req.params.id)
    // return;
    const id = req.params.id;

    const restaurant = await Vendor.findById(id)

    if (!restaurant) {
        res.status(400).json({ message: "Restaurant Not Found" })
        return;
    }

    res.status(200).json(restaurant);

}

export const SearchFoods = async (req: Request, res: Response) => {
    const result = await Vendor.find({ serviceAvailable: true }).populate("foods");

    if (result.length > 0) {
        let foodResult: any = [];
        result.map(item => foodResult.push(...item.foods))

        res.status(200).json(result)
    }
    res.status(400).json({ message: "Data Not Found" });
}

