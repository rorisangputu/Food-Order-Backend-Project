import { Request, Response, NextFunction } from "express";
import { EditVendorInputs, VendorLoginInputs } from "../dto";
import { GenerateSignature, passwordCompare } from "../utility/passwordUtility";
import { findVendor } from "../utility/findUtility";
import { CreateFoodInputs } from "../dto/food.dto";
import Food from "../models/food.model";
import Order from "../models/order.model";

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
        
        res.status(200).json({message: "Successfully logged In", signature, data: vendor});

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
    
    const { foodTypes, name, address, phone } = <EditVendorInputs>req.body;

    const user = req.user;
    
    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }

    const vendor = await findVendor(user._id)

    if(!vendor){
        res.status(400).json({message: "User not found"})
        return;
    }

    vendor.name = name;
    vendor.address = address;
    vendor.phone = phone;
    vendor.foodType = foodTypes;

    const result = await vendor.save();    
    res.json(result);
}

export const updateVendorServices = async (req: Request, res:Response, next: NextFunction) => {
    
    const user = req.user;

    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }

    const vendor = await findVendor(user._id)

    if(!vendor){
        res.status(400).json({message: "User not found"})
        return;
    }

    vendor.serviceAvailable = !vendor.serviceAvailable as boolean;
    const result = await vendor.save(); 
    res.json(result);

}

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;

    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }
    

    try {
        
        const vendor = await findVendor(user._id)
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body;

        if(!vendor){
            res.status(400).json({message: "Vendor not found"})
            return;
        }

        
        const createdFood = await Food.create({
            vendorId: vendor._id,
            name: name,
            description: description,
            category: category,
            foodType: foodType,
            image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZgTsV5FSzcygnwaRW4SePUSXSiNZCdYUhw&s"],
            readyTime: readyTime,
            price: price,
            rating: 0
        })

        vendor.foods.push(createdFood);
        const result = await vendor.save();

        res.status(201).json(result);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}

export const getFoods = async (req: Request, res: Response, next: NextFunction)=> {

    const user = req.user;

    if(!user){
        res.status(400).json({message: "User not found"})
        return;
    }

    const vendor = await findVendor(user._id);

    if(!vendor){
        res.status(400).json({message: "User not found"})
        return;
    }

    if (!vendor.foods || vendor.foods.length === 0) {
        res.status(204).json({ message: "No foods found" });
        return;
      }
    
      // Fetch all food documents by their IDs
      const foodList = await Promise.all(
        vendor.foods.map((foodId: string)=> Food.findById(foodId))
      );

    res.status(200).json(foodList)
}

//ORDERS 
export const GetCurrentOrders = async (req: Request, res: Response) => {
    
    const user = req.user; //Vendor

    if (user) {
        const orders = await Order.find({ vendorId: user._id }).populate('items.id');

        if (orders != null) {
            res.status(200).json(orders)
            return;
        }

        res.status(404).json({ message: "Order info not found" })
        return;
    }
    res.status(401).json({ message: "Can't get orders" })
    return;
}

export const GetOrderById = async (req: Request, res: Response) => {
    const id = req.params.id
    
    const order = await Order.findById(id).populate('items.food')

    if (!order) {
        res.status(404).json({ message: "Order doesnt exist" })
        return;
    }

    res.status(200).json(order)
}

export const ProcessOrder = async (req: Request, res: Response) => {
    
    const orderId = req.params.id;
    
    const { status, remarks, time } = req.body

    if (orderId) {
        const order = await Order.findById(orderId).populate('food');
        
        if (order) {
            order.orderStatus = status
            order.remarks = remarks
            
            if (time) {
                order.readyTime = time
            }
            
            const orderResult = await order.save();
            if (orderResult !== null) {
                res.status(200).json(orderResult);
                return; 
            } else {
                res.status(400).json({message: 'Couldnt process order'})
                return;
            }
            
            
        }
        
    }
res.status(400).json({message: 'Couldnt process order'})
}

