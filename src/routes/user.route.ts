import {Router} from 'express'
import { AddToCart, CreateOrder, DeleteCart, editProfile, GetCartDetails, GetOrderById, GetOrders, requestOtp, userLogin, userProfile, userSignUp, verifyAcc } from '../controllers/user.controller';
import { Authenticate } from '../middleware';

const router = Router();

// ---------- Sign Up / Create Customer ------------
router.post('/signup', userSignUp)

// ---------- Login ------------
router.post('/login', userLogin)

//Authentication Layer
// ---------- Verify Customer ------------
router.patch('/verify',Authenticate, verifyAcc)

// ---------- OTP / Requesting OTP ------------
router.get('/otp',Authenticate, requestOtp)

// ---------- Profile------------
router.get('/profile', Authenticate, userProfile)

router.patch('/edit-profile', Authenticate, editProfile)

//Cart

router.post('/cart', Authenticate, AddToCart)
router.get('/cart', Authenticate, GetCartDetails) 
router.delete('/cart', Authenticate, DeleteCart)

//Orders
router.post('/create-order', Authenticate, CreateOrder)
router.get('/orders', Authenticate, GetOrders )
router.get('/order/:id', Authenticate, GetOrderById )




export default router;