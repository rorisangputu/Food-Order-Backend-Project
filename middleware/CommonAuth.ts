// Import the shape of the user payload (usually from JWT) from a Data Transfer Object (DTO)
import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/auth.dto";
import { ValidateSignature } from "../utility/passwordUtility";

// Declare a global augmentation for the Express namespace
declare global {
    // Extend the Express module
    namespace Express {
        // Augment the Request interface
        interface Request {
            // Add an optional 'user' property to the Request object
            // This allows us to attach the authenticated user's info (like ID, email, role, etc.)
            user?: AuthPayload;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const validate = await ValidateSignature(req);
    
    if(!validate){
        res.status(400).json({message: "User not Authorizes"})
    }

    next()
}