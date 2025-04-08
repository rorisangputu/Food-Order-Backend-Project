import {Router, Request, Response, NextFunction} from 'express'
import { addFood, getFoods, getVendorProfile, updateVendorProfile, updateVendorServices, vendorLogin } from '../controllers/vendor.controller'
import { Authenticate } from '../middleware'
import multer from 'multer'
const router = Router()

const imageStorage = multer.diskStorage({

    destination:function(req, file, cb){
        cb(null, 'images')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'_'+file.originalname)
    }
});

const images = multer({storage: imageStorage}).array('images', 10 )

router.post('/login', vendorLogin)
router.use(Authenticate)
router.get('/profile', getVendorProfile )
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorServices)

router.post('/food', addFood)
router.get('/foods', getFoods)

export default router;