import {Router} from 'express'
import { GetFoodAvailability, GetFoodIn30Min, GetRestaurantByID, GetTopRestaurants, SearchFoods } from '../controllers/shopping.controller';

const router = Router();

// ----------- Top Restaurants ---------------
router.get('/top-restaurants', GetTopRestaurants)

// ----------- Food Available in 30 Mins ---------------
router.get('/foods-in-thirty', GetFoodIn30Min)

// ----------- Food Availability ---------------
router.get('/:pincode', GetFoodAvailability)

// ----------- Search Foods ---------------
router.get('/search/:pincode', SearchFoods)

// ----------- Find Restuarant By ID ---------------
router.get('/restaurant/:id', GetRestaurantByID)

export { router as ShoppingRoute}