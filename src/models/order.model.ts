import mongoose, {Schema, Document, Model } from 'mongoose';

export interface OrderDoc extends Document{
    orderId: string;
    vendorId: string
    items: [any],
    totalAmount: number,
    orderDate: Date;
    paymentMethod: string;
    paymentResponse: string;
    orderStatus: string,
    remarks: string;
    deliveryId: string;
    deliveryStatus: string
    appliedOffers: boolean;
    offerId: string;
    readyTime: number;
}

const OrderSchema = new Schema ({

    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    items: [{
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        unit: {type: Number, required: true}
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResponse: {
        type: String,
    },
    orderStatus: {
        type: String,
        required: true,
        //enum: ["pending", "confirmed", "delivered", "cancelled"], // optional, can modify
        default: "pending",
    },
    remarks:  {
        type: String,
    },
    deliveryId:  {
        type: String,
    },
    deliveryStatus:  {
        type: String,
    },
    appliedOffers:  {
        type: Boolean,
    },
    offerId: {
        type: String,
    },
    readyTime:  {
        type: Number,
    },
}, {
    toJSON: {
        transform(doc, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Order = mongoose.model<OrderDoc>("Order", OrderSchema)

export default Order;