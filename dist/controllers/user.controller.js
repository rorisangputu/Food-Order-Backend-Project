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
exports.GetOrderById = exports.GetOrders = exports.CreateOrder = exports.DeleteCart = exports.GetCartDetails = exports.AddToCart = exports.editProfile = exports.userProfile = exports.requestOtp = exports.verifyAcc = exports.userLogin = exports.userSignUp = void 0;
const passwordUtility_1 = require("../utility/passwordUtility");
const user_model_1 = __importDefault(require("../models/user.model"));
const notificationUtility_1 = require("../utility/notificationUtility");
const food_model_1 = __importDefault(require("../models/food.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, password } = req.body;
    const salt = yield (0, passwordUtility_1.generateSalt)();
    const userPassword = yield (0, passwordUtility_1.GeneratePassword)(password, salt);
    const { otp, expiry } = (0, notificationUtility_1.GenerateOTP)();
    const existUser = yield user_model_1.default.findOne({ email: email });
    if (existUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const createUser = yield user_model_1.default.create({
        email: email,
        phone: phone,
        password: userPassword,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
        orders: []
    });
    if (createUser) {
        //send the otp to customer
        //await onRequestOTP(otp, phone)
        //generate signature
        const signature = yield (0, passwordUtility_1.GenerateSignature)({
            _id: createUser._id,
            email: createUser.email,
            verified: createUser.verified
        });
        //semd the result to client
        res.status(201).json({
            signature: signature,
            verified: createUser.verified,
            email: createUser.email,
            otp: createUser.otp
        });
        return;
    }
    res.status(400).json({ message: "Error with signature" });
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            res.status(400).json({ message: "Email or Password are incorrect" });
            return;
        }
        const validatePass = yield (0, passwordUtility_1.passwordCompare)(password, user.password);
        if (!validatePass) {
            res.status(400).json({ message: "Email or Password are incorrect" });
            return;
        }
        const signature = yield (0, passwordUtility_1.GenerateSignature)({
            _id: user._id,
            email: user.email,
            verified: user.verified
        });
        res.status(200).json({ message: "User logged in", signature: signature, user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with Sign In" });
    }
});
exports.userLogin = userLogin;
const verifyAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield user_model_1.default.findById(customer._id);
        if (!profile) {
            res.status(400).json({ message: "Couldn't find user" });
        }
        if ((profile === null || profile === void 0 ? void 0 : profile.otp) === parseInt(otp) && (profile === null || profile === void 0 ? void 0 : profile.otp_expiry) >= new Date()) {
            profile.verified = true;
            const updatedCustomerResponse = yield profile.save();
            const signature = yield (0, passwordUtility_1.GenerateSignature)({
                _id: updatedCustomerResponse._id,
                email: updatedCustomerResponse.email,
                verified: updatedCustomerResponse.verified
            });
            res.status(200).json({ message: "User verified", signature: signature, verified: updatedCustomerResponse.verified, email: updatedCustomerResponse.email });
            return;
        }
    }
    res.status(400).json({ message: "Error with otp validation" });
});
exports.verifyAcc = verifyAcc;
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield user_model_1.default.findById(customer === null || customer === void 0 ? void 0 : customer._id);
        if (profile) {
            const { otp, expiry } = (0, notificationUtility_1.GenerateOTP)();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            yield profile.save();
            //await onRequestOTP(otp, profile.phone);
            res.status(200).json({ message: "OTP has been sent to your whatsapp", profile, otp: profile.otp });
            return;
        }
        else {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
    }
    res.status(400).json({ message: "User does not exist" });
    return;
});
exports.requestOtp = requestOtp;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const profile = yield user_model_1.default.findById(user._id);
        if (profile) {
            res.status(201).json({ user: profile });
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    }
    res.status(400).json({ message: "User not found" });
});
exports.userProfile = userProfile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { firstName, lastName } = req.body;
    if (user) {
        const profile = yield user_model_1.default.findById(user._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            const result = yield profile.save();
            res.status(200).json({ message: "User has been edited", result });
            return;
        }
        else {
            res.status(400).json({ message: "User not found" });
            return;
        }
    }
    res.status(400).json({ message: "User not found" });
});
exports.editProfile = editProfile;
//CART FUNCTIONS
const AddToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const profile = yield user_model_1.default.findById(user._id).populate('cart.food');
        let cartItems = [];
        const { _id, unit } = req.body;
        const food = yield food_model_1.default.findById(_id);
        if (food) {
            if (profile) {
                //Check for cart items
                cartItems = profile.cart;
                if (cartItems.length > 0) {
                    //check and update unit
                    let existingFoodItem = cartItems.filter(item => item.food._id.toString() === _id);
                }
                else {
                    //add new item to cart
                    cartItems.push({ food, unit });
                }
            }
        }
    }
    else {
        res.status(500).json({ message: "Something when wrong" });
        return;
    }
    res.status(500).json({ message: "User not Authorized" });
});
exports.AddToCart = AddToCart;
const GetCartDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.GetCartDetails = GetCartDetails;
const DeleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.DeleteCart = DeleteCart;
// ORDERS
const CreateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get current user
    const customer = req.user;
    if (customer) {
        //create order id
        const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
        const profile = yield user_model_1.default.findById(customer._id);
        //get order items from req
        //console.log(req.body)
        const cart = req.body;
        let cartItems = [];
        let netAmount = 0.0;
        //calculate order amount
        const foods = yield food_model_1.default.find().where('_id').in(cart.map((item) => item._id)).exec();
        foods.forEach(food => {
            cart.forEach(({ _id, unit }) => {
                var _a;
                if (((_a = food._id) === null || _a === void 0 ? void 0 : _a.toString()) === _id) {
                    netAmount += food.price * unit;
                    cartItems.push({ food, unit });
                }
            });
        });
        //create order w item desc
        if (cartItems) {
            //Create Order
            const currentOrder = yield order_model_1.default.create({
                orderID: orderId,
                items: cartItems,
                totalAmount: netAmount,
                orderDate: new Date(),
                paymentMethod: 'COD',
                paymentResponse: '',
                orderStatus: 'Pending'
            });
            if (currentOrder) {
                profile === null || profile === void 0 ? void 0 : profile.orders.push(currentOrder);
                yield (profile === null || profile === void 0 ? void 0 : profile.save());
                res.status(200).json(currentOrder);
                return;
            }
        }
    }
    res.status(400).json({ message: "Error with Create Order!" });
});
exports.CreateOrder = CreateOrder;
const GetOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        if (!user) {
            res.status(400).json({ message: "User not Authorised" });
            return;
        }
        const customer = yield user_model_1.default.findById(user._id).populate('orders');
        if (!customer) {
            res.status(400).json("Cannot find user");
        }
        const orders = customer === null || customer === void 0 ? void 0 : customer.orders;
        res.status(200).json(orders);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.GetOrders = GetOrders;
const GetOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield order_model_1.default.findById(id);
        if (!order) {
            res.status(400).json("Cannot find order");
            return;
        }
        res.status(200).json(order);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
});
exports.GetOrderById = GetOrderById;
//# sourceMappingURL=user.controller.js.map