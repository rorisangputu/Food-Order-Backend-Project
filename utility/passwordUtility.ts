import bcrypt from 'bcrypt'
import { VendorPayload } from '../dto';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthPayload } from '../dto/auth.dto';

export const generateSalt = async (): Promise<string> => {
    let salt = await bcrypt.genSalt()
    return salt;
}

export const GeneratePassword = async (password: string, salt: string) => {
   return await bcrypt.hash(password, salt);
}

export const passwordCompare = async(password: string, vendorPass: string) => {

    const isMatch = await bcrypt.compare(password, vendorPass);
    return isMatch
}

export const GenerateSignature = async (payload: VendorPayload) => {

    const signature = await jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1d"} )
    return signature;
}

export const ValidateSignature = async (req: Request) => {

    const signature = req.get('Authorization');

    if(!signature){
        return false;
    }

    const payload = await jwt.verify(signature.split(' ')[1], process.env.JWT_SECRET as string) as AuthPayload
    req.user = payload
    return true;
}