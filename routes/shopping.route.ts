import {Router} from 'express'

const router = Router();

// ----------- Food Availability ---------------
router.get('/:pincode')

// ----------- Top Restaurants ---------------
router.get('/top-restaurants/:pincode')

// ----------- Food Available in 30 Mins ---------------
router.get('/foods-in-thirty/:pincode')

// ----------- Search Foods ---------------
router.get('/search/:pincode')

// ----------- Find Restuarant By ID ---------------
router.get('/restaurant/:id')

export { router as ShoppingRoute}