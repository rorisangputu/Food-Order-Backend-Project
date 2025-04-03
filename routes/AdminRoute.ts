import {Router, Request, Response, NextFunction} from 'express'
import { createVendor, getVendorById, getVendors } from '../controllers'
import { body, validationResult } from 'express-validator'
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the admin area')
})

router.post('/create-vendor', // Validation rules
    // Validation rules
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('address').notEmpty().withMessage('Address is required').isString().withMessage('Address must be a string'),
  body('pincode').notEmpty().withMessage('Pincode is required').isLength({ min: 5, max: 6 }).withMessage('Pincode must be between 5 and 6 characters'),
  body('foodType').isArray().withMessage('Food type must be an array of strings'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('ownerName').notEmpty().withMessage('Owner name is required').isString().withMessage('Owner name must be a string'),
  body('phone').notEmpty().withMessage('Valid phone number is required'),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          // Send error response and do not continue to the next middleware/controller
          res.status(400).json({ errors: errors.array() });
        }
        next(); // If validation passed, proceed to the controller
      },
    createVendor)

router.get('/get-vendors', getVendors)

router.get('/get-vendor/:id', getVendorById)

export default router;