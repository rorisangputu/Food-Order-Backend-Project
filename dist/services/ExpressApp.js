"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminRoute_1 = __importDefault(require("../routes/AdminRoute"));
const VendorRoute_1 = __importDefault(require("../routes/VendorRoute"));
const shopping_route_1 = require("../routes/shopping.route");
const user_route_1 = __importDefault(require("../routes/user.route"));
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/admin', AdminRoute_1.default);
    app.use('/vendor', VendorRoute_1.default);
    app.use(shopping_route_1.ShoppingRoute);
    app.use('/user', user_route_1.default);
    return app;
});
//# sourceMappingURL=ExpressApp.js.map