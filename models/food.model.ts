import mongoose, {Schema, Document, Model } from 'mongoose';

interface FoodDoc extends Document{
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string];
}

const FoodSchema = new Schema ({

    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    category:{
        type: String,
    },
    foodType:{
        type: String,
    },
    readyTime:{
        type: String,
    },
    price:{
        type: Number,
    }, 
    rating:{
        type: Number,
    },
    image: {
        type: [String]
    },
    vendorId: {
        type: String,
        required: true
    }
    
}, {timestamps: true})