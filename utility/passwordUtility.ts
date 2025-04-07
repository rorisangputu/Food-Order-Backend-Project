import bcrypt from 'bcrypt'
import { VendorPayload } from '../dto';

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

}
