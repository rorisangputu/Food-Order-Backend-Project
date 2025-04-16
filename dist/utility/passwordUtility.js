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
exports.ValidateSignature = exports.GenerateSignature = exports.passwordCompare = exports.GeneratePassword = exports.generateSalt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    let salt = yield bcryptjs_1.default.genSalt();
    return salt;
});
exports.generateSalt = generateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
const passwordCompare = (password, vendorPass) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcryptjs_1.default.compare(password, vendorPass);
    return isMatch;
});
exports.passwordCompare = passwordCompare;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    return signature;
});
exports.GenerateSignature = GenerateSignature;
const ValidateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    if (!signature) {
        return false;
    }
    const payload = yield jsonwebtoken_1.default.verify(signature.split(' ')[1], process.env.JWT_SECRET);
    req.user = payload;
    return true;
});
exports.ValidateSignature = ValidateSignature;
//# sourceMappingURL=passwordUtility.js.map