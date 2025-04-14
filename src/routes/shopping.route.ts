import {Router} from 'express'
import { GetFoodAvailability, GetFoodIn30Min, GetRestaurantByID, GetTopRestaurants, SearchFoods } from '../controllers/shopping.controller';

const router = Router();

// ----------- Top Restaurants ---------------
router.get('/top-restaurants', GetTopRestaurants)

// ----------- Food Available in 30 Mins ---------------
router.get('/foods-in-thirty', GetFoodIn30Min)

// ----------- Find Restuarant By ID ---------------
router.get('/restaurant/:id', GetRestaurantByID)

// ----------- Search Foods ---------------
router.get('/search', SearchFoods)


// ----------- Food Availability ---------------
router.get('/:pincode', GetFoodAvailability)





export { router as ShoppingRoute}