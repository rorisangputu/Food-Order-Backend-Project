import { Application }from 'express'
import AdminRoute from '../routes/AdminRoute'
import VendorRoute from '../routes/VendorRoute'
import bodyParser from 'body-parser'
import { ShoppingRoute } from '../routes/shopping.route'
import CustomerRoute from '../routes/user.route';

export default async(app: Application) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))    
    
    app.use('/admin', AdminRoute)
    app.use('/vendor', VendorRoute)
    app.use(ShoppingRoute);
    app.use('/user', CustomerRoute)

    return app;
}