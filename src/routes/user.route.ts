import {Router} from 'express'
import { editProfile, requestOtp, userLogin, userProfile, userSignUp, verifyAcc } from '../controllers/user.controller';
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

//Orders
router.post('/create-order',)
router.get('/orders', )
router.get('/order/:id', )


export default router;