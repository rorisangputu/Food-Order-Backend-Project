"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoods = exports.addFood = exports.updateVendorServices = exports.updateVendorProfile = exports.getVendorProfile = exports.vendorLogin = void 0;
const passwordUtility_1 = require("../utility/passwordUtility");
const findUtility_1 = require("../utility/findUtility");
const food_model_1 = __importDefault(require("../models/food.model"));
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Check if user exists
        const vendor = yield (0, findUtility_1.findVendor)('', email);
        //If User not found return an error
        if (!vendor) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        //If User found compare password in db to password entered
        const isMatch = yield (0, passwordUtility_1.passwordCompare)(password, vendor.password);
        //If password doesnt match return error
        if (!isMatch) {
            res.status(400).json({ message: "Email or Password do not match" });
            return;
        }
        //Create web token
        const signature = yield (0, passwordUtility_1.GenerateSignature)({
            _id: vendor.id,
            email: vendor.email,
            foodTypes: vendor.foodType,
            name: vendor.name
        });
        res.status(200).json({ message: "Successfully logged In", signature, data: vendor });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Something wen wrong" });
    }
});
exports.vendorLogin = vendorLogin;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const vendor = yield (0, findUtility_1.findVendor)(user._id);
    res.json(vendor);
});
exports.getVendorProfile = getVendorProfile;
const updateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodTypes, name, address, phone } = req.body;
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const vendor = yield (0, findUtility_1.findVendor)(user._id);
    if (!vendor) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    vendor.name = name;
    vendor.address = address;
    vendor.phone = phone;
    vendor.foodType = foodTypes;
    const result = yield vendor.save();
    res.json(result);
});
exports.updateVendorProfile = updateVendorProfile;
const updateVendorServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const vendor = yield (0, findUtility_1.findVendor)(user._id);
    if (!vendor) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    vendor.serviceAvailable = !vendor.serviceAvailable;
    const result = yield vendor.save();
    res.json(result);
});
exports.updateVendorServices = updateVendorServices;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    try {
        const vendor = yield (0, findUtility_1.findVendor)(user._id);
        const { name, description, category, foodType, readyTime, price } = req.body;
        if (!vendor) {
            res.status(400).json({ message: "Vendor not found" });
            return;
        }
        const createdFood = yield food_model_1.default.create({
            vendorId: vendor._id,
            name: name,
            description: description,
            category: category,
            foodType: foodType,
            image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZgTsV5FSzcygnwaRW4SePUSXSiNZCdYUhw&s"],
            readyTime: readyTime,
            price: price,
            rating: 0
        });
        vendor.foods.push(createdFood);
        const result = yield vendor.save();
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.addFood = addFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const vendor = yield (0, findUtility_1.findVendor)(user._id);
    if (!vendor) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    if (!vendor.foods || vendor.foods.length === 0) {
        res.status(204).json({ message: "No foods found" });
        return;
    }
    // Fetch all food documents by their IDs
    const foodList = yield Promise.all(vendor.foods.map((foodId) => food_model_1.default.findById(foodId)));
    res.status(200).json(foodList);
});
exports.getFoods = getFoods;
//# sourceMappingURL=vendor.controller.js.map