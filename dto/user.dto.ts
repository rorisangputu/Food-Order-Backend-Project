
export interface CreateUserInputs{

    email: string;
    phone: string;
    password: string;

}

export interface UserPayload {
    _id: string;
    email: string;
    verified: boolean;
    
}