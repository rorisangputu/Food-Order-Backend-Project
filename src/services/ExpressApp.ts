import express, { Application }from 'express'
import AdminRoute from '../routes/AdminRoute'
import VendorRoute from '../routes/VendorRoute'
import { ShoppingRoute } from '../routes/shopping.route'
import CustomerRoute from '../routes/user.route';

export default async(app: Application) => {

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))  
      
    
    app.use('/admin', AdminRoute)
    app.use('/vendor', VendorRoute)
    app.use(ShoppingRoute);
    app.use('/user', CustomerRoute)

    return app;
}