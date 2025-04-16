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
exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const vendor_model_1 = __importDefault(require("../models/vendor.model"));
const passwordUtility_1 = require("../utility/passwordUtility");
const findUtility_1 = require("../utility/findUtility");
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = req.body;
    try {
        let existingVendor = yield (0, findUtility_1.findVendor)('', email);
        if (existingVendor) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        //Generate Salt
        const salt = yield (0, passwordUtility_1.generateSalt)();
        //Encrypt Password using the salt
        const hashedPassword = yield (0, passwordUtility_1.GeneratePassword)(password, salt);
        const createdVendor = yield vendor_model_1.default.create({
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
            coverImage: ["https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"],
            foods: []
        });
        res.status(201).json({
            message: "Vendor created successfully!",
            vendorData: {
                createdVendor
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_model_1.default.find();
        if (!vendors) {
            res.status(400).json({ message: "There are no vendors currently" });
            return;
        }
        res.json(vendors);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Getting vendor id from req parameter (url)
    const vendorId = req.params.id;
    try {
        //finding vendor in db by Id and assigning it to a const variable
        const vendor = yield (0, findUtility_1.findVendor)(vendorId);
        //If vendor with that id doesnt exist return an error with message
        if (!vendor) {
            res.status(400).json({ message: "A vendor with this Id does not exist" });
            return;
        }
        //respond with vendor info as json
        res.json(vendor);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getVendorById = getVendorById;
//# sourceMappingURL=admin.controller.js.map