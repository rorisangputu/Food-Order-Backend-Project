"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.send('This is the admin area');
});
router.post('/create-vendor', // Validation rules
// Validation rules
(0, express_validator_1.body)('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'), (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required').isString().withMessage('Address must be a string'), (0, express_validator_1.body)('pincode').notEmpty().withMessage('Pincode is required').isLength({ min: 5, max: 6 }).withMessage('Pincode must be between 5 and 6 characters'), (0, express_validator_1.body)('foodType').isArray().withMessage('Food type must be an array of strings'), (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'), (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), (0, express_validator_1.body)('ownerName').notEmpty().withMessage('Owner name is required').isString().withMessage('Owner name must be a string'), (0, express_validator_1.body)('phone').notEmpty().withMessage('Valid phone number is required'), 
// Middleware to check validation results
(req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Send error response and do not continue to the next middleware/controller
        res.status(400).json({ errors: errors.array() });
    }
    next(); // If validation passed, proceed to the controller
}, controllers_1.createVendor);
router.get('/get-vendors', controllers_1.getVendors);
router.get('/get-vendor/:id', controllers_1.getVendorById);
exports.default = router;
//# sourceMappingURL=AdminRoute.js.map