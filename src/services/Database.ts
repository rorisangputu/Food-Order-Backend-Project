import mongoose from "mongoose";

export default async  () => { 
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('Db Connected') 
    }catch(error) {
        console.error('Db Connection Error: ', error)
        process.exit(1);
    }
}