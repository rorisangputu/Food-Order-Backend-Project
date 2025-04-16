"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = require("express");
const shopping_controller_1 = require("../controllers/shopping.controller");
const router = (0, express_1.Router)();
exports.ShoppingRoute = router;
// ----------- Top Restaurants ---------------
router.get('/top-restaurants', shopping_controller_1.GetTopRestaurants);
// ----------- Food Available in 30 Mins ---------------
router.get('/foods-in-thirty', shopping_controller_1.GetFoodIn30Min);
// ----------- Find Restuarant By ID ---------------
router.get('/restaurant/:id', shopping_controller_1.GetRestaurantByID);
// ----------- Search Foods ---------------
router.get('/search', shopping_controller_1.SearchFoods);
// ----------- Food Availability ---------------
router.get('/:pincode', shopping_controller_1.GetFoodAvailability);
//# sourceMappingURL=shopping.route.js.map