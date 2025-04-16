"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// ---------- Sign Up / Create Customer ------------
router.post('/signup', user_controller_1.userSignUp);
// ---------- Login ------------
router.post('/login', user_controller_1.userLogin);
//Authentication Layer
// ---------- Verify Customer ------------
router.patch('/verify', middleware_1.Authenticate, user_controller_1.verifyAcc);
// ---------- OTP / Requesting OTP ------------
router.get('/otp', middleware_1.Authenticate, user_controller_1.requestOtp);
// ---------- Profile------------
router.get('/profile', middleware_1.Authenticate, user_controller_1.userProfile);
router.patch('/edit-profile', middleware_1.Authenticate, user_controller_1.editProfile);
//Cart
router.post('/cart', middleware_1.Authenticate, user_controller_1.AddToCart);
router.get('/cart', middleware_1.Authenticate, user_controller_1.GetCartDetails);
router.delete('/cart', middleware_1.Authenticate, user_controller_1.DeleteCart);
//Orders
router.post('/create-order', middleware_1.Authenticate, user_controller_1.CreateOrder);
router.get('/orders', middleware_1.Authenticate, user_controller_1.GetOrders);
router.get('/order/:id', middleware_1.Authenticate, user_controller_1.GetOrderById);
exports.default = router;
//# sourceMappingURL=user.route.js.map