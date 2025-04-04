import {Router, Request, Response, NextFunction} from 'express'
import { vendorLogin } from '../controllers/vendor.controller'
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the vendor area')
})

router.post('/login', vendorLogin)

export default router;