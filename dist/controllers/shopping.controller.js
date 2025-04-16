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
exports.SearchFoods = exports.GetRestaurantByID = exports.GetFoodIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
const GetFoodAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield vendor_model_1.default.find({ pincode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']]).populate("foods");
    if (result.length == null) {
        res.status(400).json({ message: "Data Not Found" });
        return;
    }
    res.status(200).json(result);
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield vendor_model_1.default.find({ serviceAvailable: true })
            .sort({ rating: -1 })
            .limit(10); //// Change to descending for top rated
        if (!result || result.length === 0) {
            res.status(404).json({ message: "No top restaurants found" });
            return;
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
        return;
    }
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodIn30Min = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.find({ serviceAvailable: true }).populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map(vendor => {
            const foods = vendor.foods;
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        });
        res.status(200).json(foodResult);
    }
    res.status(404).json({ message: "No top restaurants found" });
});
exports.GetFoodIn30Min = GetFoodIn30Min;
const GetRestaurantByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.id)
    // return;
    const id = req.params.id;
    const restaurant = yield vendor_model_1.default.findById(id);
    if (!restaurant) {
        res.status(400).json({ message: "Restaurant Not Found" });
        return;
    }
    res.status(200).json(restaurant);
});
exports.GetRestaurantByID = GetRestaurantByID;
const SearchFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_model_1.default.find({ serviceAvailable: true }).populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => foodResult.push(...item.foods));
        res.status(200).json(result);
    }
    res.status(400).json({ message: "Data Not Found" });
});
exports.SearchFoods = SearchFoods;
//# sourceMappingURL=shopping.controller.js.map