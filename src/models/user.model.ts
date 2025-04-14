import mongoose, { Schema, Document } from 'mongoose';

export interface UserDoc extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    profileImg: string;
    lat: number;
    lng: number;

}
const UserSchema = new Schema<UserDoc>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    phone: { type: String, required: true },
    verified: { type: Boolean, required: true  },
    otp: { type: Number, required: true  },
    otp_expiry: { type: Date, required: true  },
    profileImg: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  }, {
    toJSON: {
        transform(doc, ret){
            delete ret.password,
            delete ret.salt,
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
});
  
  const User = mongoose.model<UserDoc>('User', UserSchema);
  
  export default User;