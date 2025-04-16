"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_controller_1 = require("../controllers/vendor.controller");
const middleware_1 = require("../middleware");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
router.post('/login', vendor_controller_1.vendorLogin);
router.use(middleware_1.Authenticate);
router.get('/profile', vendor_controller_1.getVendorProfile);
router.patch('/profile', vendor_controller_1.updateVendorProfile);
router.patch('/service', vendor_controller_1.updateVendorServices);
router.post('/food', vendor_controller_1.addFood);
router.get('/foods', vendor_controller_1.getFoods);
exports.default = router;
//# sourceMappingURL=VendorRoute.js.map