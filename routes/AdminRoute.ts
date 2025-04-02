import {Router, Request, Response, NextFunction} from 'express'
import { createVendor, getVendorById, getVendors } from '../controllers'
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the admin area')
})

router.post('/create-vendor', createVendor)

router.get('/get-vendors', getVendors)

router.get('/get-vendor/:id', getVendorById)

export default router;