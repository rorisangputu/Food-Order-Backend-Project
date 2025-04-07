import {Router, Request, Response, NextFunction} from 'express'
import { addFood, getVendorProfile, updateVendorProfile, updateVendorServices, vendorLogin } from '../controllers/vendor.controller'
import { Authenticate } from '../middleware'
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the vendor area')
})

router.post('/login', vendorLogin)
router.use(Authenticate)
router.get('/profile', getVendorProfile )
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorServices)

router.post('/food', addFood)
router.get('/foods',)

export default router;