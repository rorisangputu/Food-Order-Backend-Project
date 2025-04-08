import express, {Application}from 'express'
import AdminRoute from '../routes/AdminRoute'
import VendorRoute from '../routes/VendorRoute'
import bodyParser from 'body-parser'

export default async(app: Application) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))    
    
    app.use('/admin', AdminRoute)
    app.use('/vendor', VendorRoute)

    return app;
}