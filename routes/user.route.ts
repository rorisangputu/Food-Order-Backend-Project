import {Router} from 'express'
import { editProfile, requestOtp, userLogin, userProfile, userSignUp, verifyAcc } from '../controllers/user.controller';

const router = Router();

// ---------- Sign Up / Create Customer ------------
router.post('/signup', userSignUp)

// ---------- Login ------------
router.post('/login', userLogin)

//Authentication

// ---------- Verify Customer ------------
router.patch('/verify', verifyAcc)

// ---------- OTP / Requesting OTP ------------
router.get('/otp', requestOtp)

// ---------- Profile------------
router.get('/profile', userProfile)

router.patch('/profile', editProfile)


export default router;