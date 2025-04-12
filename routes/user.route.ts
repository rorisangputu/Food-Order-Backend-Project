import {Router} from 'express'
import { editProfile, requestOtp, userLogin, userProfile, userSignUp, verifyAcc } from '../controllers/user.controller';
import { Authenticate } from '../middleware';

const router = Router();

// ---------- Sign Up / Create Customer ------------
router.post('/signup', userSignUp)

// ---------- Login ------------
router.post('/login', userLogin)

//Authentication

router.use(Authenticate);

// ---------- Verify Customer ------------
router.patch('/verify', verifyAcc)

// ---------- OTP / Requesting OTP ------------
router.get('/otp', requestOtp)

// ---------- Profile------------
router.get('/profile', userProfile)

router.patch('/profile', editProfile)


export default router;