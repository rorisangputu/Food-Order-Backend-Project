"use strict";
//Email
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.GenerateOTP = void 0;
// Notifications
//OTP
const GenerateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.GenerateOTP = GenerateOTP;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const response = yield client.messages.create({
        from: 'whatsapp:+14155238886',
        body: `Your OTP is ${otp}`,
        to: `whatsapp:+27${toPhoneNumber}`
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
//Payment Notification
//# sourceMappingURL=notificationUtility.js.map